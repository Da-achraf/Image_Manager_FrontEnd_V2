import {inject, Injectable} from '@angular/core';
import {Response} from "../models/response.model";
import {UNKNOWN_ERROR} from "../constants/error.constant";
import {ImageStateManager} from "./image-state-manager";
import {SnackBarManager} from "./snack-bar-manager.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  imageState = inject(ImageStateManager)
  snackBarManager = inject(SnackBarManager)

  observerHandler: { next: (response: Response) => void; error: (err: any) => void } = {
    next: (response: Response) => this.onSuccess(response),
    error: (err: any) => this.onError(err?.error?.message)
  }

  private onSuccess(resp: Response){
    this.imageState.unSelectAllImages()
    this.snackBarManager.finishOperation(resp.message, true)
  }

  private onError(errorMsg: string){
    this.snackBarManager.finishOperation(errorMsg ? errorMsg : UNKNOWN_ERROR, false)
  }

}
