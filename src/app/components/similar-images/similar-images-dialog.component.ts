import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TamuraComponent} from "../tamura/tamura.component";
import {MatListModule} from "@angular/material/list";
import {HistogramComponent} from "../histogram/histogram.component";
import {MomentsComponent} from "../moment/moments.component";
import {DominantColorsComponent} from "../dominant-colors/dominant-colors.component";
import {GaborFilterComponent} from "../gaborFilter/gabor-filter.component";
import {IsCheckedPipe} from "../../shared/components/IsCheckedPipe";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Image} from "../../models/image.model";
@Component({
  selector: 'app-similar-images-dialog',
  standalone: true,
  template: `
    <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
    <div *ngIf="!loading">
      <div class="overflow-y-scroll py-4 max-h-[40rem]">
        <div class="flex flex-col items-center px-5 py-3 gap-10">
          <img [src]="data?.selectedImage?.url" width="600" height="800" alt="image">
          <div class="w-full h-5 shadow-xl"></div>
          <div class="flex flex-wrap gap-5 justify-center">
            <div *ngFor="let image of data.otherImages.slice(0,4)" class="shadow-2xl">
              <mat-checkbox
                [checked]=""
                [value]="image.id"
                [color]="'primary'"
                (change)= "onChange($event, image)"
                name="imageCheckBox">
                Not Relevant
              </mat-checkbox>
              <img width="400" height="400" [src]="image.url" alt="image">
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center gap-4 py-3">
        <button
          class="button bg-blue-600 text-white hover:bg-main"
          [mat-dialog-close]="notRelevant"
        >
          Send Feedback
        </button>
        <button
          class="button bg-transparent text-main border border-main"
          [mat-dialog-close]="[]"
        >
          Cancel
        </button>
      </div>
    </div>
  `,
  imports: [
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    SimilarImagesDialogComponent,
    TamuraComponent,
    MatListModule,
    HistogramComponent,
    MomentsComponent,
    DominantColorsComponent,
    GaborFilterComponent,
    IsCheckedPipe,
    MatCheckboxModule,
    NgForOf,
    MatDialogModule
  ]
})
export class SimilarImagesDialogComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA)

  loading = true

  notRelevant: Image[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  onChange(event: any, image: Image) {
    if (event.checked) {
      this.notRelevant.push(image);
    }
  }
}
