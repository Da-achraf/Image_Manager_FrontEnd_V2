import {Component, inject} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  template: `
    <div class="flex justify-between items-center py-[1rem] px-[1rem] lg:px-[10rem] mb-[1.5rem] shadow-lg rounded">
      <a
        class="bg-gradient-to-tr from-cyan-300 via-blue-400 to-blue-700 px-[1rem] py-[.8rem] text-lg text-gray-50 font-bold  rounded-tl-xl rounded-tr-3xl rounded-bl-3xl hover:cursor-pointer"
        [routerLink]="['themes']"
      >
        Image Manager
      </a>
      <span
        class="relative bg-gray-500 w-[2.5rem] h-[2.5rem] rounded-full hover:cursor-pointer"
        (click)="logout()"
      ></span>
<!--      class="relative bg-gray-500 w-[2.5rem] h-[2.5rem] rounded-full hover:cursor-pointer after:hidden after:absolute after:content-['Logout'] after:top-[-50%] after:translate-y-[50%] after:left-[-100%] after:px-[1rem] after:py-[.3rem] after:bg-light after:text-gray-950 hover:after:block"-->
    </div>

  `,
  styleUrls: []
})
export class HeaderComponent {

  authService = inject(AuthService)

  async logout() {
    await this.authService.logout()
  }

}
