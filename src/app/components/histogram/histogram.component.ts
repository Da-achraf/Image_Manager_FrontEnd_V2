import {AfterViewInit, Component, inject, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HistogramService} from "../../services/histogram.service";
import {UNKNOWN_ERROR} from "../../constants/error.constant";
import {NgIf} from "@angular/common";
import {finalize, Subject, takeUntil} from 'rxjs';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
@Component({
  selector: 'app-histogram',
  standalone: true,
  template: `
    <div class="grid place-content-center">
      <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
      <ng-container *ngIf="!loading">
        <div *ngIf="error.length == 0; else onError" class="min-w-[50rem] animate-fadeIn">
        </div>
      </ng-container>
    <div id="container"></div>
    </div>


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

  private readonly colorChannelNames = ['Blue', 'Green', 'Red'];

  http = inject(HttpClient)
  histogramService = inject(HistogramService)
  data = inject(MAT_DIALOG_DATA)
  destroyed$ = new Subject<void>()

  error = ''
  loading = true

  ngAfterViewInit() {
    this.loadChart();
  }


  loadChart() {
    const imageUrl = this.data
    this.histogramService.loadHistogram(imageUrl)
    .pipe(
      takeUntil(this.destroyed$),
      finalize( () => this.loading = false)
    )
    .subscribe({
      next: (data) =>  {
        this.error = ''
        this.histogramService.getChart(data)
      },
      error: (error) => this.error = UNKNOWN_ERROR
    })
  }

  ngOnDestroy() {
    this.destroyed$.next()
  }

}
