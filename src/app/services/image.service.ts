import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL_TOKEN} from "../config/api.config";
import {Response} from "../models/response.model";
import {Observable, switchMap, tap} from "rxjs";
import {ImageStateManager} from "./image-state-manager";
import {UNKNOWN_ERROR} from "../constants/error.constant";
import {SnackBarManager} from "./snack-bar-manager.service";
import {ImageIUploadingComponent} from "../components/home/images/image-uploading-template.component";
import {DeletingLoadingTemplate} from "../shared/components/deleting-loading-template.component";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  http = inject(HttpClient)
  imageState = inject(ImageStateManager)
  snackBarManager = inject(SnackBarManager)
  api_url = inject(API_URL_TOKEN)
  local_url = `${this.api_url}/auth/image`


  loadImagesForTheme(themeId: string):Observable<Response>{
    return this.http.get<Response>(`${this.local_url}/theme/${themeId}`).pipe(
      tap((response: Response) => this.imageState.emitAllImages(response.data)),
    )
  }

  uploadImages(files: File[], themeId: string){
    const headers = new HttpHeaders({ themeId })
    const formData = this.prepareImagesForUpload(files)
    this.snackBarManager.beginComplexOperation(ImageIUploadingComponent)
    this.http.post<Response>(this.local_url, formData, {headers})
      .subscribe({
        next: (response: Response) => {
          console.log('response.data: ', response.data)
          this.snackBarManager.finishOperation(response.message, true)
          this.imageState.addNewImages(response.data)
        },
        error: (err) => {
          const errorMsg = err.error?.message
          this.snackBarManager.finishOperation(errorMsg, false)
        }
      })
  }

  private prepareImagesForUpload(images: File[]){
    const formData = new FormData();
    for (let image of images){
      formData.append('images', image);
    }
    return formData
  }

  getOneImage(imageId: string){
    return this.http.get(`${this.local_url}/${imageId}`)
  }

  deleteImages(){
    this.snackBarManager.beginComplexOperation(DeletingLoadingTemplate)
    this.http.delete<Response>(`${this.local_url}`, {body: this.imageState.getSelectedImages()})
      .subscribe(this.observerHandler)
  }

  observerHandler: { next: (response: Response) => void; error: (err: any) => void } = {
    next: (response: Response) => this.onSuccess(response),
    error: (err: any) => this.onError(err?.error?.message)
  }

  onSuccess(resp: Response){
    this.imageState.removeImages(resp.data)
    this.imageState.unSelectAllImages()
    this.snackBarManager.finishOperation(resp.message, true)
  }

  onError(errorMsg: string){
    this.snackBarManager.finishOperation(errorMsg ? errorMsg : UNKNOWN_ERROR, false)
  }

}
