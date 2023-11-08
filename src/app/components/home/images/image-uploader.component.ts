import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {faCloud, faUpload} from "@fortawesome/free-solid-svg-icons";
import {DndDirective} from "../../../directives/dnd.directive";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'image-uploader',
  standalone: true,
  imports: [
    DndDirective,
    FontAwesomeModule,
    MatProgressBarModule,
    NgIf,
    NgForOf,
    JsonPipe
  ],
  template: `
    <div class="relative text-center rounded pb-[2rem] overflow-hidden" >
      <div class="border-2 border-dashed border-secondary mb-[1rem]" (filesDropped)="files = $event" appDnd>
        <p class="absolute font-semibold mb-[.5rem] translate-x-[-50%] left-[50%] translate-y-[-50%] top-[30%]">Drag And
          Drop Here</p>
        <fa-icon
          class="absolute translate-x-[-50%] left-[50%] translate-y-[-50%] top-[45%]"
          [icon]="faUpload"
          size="2x"
        ></fa-icon>
        <input
          id="fileDrop"
          #fileUploadInput
          class="opacity-0 px-[2rem] py-[5rem] bg-main w-[100%] h-[100%]"
          type="file"
          multiple
          (change)="files = fileUploadInput.files"
        />
      </div>
      <p class="font-semibold text-center mb-[1rem]">Or</p>
      <label
        for="fileDrop"
        class="px-[.8rem] py-[.5rem] font-semibold rounded-lg hover:cursor-pointer bg-strongRed text-center text-white"
      >
        Browse For Files
      </label>
    </div>

    <ng-container *ngIf="files?.length != 0">
      <div class="flex items-center gap-2 mx-[.2rem] mb-[1rem] px-[.2rem] py-[.5rem] border-2 border-dashed border-main rounded" *ngFor="let file of files">
        <span class="flex-1 font-semibold">{{ file.name }}</span>
        <mat-progress-bar
          class="flex-3"
          mode="indeterminate"
          [color]="'primary'"
        ></mat-progress-bar>
      </div>
      <div class="flex justify-center items-center gap-3 py-[1rem]">
        <button
          class="px-[1rem] py-[.5rem] bg-main font-semibold text-gray-100 rounded-lg hover:cursor-pointer hover:bg-blue-700"
          (click)="onUpload.emit(files); files = []"
        >
          Upload
          <fa-icon class="ml-1" [icon]="faCloud"></fa-icon>
        </button>
        <button
          class="px-[1rem] py-[.5rem] bg-light font-semibold text-gray-800 rounded-lg hover:cursor-pointer hover:bg-secondary hover:text-gray-200"
          (click)="fileUploadInput.value = ''; onUpload.emit(null)"
        >
          Cancel
        </button>
      </div>
    </ng-container>
  `
})
export class ImageUploaderComponent {

  @Output() onUpload = new EventEmitter<any>;

  files: any = []


  protected readonly faUpload = faUpload;
  protected readonly faCloud = faCloud;
}
