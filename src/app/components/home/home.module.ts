import {NgModule} from '@angular/core';
import {HomeComponent} from "./home.component";
import {HeaderComponent} from "./header/header.component";
import {ThemesComponent} from "./themes/themes.component";
import {HomeRoutingModule} from "./home-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ImagesComponent} from './images/images.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {IsCheckedPipe} from "../../shared/components/IsCheckedPipe";
import {ImageUploaderComponent} from "./images/image-uploader.component";
import { ImageComponent } from './image/image.component';
import {MatListModule} from "@angular/material/list";
import {SizePipe} from "../../pipes/size.pipe";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
	declarations: [
		HeaderComponent,
    HomeComponent,
    ThemesComponent,
    ImagesComponent,
    ImageComponent,
	],
	imports: [
		CommonModule,
		HomeRoutingModule,
		FontAwesomeModule,
		MatCheckboxModule,
		NgOptimizedImage,
		MatButtonModule,
		MatInputModule,
		FormsModule,
		MatDialogModule,
		MatSnackBarModule,
		IsCheckedPipe,
		ImageUploaderComponent,
		MatListModule,
		SizePipe,
		MatMenuModule
	],
})
export class HomeModule { }
