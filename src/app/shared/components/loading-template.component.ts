import {Component, Inject, inject} from "@angular/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
	selector: 'Uploading-template',
	standalone: true,
	imports: [
		MatProgressBarModule
	],
	template: `
	  <div class="text-center text-white mb-[1rem]">
	    <p class="font-semibold mb-[.5rem]">
        {{ data?.message }}
      </p>
	    <p class="font-semibold">Don't Refresh Your Browser!</p>
	  </div>
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  `
})
export class LoadingTemplateComponent {
  data = inject(MAT_SNACK_BAR_DATA)
}
