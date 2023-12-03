import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Image} from "../../../models/image.model";
import {MatDialog} from "@angular/material/dialog";
import {HistogramDialogComponent} from "../../histogram/histogram-dialog.component";
import {DominantColorsDialogComponent} from "../../dominant-colors/dominant-colors-dialog.component";
import {MomentsDialogComponent} from "../../moment/moments-dialog.component";
import {GaborFilterDialogComponent} from "../../gaborFilter/gabor-filter-dialog.component";
import {TamuraDialogComponent} from "../../tamura/tamura-dialog.component";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  router = inject(Router)
  dialog = inject(MatDialog)

  image = history.state as Image

  ngOnInit() {
    console.log('Image Init.')
    console.log(this.image)
  }

  showHistogram(histogram: string){
    this.dialog.open(HistogramDialogComponent, {
      data: histogram
    });
  }

  showMoment(moment: string){
    this.dialog.open(MomentsDialogComponent, {
      data: moment
    });
  }

  showDominantColors(image: Image){
    this.dialog.open(DominantColorsDialogComponent, {
        data: image
    });
  }

  showGaborFilterValues(values: string){
    this.dialog.open(GaborFilterDialogComponent, {
      data: values
    });
  }

  showTamura(values: string){
    this.dialog.open(TamuraDialogComponent, {
      data: values
    });
  }

}
