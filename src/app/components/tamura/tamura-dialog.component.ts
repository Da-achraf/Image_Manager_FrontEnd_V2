import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TamuraComponent} from "./tamura.component";
@Component({
  selector: 'app-tamura-dialog',
  standalone: true,
  template: `
    <div class="grid place-content-center">
      <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
      <div *ngIf="!loading">
        <div class="bg-gray-200">
          <h1 class="max-w-fit mx-auto pt-2 pb-4 bg-gray-200 font-black text-gray-600">Tamura Characteristics</h1>
        </div>
        <app-tamura [tamura]="data"></app-tamura>
      </div>
    </div>
  `,
  imports: [
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    TamuraComponent
  ]
})
export class TamuraDialogComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA)

  loading = true

  ngOnInit(){
    setTimeout(() => {
      this.loading = false
    }, 300)
  }
}
