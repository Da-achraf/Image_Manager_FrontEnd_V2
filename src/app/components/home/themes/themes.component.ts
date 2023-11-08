import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from "../../../services/theme.service";
import {faPlus, faTrash, faX} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {filter, map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Response} from "../../../models/response.model";
import {UNKNOWN_ERROR} from "../../../constants/error.constant";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {Theme} from "../../../models/theme.model";
import {AuthService} from "../../../services/auth.service";
import {DeleteDialogComponent} from "../../../shared/components/delete-dialog.component";
import {ThemeStateManager} from "../../../services/theme-state-manager";

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnDestroy, OnInit{

  themeService = inject(ThemeService)
  authService = inject(AuthService)
  themeState = inject(ThemeStateManager)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  themes$ = this.themeState.allThemes$
  selectedThemesIds$ = this.themeState.selectedThemesIds$
  destroyed$ = new Subject<void>()

  protected readonly faTrash = faTrash
  protected readonly faPlus = faPlus

  onThemeChecked(themeId: string){
    this.themeState.emitSelectedTheme(themeId)
  }

  onThemeUnChecked(themeId: string){
    this.themeState.emitUnSelectedTheme(themeId)
  }

  onSelectAllChange(event: any){
    const isChecked = event.checked
    isChecked
      ? this.themeState.selectAllThemes()
      : this.themeState.unSelectAllThemes()
  }

  openDeleteDialog(){
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().pipe(
      tap(toBeDeleted => {
        if (!toBeDeleted) this.themeState.unSelectAllThemes()
      }),
      filter(toBeDeleted => toBeDeleted),
      switchMap(_ => this.themeService.deleteThemes(this.themeState.getSelectedThemes())),
      takeUntil(this.destroyed$)
    )
    .subscribe(this.observerHandler)
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(CreateThemeDialog);
    dialogRef.afterClosed().pipe(
      filter((label: any) => label?.length > 2),
      map((label: any) => {
        const UserId = this.authService.getDecodedToken()?.userId
        return new Theme({ label: label, UserId })
      }),
      switchMap((theme: Theme) => this.themeService.saveTheme(theme)),
      takeUntil(this.destroyed$)
    )
    .subscribe(this.observerHandler)
  }

  observerHandler: { next: (response: Response) => void; error: (err: any) => void } = {
	  next: (response: Response) => this.onSuccess(response),
	  error: (err: any) => this.onError(err?.error?.message)
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Hide')
  }

  onSuccess(resp: Response){
    this.openSnackBar(resp.message)
    this.themeState.unSelectAllThemes()
  }

  onError(errorMsg: string){
	  this.openSnackBar(errorMsg ? errorMsg : UNKNOWN_ERROR)
  }

  ngOnDestroy() {
    this.destroyed$.next()
  }

  protected readonly console = console;

  ngOnInit(): void {
    this.themeService.loadThemesForUser().subscribe()
  }
}

/**
 * The Component That Appears Inside The Dialog
 * When Click Create New Theme
 */
@Component({
  standalone: true,
  imports: [MatDialogModule, MatInputModule, FormsModule, FontAwesomeModule],
  template: `
    <div class="relative p-[1rem]">
      <fa-icon
        class="absolute top-[.2rem] right-[.2rem] px-[.3rem] py-[.1rem] rounded text-light hover:cursor-pointer hover:text-gray-600"
        [icon]="faX"
        (click)="onCancel()"
      ></fa-icon>
      <p class="text-gray-800 font-semibold text-center mt-[1rem] mb-[.5rem]">Give Your New Theme A Label</p>
      <input
        class="input px-[.6rem] py-[.5rem] w-full mb-[.5rem]"
        type="text"
        name="label"
        placeholder="Label.."
        #labelInput="ngModel"
        [(ngModel)]="label"
      />
      <button
       class="button w-full bg-main text-white hover:bg-blue-700"
       [mat-dialog-close]="label"
       [disabled]="!labelInput.valid"
       >
         Create
         <fa-icon class="ml-1" [icon]="faPlus"></fa-icon>
      </button>
    </div>
  `,
})
export class CreateThemeDialog {
  dialogRef = inject(MatDialogRef<CreateThemeDialog>)
  label = ''

  onCancel(){
    this.dialogRef.close()
  }

  protected readonly faPlus = faPlus;
  protected readonly faX = faX;
}
