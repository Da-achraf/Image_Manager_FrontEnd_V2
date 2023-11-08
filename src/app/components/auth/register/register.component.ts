import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import { Response} from "../../../models/response.model";
import {Router} from "@angular/router";
import {catchError, ignoreElements, of, share, Subject, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMsg = ''
  successMsg = ''

  formBuilder = inject(FormBuilder);
  auth = inject(AuthService)
  router = inject(Router)

  fg: FormGroup = this.formBuilder.group({
      'fname': new FormControl('', [Validators.required, Validators.min(5)]),
      'lname': new FormControl('', [Validators.required, Validators.min(5)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.min(5)])
    }
  )

  register(formValue: any){
    this.auth.register(formValue).subscribe({
      next: (response: Response) => {
        this.errorMsg = ''
        this.successMsg = response.message
        setTimeout(async () => {
          this.successMsg = ''
          await this.router.navigate(['/login'], { state: { email: response.data } })
        }, 1000)
      },
      error: err => {
        this.errorMsg = err.error.message
        this.errorMsg = ''
      }
    })
  }

}
