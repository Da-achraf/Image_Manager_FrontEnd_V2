import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {Subject} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-gabor-filter',
  standalone: true,
  template: `
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg selection:bg-cyan-500 selection:text-gray-50">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" class="px-6 py-3 bg-gray-50">
              1st Set
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50">
              2nd Set
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50">
              3rd Set
            </th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngFor="let rowIndex of [0, 1, 2]">
            <tr class="border-b border-gray-200 hover:bg-gray-50">
              <td class="px-6 py-4" *ngFor="let value of gaborValues.slice(rowIndex * 3, (rowIndex + 1) * 3)">
                {{ value }}
              </td>
            </tr>
          </ng-container>
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
