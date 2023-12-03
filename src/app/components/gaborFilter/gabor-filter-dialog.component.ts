import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {GaborFilterComponent} from "./gabor-filter.component";
@Component({
  selector: 'app-histogram',
  standalone: true,
  template: `
    <div class="grid place-content-center">
      <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
      <div *ngIf="!loading">
        <div class="bg-gray-200">
          <h1 class="max-w-fit mx-auto pt-2 pb-4 bg-gray-200 font-black text-gray-600">Gabor Filter Values</h1>
        </div>
        <app-gabor-filter [gaborValues]="data"></app-gabor-filter>
      </div>
    </div>
  `,
  imports: [
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    GaborFilterComponent
  ]
})
export class GaborFilterDialogComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA)

  loading = true

  ngOnInit(){
    setTimeout(() => {
      this.loading = false
    }, 300)
  }
}
