import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {Subject} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-gabor-filter',
  standalone: true,
  template: `
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg selection:bg-cyan-500 selection:text-gray-50">
      <div class="bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-none">
        <h1 class="max-w-fit mx-auto p-3 font-bold">Gabor Filter Values</h1>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" class="px-6 py-3 bg-gray-50">
              Orientations / Scales
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50">
              3
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50">
              5
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50">
              7
            </th>
          </tr>
        </thead>
        <tbody>
            <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4">0</td>
                <td *ngFor="let value of gaborValues.slice(0, gaborValues.length/4)" class="px-6 py-4">
                  {{ value }}
                </td>
            </tr>
            <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4">π/4</td>
                <td *ngFor="let value of gaborValues.slice(gaborValues.length/4, gaborValues.length/4 + 3)" class="px-6 py-4">
                  {{ value }}
                </td>
            </tr>
            <tr class="border-b border-gray-200 hover:bg-gray-50">
              <td class="px-6 py-4">π/2</td>
              <td *ngFor="let value of gaborValues.slice(gaborValues.length/4 + 3, gaborValues.length/4 + 6)" class="px-6 py-4">
                {{ value }}
              </td>
            </tr>
            <tr class="border-b border-gray-200 hover:bg-gray-50">
              <td class="px-6 py-4">3π/4</td>
              <td *ngFor="let value of gaborValues.slice(gaborValues.length/4 + 6, gaborValues.length/4 + 9)" class="px-6 py-4">
                {{ value }}
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
    JsonPipe,
    NgForOf
  ]
})
export class GaborFilterComponent implements OnInit, OnDestroy {

  @Input() gaborValues: number[] = []

  error = ''
  destroyed$ = new Subject<void>()

  ngOnInit() {
    console.log(this.gaborValues)
  }

  ngOnDestroy() {
    this.destroyed$.next()
  }

}
