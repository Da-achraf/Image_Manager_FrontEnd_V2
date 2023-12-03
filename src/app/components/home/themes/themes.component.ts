import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from "../../../services/theme.service";
import {faPlus, faTrash, faX} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {filter, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Response} from "../../../models/response.model";
import {UNKNOWN_ERROR} from "../../../constants/error.constant";
import {DeleteDialogComponent} from "../../../shared/components/delete-dialog.component";
import {ThemeStateManager} from "../../../services/theme-state-manager";
import {SnackBarManager} from "../../../services/snack-bar-manager.service";
import { CreateThemeDialog } from './create-theme-dialog.component';
import {Theme} from "../../../models/theme.model";

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit, OnDestroy{

  themeService = inject(ThemeService)
  themeState = inject(ThemeStateManager)
  dialog = inject(MatDialog)
  snackBarManager = inject(SnackBarManager)

  loading: boolean = true

  themes$ = this.themeState.allThemes$
  selectedThemesIds$ = this.themeState.selectedThemesIds$
  destroyed$ = new Subject<void>()

  protected readonly faTrash = faTrash
  protected readonly faPlus = faPlus

  ngOnInit() {
    this.themeState.emitChoosenTheme('')
      setTimeout(() => {
        this.loading = false
      }, 500)
  }

  onSelectAllChange(event: any){
    event.checked
      ? this.themeState.selectAllThemes()
      : this.themeState.unSelectAllThemes()
  }

  openDeleteDialog(){
    this.dialog.open(DeleteDialogComponent).afterClosed().pipe(
      filter(toBeDeleted => toBeDeleted),
      switchMap(_ => this.themeService.deleteThemes(this.themeState.getSelectedThemes())),
      takeUntil(this.destroyed$)
    )
    .subscribe(this.observerHandler)
  }

  openCreateDialog(){
    this.dialog.open(CreateThemeDialog).afterClosed().pipe(
      switchMap((label: string) => this.themeService.saveTheme(label)),
      takeUntil(this.destroyed$)
    )
    .subscribe(this.observerHandler)
  }

  saveTheme(label: string){
    this.themeService.saveTheme(label).pipe(
      takeUntil(this.destroyed$),
    )
    .subscribe(this.observerHandler)
  }

  observerHandler: { next: (response: Response) => void; error: (err: any) => void } = {
	  next: (response: Response) => this.onSuccess(response),
	  error: (err: any) => this.onError(err?.error?.message)
  }

  onSuccess(resp: Response){
    this.snackBarManager.finishOperation(resp.message, true)
    this.themeState.unSelectAllThemes()
  }

  onError(errorMsg: string){
    this.snackBarManager.finishOperation(errorMsg ? errorMsg : UNKNOWN_ERROR, true)
  }

  ngOnDestroy() {
    this.destroyed$.next()
  }

  protected readonly console = console;
}
