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
    <div class="overflow-y-auto p-4 max-h-[40rem]">
      <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
      <div *ngIf="!loading" class="flex flex-col gap-10">
        <div *ngIf="data?.histogram" class="shadow-xl">
            <app-histogram [histogramData]="data?.histogram"></app-histogram>
        </div>
        <div *ngIf="data" class="shadow-xl">
          <app-dominant-colors [data]="data"></app-dominant-colors>
        </div>
        <div *ngIf="data?.moments" class="shadow-xl">
          <app-moments [moments]="data?.moments"></app-moments>
        </div>
        <div *ngIf="data?.gaborFilterValues" class="shadow-xl">
          <app-gabor-filter [gaborValues]="data.gaborFilterValues"></app-gabor-filter>
        </div>
        <div *ngIf="data?.tamura" class="shadow-xl">
          <app-tamura [tamura]="data.tamura"></app-tamura>
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
