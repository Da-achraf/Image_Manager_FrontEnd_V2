import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class SnackBarManager {

  snackBar = inject(MatSnackBar)

  beginSimpleOperation(message: string, config: any){
    this.snackBar.open(message, '', config)
  }

  beginComplexOperation(component: any, message: string) {
    this.snackBar.openFromComponent(component, { duration: undefined, data: {message} })
  }

  finishOperation(message: string, isSuccess: boolean){
    let panelClass: string = ''
    isSuccess
      ? panelClass = 'success-snackbar'
      : panelClass = 'error-snackbar'

    this.snackBar.open(message, '', {
      duration: 4500,
	    panelClass
    })
  }
}
