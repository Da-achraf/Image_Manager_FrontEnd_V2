import {Injectable} from '@angular/core';
import {BehaviorSubject, from} from "rxjs";
import {Image} from "../models/image.model";

@Injectable({
  providedIn: 'root'
})
export class ImageStateManager {

  private allImages = new BehaviorSubject<Image[]>([])
  allImages$ = from(this.allImages)

  private selectedImagesIds = new BehaviorSubject<string[]>([])
  selectedImagesIds$ = from(this.selectedImagesIds)


  emitAllImages(images: Image[]){
    this.allImages.next(images)
  }

  addNewImage(image: Image){
    this.allImages.next([...this.allImages.value, image])
  }

  /**
   * If One Or Multiple Images Were Deleted
   */
  removeImages(images: Image[]){
    this.allImages.next(this.allImages.value.filter(item => !images.some(image => image.id === item.id)))
  }

  addNewImages(images: Image[]){
    this.allImages.next([...this.allImages.value, ...images])
  }

  getAllImages(){
    return this.allImages.value
  }
  getSelectedImages(){
    return this.selectedImagesIds.value
  }

  emitSelectedImage(themeId: string){
    this.selectedImagesIds.next([...this.selectedImagesIds.value, themeId])
  }

  emitUnSelectedImage(themeId: string){
    this.selectedImagesIds.next(this.selectedImagesIds.value.filter(id => id != themeId))
  }

  selectAllImages(){
    this.selectedImagesIds.next(this.allImages.value.map((image: Image) => image.id))
  }

  unSelectAllImages(){
    this.selectedImagesIds.next([])
  }

}
