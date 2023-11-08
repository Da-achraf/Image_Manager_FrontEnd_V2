import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler{

  handleError(error: any): void {
    // console.warn(error)
  }

}
