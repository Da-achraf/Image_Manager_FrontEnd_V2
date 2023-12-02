import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CreateThemeComponent} from "./create-theme.component";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Component, inject} from "@angular/core";

/**
 * The Component That Appears Inside The Dialog
 * When Click Create New Theme
 */
@Component({
  standalone: true,
  imports: [MatDialogModule, MatInputModule, FormsModule, FontAwesomeModule, CreateThemeComponent],
  template: `
    <app-create-theme
      (labelChange)="matDialogRef.close($event)"
    ></app-create-theme>
  `,
})
export class CreateThemeDialog {
  matDialogRef = inject(MatDialogRef<CreateThemeDialog>)
}
