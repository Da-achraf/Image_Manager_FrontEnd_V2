import {Component, EventEmitter, HostListener, OnInit, Output} from "@angular/core";
import {faPlus, faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-theme',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule
  ],
  template: `
    <div class="relative p-[1rem]">
      <p class="text-gray-800 font-semibold text-center mt-[1rem] mb-[.5rem]">Give Your New Theme A Label</p>
      <input
        class="input px-[.6rem] py-[.5rem] w-full mb-[.5rem]"
        type="text"
        name="label"
        placeholder="Label.."
        minlength="3"
        required
        #labelInput="ngModel"
        [(ngModel)]="label"
      />
      <button
        class="button w-full bg-main text-white hover:bg-blue-700"
        (click)="labelChange.emit(labelInput.value)"
        [disabled]="!labelInput.valid"
      >
        Create
        <fa-icon class="ml-1" [icon]="faPlus"></fa-icon>
      </button>
    </div>
  `,
  styles: [`
    .ng-invalid {
      @apply border-l-4 border-l-red-400
    }

    .ng-valid {
      @apply border-l-4 border-l-green-400
    }
  `]
})
export class CreateThemeComponent{

  label = ''

  @Output()
  labelChange = new EventEmitter<string>()

  protected readonly faPlus = faPlus;
  protected readonly faX = faX;

  @HostListener('keydown', ['$event.key'])
  onKeyDown(key: any) {
    if (key === 'Enter' && this.label.length > 2) this.labelChange.emit(this.label)
  }
}
