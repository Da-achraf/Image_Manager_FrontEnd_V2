import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThemesComponent} from "./themes/themes.component";
import {ImagesComponent} from "./images/images.component";
import {imagesGuard} from "../../guards/images.guard";
import {imageGuard} from "../../guards/image.guard";
import {ImageComponent} from "./image/image.component";

const routes: Routes = [
  { path: '', redirectTo: 'themes', pathMatch: 'full' },
  {
    path: 'themes/:id',
    component: ImagesComponent,
    canActivate: [imagesGuard],
  },
  {
    path: 'image/:id',
    component: ImageComponent,
    canActivate: [imageGuard],
  },
  { path: 'themes', component: ThemesComponent },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
