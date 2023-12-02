import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Image} from "../../../models/image.model";
import {MatDialog} from "@angular/material/dialog";
import {HistogramComponent} from "../../histogram/histogram.component";
import {MomentComponent} from "../../moment/moment.component";
import {DominantColorsComponent} from "../../dominant-colors/dominant-colors.component";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  router = inject(Router)
  image = history.state as Image

  options = [3, 5, 7, 10]

  dialog = inject(MatDialog)

  ngOnInit() {
    console.log(this.image)
  }

  showHistogram(histogram: string){
    this.dialog.open(HistogramComponent, {
      data: histogram
    });
  }


  showMoment(imageUrl: any){
    this.dialog.open(MomentComponent, {
      data: imageUrl
    });
  }

  showDominantColors(dominantColors: string, imageUrl: string|undefined, numOfColors: number){
    this.dialog.open(DominantColorsComponent, {
        data: {dominantColors, imageUrl, numOfColors},
    });
  }

}
