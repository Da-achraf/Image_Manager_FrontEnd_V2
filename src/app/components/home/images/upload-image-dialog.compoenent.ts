import {Component, inject} from "@angular/core";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DndDirective} from "../../../directives/dnd.directive";
import {ImageUploaderComponent} from "./image-uploader.component";
import {NgIf} from "@angular/common";
import {faCloud, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";

/**
 * The Component That Appears Inside The Dialog
 * When Click On Upload New Image
 */
@Component({
	standalone: true,
	imports: [MatDialogModule, FontAwesomeModule, DndDirective, ImageUploaderComponent, NgIf],
	template: `
    <image-uploader (onUpload)="dialogRef.close($event)"></image-uploader>
  `
})
export class UploadImageDialogCompoenent {

	dialogRef = inject(MatDialogRef<UploadImageDialogCompoenent>)

	files: File[] = []

	protected readonly faPlus = faPlus;
	protected readonly faUpload = faUpload;
	protected readonly faCloud = faCloud;
}
