import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {MomentService} from "../../services/moment.service";
import {Subject} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-tamura',
  standalone: true,
  template: `
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg selection:bg-cyan-500 selection:text-gray-50">
      <div class="bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
        <h1 class="max-w-fit mx-auto p-3 font-bold">Tamura</h1>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase">
        <tr>
          <th scope="col" class="px-6 py-3 bg-gray-50">
            Characteristic
          </th>
          <th scope="col" class="px-6 py-3">
            Value
          </th>
        </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
              Coarseness
            </th>
            <td class="px-6 py-4">
              {{ tamura.coarseness }}
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
              Contrast
            </th>
            <td class="px-6 py-4">
              {{ tamura.contrast }}
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
              Directionality
            </th>
            <td class="px-6 py-4">
              {{ tamura.directionality }}
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
              Line-likeness
            </th>
            <td class="px-6 py-4">
              {{ tamura.linelikeness }}
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
              Regularity
            </th>
            <td class="px-6 py-4">
              {{ tamura.regularity }}
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
              Roughness
            </th>
            <td class="px-6 py-4">
              {{ tamura.roughness }}
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
export class TamuraComponent implements OnInit, OnDestroy {

  @Input() tamura: any

  error = ''
  destroyed$ = new Subject<void>()

  ngOnInit(){}

  ngOnDestroy() {
    this.destroyed$.next()
  }

}
