import {Component, inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HistogramComponent} from "./histogram.component";
import {HistogramService} from "../../services/histogram.service";
import {NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-histogram-dialog',
  standalone: true,
    imports: [
        HistogramComponent,
        NgIf,
        MatProgressSpinnerModule
    ],
  template: `
      <div class="grid place-content-center">
        <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
        <app-histogram *ngIf="!loading" [histogramData]="histogramData"></app-histogram>
      </div>
  `
})
export class HistogramDialogComponent implements OnInit {

  histogramData = inject(MAT_DIALOG_DATA)
  loading: boolean = true

  ngOnInit() {
    setTimeout(() => {
        this.loading = false
    }, 400)
  }
}
