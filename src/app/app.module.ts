import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageCropperModule } from 'ngx-image-cropper'
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/auth/register/register.component';
import {CustomErrorHandler} from "./services/error-handler.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthorizationTokenInterceptor} from "./interceptors/authorization-token.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {ImageIUploadingComponent} from "./components/home/images/image-uploading-template.component";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ImageCropperModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		MatSnackBarModule,
		ImageIUploadingComponent
	],
	providers: [
		{provide: ErrorHandler, useClass: CustomErrorHandler},
		{provide: HTTP_INTERCEPTORS, useClass: AuthorizationTokenInterceptor, multi: true},
		{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 4500}}
	],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
