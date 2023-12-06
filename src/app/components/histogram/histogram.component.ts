import {AfterViewInit, Component, inject, Input, OnDestroy} from '@angular/core';
import {HistogramService} from "../../services/histogram.service";
import {NgIf} from "@angular/common";
import {Subject} from 'rxjs';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {UNKNOWN_ERROR} from "../../constants/error.constant";
@Component({
  selector: 'app-histogram',
  standalone: true,
  template: `
      <div *ngIf="error.length == 0; else onError" class="min-w-[70rem] animate-fadeIn">
      </div>
      <div id="container"></div>

      <ng-template #onError>
        <div class="px-[2rem] py-[1rem] rounded bg-red-500 text-white">
          {{ error }}
        </div>
      </ng-template>
  `,
  imports: [
    NgIf,
    MatProgressSpinnerModule
  ]
})
export class HistogramComponent implements AfterViewInit, OnDestroy {

  histogramService = inject(HistogramService)
  @Input() histogramData: any

  error = ''
  ngAfterViewInit() {
    console.log('this.histogramData: ', this.histogramData)
    this.loadChart();
  }

  loadChart() {
    try {
      const data = this.histogramService.loadHistogram(this.histogramData)
      this.histogramService.getChart(data)
    }
    catch (e: any){
      this.error = e?.error?.message ? e?.error?.message : UNKNOWN_ERROR
    }
  }

  ngOnDestroy() {}

}
