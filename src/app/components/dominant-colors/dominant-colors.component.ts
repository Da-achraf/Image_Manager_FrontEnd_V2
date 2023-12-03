import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DominantColorsService} from "../../services/dominant-colors.service";
import {Subject} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {Image} from "../../models/image.model";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPalette} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-dominant-colors',
  standalone: true,
  template: `
    <div class="grid place-content-center">
      <div *ngIf="error.length === 0; else onError" class="flex flex-col gap-4">
        <button
            [matMenuTriggerFor]="menu"
            class="max-w-fit px-[1rem] mt-3 mx-auto py-[.5rem] bg-main text-base font-semibold text-gray-100 rounded-lg hover:cursor-pointer hover:bg-blue-700"
        >
          Number Of Colors
          <fa-icon class="ml-1" [icon]="faPalette"></fa-icon>
        </button>
        <div class="flex">
          <img class="max-w-xl min-h-[25rem] max-h-[40rem]" [src]="data?.url" alt="Image..">
          <div class="w-[.1rem] min-h-full bg-lime-50"></div>
          <ul class="flex flex-col">
            <li
                class="w-[10rem] flex-1"
                *ngFor="let color of dominantColors.slice(0, end)"
                [style.background-color]="color"
            >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <mat-menu #menu="matMenu">
      <button (click)="changeNumOfColors(option)" *ngFor="let option of options" mat-menu-item>
        {{option}}
      </button>
    </mat-menu>
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
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class DominantColorsComponent implements OnInit, OnDestroy {

  dominantColorsService = inject(DominantColorsService)

  @Input() data: Image | undefined

  dominantColors: any[] = []
  options = [3, 5, 7, 10]
  end: number = 3

  error = ''
  destroyed$ = new Subject<void>()


  ngOnInit(){
    this.dominantColors = this.dominantColorsService.loadDominantColors(this.data?.dominantColors)
  }

  ngOnDestroy() {
    this.destroyed$.next()
  }

  changeNumOfColors(option: number) {
    this.end = option
  }

  protected readonly faPalette = faPalette;
}
