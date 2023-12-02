import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DominantColorsService} from "../../services/dominant-colors.service";
import {Subject} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
@Component({
  selector: 'app-histogram',
  standalone: true,
  template: `
    <div class="grid place-content-center">
      <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
      <ng-container *ngIf="!loading">
        <div *ngIf="error.length === 0; else onError" class="flex">
          <img class="max-w-xl min-h-[25rem] max-h-[40rem]" [src]="data.imageUrl" alt="Image..">
          <div class="w-[.1rem] min-h-full bg-lime-50"></div>
          <ul class="flex flex-col">
            <li
              class="w-[10rem] flex-1"
              *ngFor="let color of dominantColors"
              [style.background-color]="color"
            >
            </li>
          </ul>
        </div>
      </ng-container>
    </div>
    <ng-template #onError>
      <div class="px-[2rem] py-[1rem] rounded bg-red-500 text-white">
        {{ error }}
      </div>
    </ng-template>
  `,
  styles: [``],
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    MatProgressSpinnerModule
  ]
})
export class DominantColorsComponent implements OnInit, OnDestroy {

  dominantColorsService = inject(DominantColorsService)
  data = inject(MAT_DIALOG_DATA)

  dominantColors: any[] = []

  error = ''
  loading = true
  destroyed$ = new Subject<void>()


  ngOnInit(){
    const numberOfColors = this.data.numOfColors
    setTimeout(() => {
        this.loading = false
        this.dominantColors = this.dominantColorsService.loadDominantColors(this.data.dominantColors).slice(0, numberOfColors)
    }, 400)
  }

  ngOnDestroy() {
    this.destroyed$.next()
  }

}
