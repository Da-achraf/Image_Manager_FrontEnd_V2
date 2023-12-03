import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TamuraComponent} from "../tamura/tamura.component";
import {MatListModule} from "@angular/material/list";
import {HistogramComponent} from "../histogram/histogram.component";
import {MomentsComponent} from "../moment/moments.component";
import {DominantColorsComponent} from "../dominant-colors/dominant-colors.component";
import {GaborFilterComponent} from "../gaborFilter/gabor-filter.component";
@Component({
  selector: 'app-all-characteristics-dialog',
  standalone: true,
  template: `
    <div class="overflow-y-scroll py-4 max-h-[40rem]">
      <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
      <div *ngIf="!loading" class="flex flex-col gap-10">
        <app-histogram [histogramData]="data.histogram"></app-histogram>
        <div>
          <div class="bg-gray-200">
            <h1 class="max-w-fit mx-auto pt-2 pb-4 bg-gray-200 font-black text-gray-600">Dominant Colors</h1>
          </div>
          <app-dominant-colors [data]="data"></app-dominant-colors>
        </div>
        <div>
          <div class="bg-gray-200">
            <h1 class="max-w-fit mx-auto pt-2 pb-4 bg-gray-200 font-black text-gray-600">Color Moments</h1>
          </div>
          <app-moments [moments]="data.moments"></app-moments>
        </div>
        <div>
          <div class="bg-gray-200">
            <h1 class="max-w-fit mx-auto pt-2 pb-4 bg-gray-200 font-black text-gray-600">Gabor Filter Values</h1>
          </div>
          <app-gabor-filter [gaborValues]="data.gaborFilterValues"></app-gabor-filter>
        </div>
        <div>
          <div class="bg-gray-200">
            <h1 class="max-w-fit mx-auto pt-2 pb-4 bg-gray-200 font-black text-gray-600">Tamura</h1>
          </div>
          <app-tamura [tamura]="data.tamura"></app-tamura>
        </div>
      </div>
    </div>
  `,
  imports: [
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    AllCharacteristicsDialogComponent,
    TamuraComponent,
    MatListModule,
    HistogramComponent,
    MomentsComponent,
    DominantColorsComponent,
    GaborFilterComponent
  ]
})
export class AllCharacteristicsDialogComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA)

  loading = true

  ngOnInit(){
    console.log(this.data.histogram)
    setTimeout(() => {
      this.loading = false
    }, 300)
  }
}
