import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {faCloud, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, switchMap, tap} from "rxjs";
import {ImageService} from "../../../services/image.service";
import {UploadImageDialogCompoenent} from "./upload-image-dialog.compoenent";
import {MatDialog} from "@angular/material/dialog";
import {ImageStateManager} from "../../../services/image-state-manager";
import {DeleteDialogComponent} from "../../../shared/components/delete-dialog.component";
import {ThemeStateManager} from "../../../services/theme-state-manager";
import {Image} from "../../../models/image.model";

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
  themeState = inject(ThemeStateManager)
  dialog = inject(MatDialog)

  images$ = this.imageState.allImages$

  selectedImagesIds$ = this.imageState.selectedImagesIds$

  ngOnInit(){
	  this.activatedRoute.params.pipe(
	    map((paramsObj: any) => paramsObj?.id),
	    tap((themeId: string) => this.themeId = themeId),
	    switchMap((themeId: string) => this.imageService.loadImagesForTheme(themeId)),
	  ).subscribe()
  }

  openUploadImageDialog(){
    this.dialog.open(UploadImageDialogCompoenent).afterClosed()
      .subscribe((files: File[]) => {
        this.uploadImages(files)
      });
  }

  uploadImages(files: File[]){
    if (files.length != 0)
      this.imageService.uploadImages(files, this.themeId)
  }

  openDeleteImageDialog(){
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().pipe(
        tap(toBeDeleted => {
          if (!toBeDeleted) this.imageState.unSelectAllImages()
        }),
        filter(toBeDeleted => toBeDeleted))
      .subscribe({
        next: _ => this.imageService.deleteImages()
      })
  }

  async navigateToChoosenImage(image: Image) {
    await this.router.navigateByUrl(`/app/image/${image.id}`, { state: image })
  }

  ngOnDestroy() {
    this.imageState.emitAllImages([])
  }

  protected readonly faCloud = faCloud;
}

