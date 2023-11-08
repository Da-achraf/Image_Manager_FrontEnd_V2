import {Component} from "@angular/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
	selector: 'deleting-template',
	standalone: true,
	imports: [
		MatProgressBarModule
	],
	template: `
	  <div class="text-center text-white mb-[1rem]">
	    <p class="font-semibold mb-[.5rem]">Deleting . . .</p>
	    <p class="font-semibold">Don't Refresh Your Browser!</p>
	  </div>
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  `
})
export class DeletingLoadingTemplate {

}
