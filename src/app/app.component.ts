import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageStateManager} from "./services/image-state-manager";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subject} from "rxjs";
import {SnackBarManager} from "./services/snack-bar-manager.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  imageChangedEvent: any = '';
  croppedImage: any = '';
  destroyed$ = new Subject<void>()

  constructor(
    private sanitizer: DomSanitizer,
    private imageState: ImageStateManager,
    private snackBar: MatSnackBar,
    private snackBarManager: SnackBarManager
  ) {
  }



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    const file: File = event.target.files[0];
    console.log(file)
    this.uploadImage(file);

  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl != null && event.blob != null) {
      console.log(event.blob)
      console.log(event.objectUrl)
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    }
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message


  }

  uploadImage(file: File){
    // this.sirv.uploadImage(file).subscribe(console.log)
  }

  ngOnInit(): void {
    // this.imageState.imageUploadingStart$.pipe(
	  //   takeUntil(this.destroyed$)
    //   )
    //   .subscribe({
    //       next: (value: boolean) => {
    //         if(value){
    //           this.snackBarManager.beginComplexOperation(ImageIUploadingComponent)
    //           // this.snackBar.openFromComponent(ImageIUploadingComponent, {duration: undefined})
    //         }
    //       }
    //   })
    //
    // this.imageState.imageUploadingFinish$.pipe(
    //     takeUntil(this.destroyed$)
    //   )
    //   .subscribe({
    //     next: (message: string) => {
    //       if(message.length != 0){
    //         this.snackBarManager.finishOperation(message, true)
    //         // this.snackBar.open(message, 'Hide')
    //
    //       }
    //     }
    //   })
  }

	ngOnDestroy(): void {
      this.destroyed$.next()
	}

}
