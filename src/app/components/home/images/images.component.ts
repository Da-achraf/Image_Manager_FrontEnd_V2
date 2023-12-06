import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {
  faChartSimple,
  faChevronRight,
  faCloud,
  faHandshakeSimple,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, switchMap, tap} from "rxjs";
import {ImageService} from "../../../services/image.service";
import {UploadImageDialogCompoenent} from "./upload-image-dialog.compoenent";
import {MatDialog} from "@angular/material/dialog";
import {ImageStateManager} from "../../../services/image-state-manager";
import {DeleteDialogComponent} from "../../../shared/components/delete-dialog.component";
import {ThemeStateManager} from "../../../services/theme-state-manager";
import {Image} from "../../../models/image.model";
import {AllCharacteristicsDialogComponent} from "../../all-characteristics/all-characteristics-dialog.component";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
})
export class ImagesComponent implements OnInit, OnDestroy {

  themeId: string = ''

  protected readonly faTrash = faTrash;
  protected readonly faPlus = faPlus;

  activatedRoute = inject(ActivatedRoute)
  imageService = inject(ImageService)
  router = inject(Router)
  imageState = inject(ImageStateManager)
  dialog = inject(MatDialog)

  images$ = this.imageState.allImages$
  selectedImagesIds$ = this.imageState.selectedImagesIds$

  loading: boolean = true

  ngOnInit(){
	  this.activatedRoute.params.pipe(
	    map((paramsObj: any) => paramsObj?.id),
	    tap((themeId: string) => this.themeId = themeId),
	    switchMap((themeId: string) => this.imageService.loadImagesForTheme(themeId)),
	  ).subscribe()

    setTimeout(() => {
      this.loading = false
    }, 500)
  }

  openUploadImageDialog(){
    this.dialog.open(UploadImageDialogCompoenent).afterClosed()
      .subscribe((files: File[]) => {
        this.uploadImages(files)
      });
  }

  /**
   * @TODO to implement
   */
  toggleSelect(imageId: string){

  }

  openCharacteristicsDialog(){
    const selectedImageId = this.imageState.getSelectedImages()[0]
    const selectedImage = this.imageState.getAllImages().find((image: Image) => image.id === selectedImageId)
    this.dialog.open(AllCharacteristicsDialogComponent, {
      data: selectedImage
    }).afterClosed().subscribe(_ => this.imageState.unSelectAllImages())
  }

  onFindSimilar(){
    this.imageService.findSimilar()
  }

  uploadImages(files: File[]){
    if (files.length != 0)
      this.imageService.uploadImages(files, this.themeId)
  }

  openDeleteImageDialog(){
    this.dialog.open(DeleteDialogComponent).afterClosed().pipe(
        tap(toBeDeleted => {
          if (!toBeDeleted) this.imageState.unSelectAllImages()
        }),
        filter(toBeDeleted => toBeDeleted))
      .subscribe({
        next: _ => this.imageService.deleteImages()
      })
  }

  async navigateToChosenImage(image: Image) {
    try {
      this.imageState.unSelectAllImages()
      const url = `/app/image/${image.id}`
      await this.router.navigateByUrl(url, { state: image })
    }catch (e){
      console.error(e)
    }
  }

  ngOnDestroy() {
    this.imageState.emitAllImages([])
  }

  protected readonly faCloud = faCloud;
  protected readonly faChartSimple = faChartSimple;
  protected readonly faHandshakeSimple = faHandshakeSimple;
  protected readonly faChevronRight = faChevronRight;
}

