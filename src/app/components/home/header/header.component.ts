import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  template: `
<!--    <div class="sticky top-0 z-10 flex justify-between items-center py-[1rem] px-[1rem] mb-[1.5rem] shadow-lg rounded">-->
    <div class="bg-transparent bg-[rgba(255, 255, 255, .2)] backdrop-blur-[3.75rem] backdrop-opacity-100 backdrop-brightness-200 shadow-md sm:bg-transparent sm:backdrop-opacity-100 sm:backdrop-brightness-100 sm:bg-[rgba(255, 255, 255, .6)] sm:backdrop-blur-[1.75rem] sticky top-0 z-10 flex justify-between items-center py-[1rem] px-[1rem] mb-[1.5rem] shadow-lg rounded">
      <a
        class="bg-gradient-to-tr from-cyan-300 via-blue-400 to-blue-700 px-[1rem] py-[.8rem] text-lg text-gray-50 font-bold  rounded-tl-xl rounded-tr-3xl rounded-bl-3xl hover:cursor-pointer"
        [routerLink]="['themes']"
      >
        Image Manager
      </a>
      <span
        class="relative bg-gray-500 w-[2.5rem] h-[2.5rem] rounded-full hover:cursor-pointer"
        (click)="showDropDown = !showDropDown"
      ></span>
      <div *ngIf="showDropDown" class="absolute flex flex-col right-[10%] top-[80%] bg-gray-200 rounded shadow-2xl">
<!--        <span class="p-3 hover:bg-gray-300 hover:cursor-pointer selection:bg-transparent">Settings</span>-->
        <span (click)="logout()" class="p-3 hover:bg-gray-300 hover:cursor-pointer selection:bg-transparent">Logout</span>
      </div>
    </div>

  `,
  styles: [``]
})
export class HeaderComponent {

  authService = inject(AuthService)
  showDropDown = false

  async logout() {
    this.showDropDown = !this.showDropDown
    await this.authService.logout()
  }

  protected readonly faChevronRight = faChevronRight;

}
