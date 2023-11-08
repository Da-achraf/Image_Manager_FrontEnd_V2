import {Component, HostBinding, inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Response} from "../../../models/response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UNKNOWN_ERROR} from "../../../constants/error.constant";
import {faSpinner, faX} from "@fortawesome/free-solid-svg-icons";
import {tap, delay, finalize} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  errorMsg = ''
  successMsg = ''

  singingIn = false

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router)

  fg: FormGroup = this.formBuilder.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.min(5)])
    }
  )

  constructor() {}

  async ngOnInit() {

    if (this.authService.getToken()) {
      await this.router.navigate(['app'])
    }

    const email = window.history?.state['email']
    this.fg.patchValue({
      email: email ? email : ''
    })
  }

  login(formValue: any){
    this.onLoginBegin()
    this.authService.login(formValue)
      .pipe(delay(2000))
      .subscribe({
        next: (response: Response) => this.onLoginSuccess(response.message),
        error: err => this.onLoginFailed(err?.error?.message)
    })
  }

  onLoginBegin(){
    this.singingIn = true
    this.errorMsg = ''
    this.successMsg = ''
  }

  onLoginSuccess(successMessage: string){
    this.singingIn = false
    this.errorMsg = ''
    this.successMsg = successMessage
    setTimeout(async () => {
      await this.router.navigate(['/app'])
    }, 1000)
  }

  onLoginFailed(failureMessage: string){
    this.singingIn = false
    this.successMsg = ''
    this.errorMsg = failureMessage ? failureMessage : UNKNOWN_ERROR
  }

  protected readonly faSpinner = faSpinner;
  protected readonly faX = faX;
}
