import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HistogramComponent} from "../histogram/histogram.component";
import {DominantColorsComponent} from "./dominant-colors.component";
@Component({
  selector: 'app-histogram',
  standalone: true,
  template: `
    <div class="grid place-content-center">
      <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
      <div *ngIf="!loading">
        <app-dominant-colors [data]="data"></app-dominant-colors>
      </div>
    </div>
  `,
  styles: [``],
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    MatProgressSpinnerModule,
    HistogramComponent,
    DominantColorsComponent
  ]
})
export class DominantColorsDialogComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA)
  loading: boolean = true

  ngOnInit() {
    setTimeout(() => {
      this.loading = false
    }, 400)
  }


}
