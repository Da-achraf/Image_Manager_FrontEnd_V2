import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AsyncPipe, NgIf} from "@angular/common";
import {MomentService} from "../../services/moment.service";
import {finalize, Subject, takeUntil} from "rxjs";
import {UNKNOWN_ERROR} from "../../constants/error.constant";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
@Component({
  selector: 'app-histogram',
  standalone: true,
  template: `
    <div class="grid place-content-center">
      <mat-spinner *ngIf="loading" [color]="'primary'" diameter="40"></mat-spinner>
      <ng-container *ngIf="!loading">
        <div class="relative" *ngIf="error.length === 0; else onError">
          <img class="" [src]="data" alt="image">
          <div class="absolute bg-black w-[15px] h-[15px] rounded-full " [style.left.px]="moments[0]" [style.top.px]="moments[1]"></div>
        </div>
      </ng-container>
    </div>

    <ng-template #onError>
      <div class="px-[2rem] py-[1rem] rounded bg-red-500 text-white">
        {{ error }}
      </div>
    </ng-template>
  `,
  imports: [
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule
  ]
})
export class MomentComponent implements OnInit, OnDestroy {

  private readonly colorChannelNames = ['Blue', 'Green', 'Red'];

  momentService = inject(MomentService)
  data = inject(MAT_DIALOG_DATA)

  error = ''
  loading = true
  destroyed$ = new Subject<void>()

  moments: any[] = []

  ngOnInit(){
    this.momentService.fetchMomentData(this.data).pipe(
        takeUntil(this.destroyed$),
        finalize( () => this.loading = false)
      )
      .subscribe({
        next: (data) =>  {
          this.error = ''
          this.moments = data
        },
        error: (error) => this.error = UNKNOWN_ERROR
      })
  }

  ngOnDestroy() {
    this.destroyed$.next()
  }

}
