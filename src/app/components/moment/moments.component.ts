import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {MomentService} from "../../services/moment.service";
import {Subject} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-moments',
  standalone: true,
  template: `
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg selection:bg-cyan-500 selection:text-gray-50">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase">
        <tr>
          <th scope="col" class="px-6 py-3 bg-gray-50">
            Property
          </th>
          <th scope="col" class="px-6 py-3">
            Mean
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-50">
            Standard Deviation
          </th>
          <th scope="col" class="px-6 py-3">
            Skewness
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="border-b border-gray-200 hover:bg-gray-50">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
            Hue
          </th>
          <td class="px-6 py-4">
            {{ moments.hue.mean }}
          </td>
          <td class="px-6 py-4 bg-gray-50">
            {{ moments.hue.stdDeviation }}
          </td>
          <td class="px-6 py-4">
            {{ moments.hue.skewness }}
          </td>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-50">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
            Saturation
          </th>
          <td class="px-6 py-4">
            {{ moments.saturation.mean }}
          </td>
          <td class="px-6 py-4 bg-gray-50">
            {{ moments.saturation.stdDeviation }}
          </td>
          <td class="px-6 py-4">
            {{ moments.saturation.skewness }}
          </td>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-50">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
            Value
          </th>
          <td class="px-6 py-4">
            {{ moments.value.mean }}
          </td>
          <td class="px-6 py-4 bg-gray-50">
            {{ moments.value.stdDeviation }}
          </td>
          <td class="px-6 py-4">
            {{ moments.value.skewness }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  `,
  imports: [
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    JsonPipe
  ]
})
export class MomentsComponent implements OnInit, OnDestroy {


  momentService = inject(MomentService)
  @Input() moments: any

  error = ''
  destroyed$ = new Subject<void>()

  ngOnInit(){
    this.moments = this.momentService.loadMoments(this.moments)
  }

  ngOnDestroy() {
    this.destroyed$.next()
  }

}
