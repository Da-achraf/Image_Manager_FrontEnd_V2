import {Component, inject} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faTrash, faX} from "@fortawesome/free-solid-svg-icons";

@Component({
	standalone: true,
	imports: [MatButtonModule, MatDialogModule, FontAwesomeModule],
	template: `
    <div class="relative p-[1rem]">
      <fa-icon
        class="absolute top-[.2rem] right-[.2rem] px-[.3rem] py-[.1rem] rounded text-light hover:cursor-pointer hover:text-gray-600"
        [icon]="faX"
        [mat-dialog-close]="false"
      ></fa-icon>
      <p class="font-semibold text-gray-800 mt-[1.5rem] mb-[.5rem]">Are You Sure You Want To Delete?</p>
      <button
        class="button w-full bg-strongRed text-white hover:bg-lightRed"
        [mat-dialog-close]="true"
      >
        Delete
        <fa-icon class="ml-1" [icon]="faTrash"></fa-icon>
      </button>
    </div>
  `,
})
export class DeleteDialogComponent {

	protected readonly faTrash = faTrash;
    protected readonly faX = faX;
}
