import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL_TOKEN} from "../config/api.config";
import {Response} from "../models/response.model";
import {map, Observable, switchMap, tap} from "rxjs";
import {ImageStateManager} from "./image-state-manager";
import {UNKNOWN_ERROR} from "../constants/error.constant";
import {SnackBarManager} from "./snack-bar-manager.service";
import {Image} from "../models/image.model";
import {FLASK_API_URL_TOKEN} from "../config/flask-api.config";
import {MatDialog} from "@angular/material/dialog";
import {SimilarImagesDialogComponent} from "../components/similar-images/similar-images-dialog.component";
import {DELETING, UPLOADING} from "../constants/loading-strings.constant";
import {LoadingTemplateComponent} from "../shared/components/loading-template.component";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  http = inject(HttpClient)
  imageState = inject(ImageStateManager)
  dialog = inject(MatDialog)
  snackBarManager = inject(SnackBarManager)
  api_url = inject(API_URL_TOKEN)
  local_url = `${this.api_url}/auth/image`
  flask_api_url = inject(FLASK_API_URL_TOKEN)


  loadImagesForTheme(themeId: string):Observable<Response>{
    return this.http.get<Response>(`${this.local_url}/theme/${themeId}`).pipe(
      tap((response: Response) => this.imageState.emitAllImages(response.data)),
    )
  }

  uploadImages(files: File[], themeId: string){
    const headers = new HttpHeaders({ themeId })
    const formData = this.prepareImagesForUpload(files)
    this.snackBarManager.beginComplexOperation(LoadingTemplateComponent, UPLOADING)
    this.http.post<Response>(this.local_url, formData, {headers})
      .subscribe({
        next: (response: Response) => {
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

  findSimilar(){
    this.http.post<any>(`${this.flask_api_url}/find_similar`, this.findSimilarReqBody())
      .subscribe({
        next: (response: any) => {
          const otherImages = response.map((imageId: string) => this.imageState.getImageById(imageId))
          const selectedImage = this.imageState.getImageById(this.findSimilarReqBody().selectedImage.id)
          this.dialog.open(SimilarImagesDialogComponent, {data: {
            selectedImage,
            otherImages
          }}).afterClosed().pipe(
            map((notRelevant: any[]) => console.log(notRelevant))
          ).subscribe()
        },
        error: err => {
          this.snackBarManager.finishOperation(err.message, false);
        }
      })
  }

  private findSimilarReqBody(){
    const selectedImageId = this.imageState.getSelectedImages()[0]
    const selectedImage = this.imageState.getAllImages().find(((image: Image) => image.id === selectedImageId)) as Image
    const otherImages = this.imageState.getAllImages().filter(((image: Image) => image.id != selectedImageId))
    return {
      selectedImage: this.extractImageFeatures(selectedImage),
      otherImages: otherImages.map((image: Image) => this.extractImageFeatures(image))
    }
  }

  private extractImageFeatures(image: Image){
    return {
      id: image?.id,
      histogram: image?.histogram,
      moments: image?.moments,
      dominantColors: image.dominantColors,
      gaborFilterValues: image.gaborFilterValues,
      tamura: image.tamura
    }
  }

  getOneImage(imageId: string){
    return this.http.get(`${this.local_url}/${imageId}`)
  }


  deleteImages(){
    this.snackBarManager.beginComplexOperation(LoadingTemplateComponent, DELETING)
    this.http.delete<Response>(`${this.local_url}`, {body: this.imageState.getSelectedImages()})
      .subscribe(this.deleteImagesHandler)
  }

  deleteImagesHandler: { next: (response: Response) => void; error: (err: any) => void } = {
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
