import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {SirvApiService} from "../../services/sirv-api.service";
import {faCloud, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {IMAGE_LACKING, UNKNOWN_ERROR} from "../../constants/error.constant";
import {finalize, tap} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  @ViewChild('fileInput', { read: ElementRef }) fileInput!: ElementRef<HTMLInputElement>;

  sirv = inject(SirvApiService)
  authService = inject(AuthService)

  info = ''
  error = ''

  // Font Icons
  protected readonly faSpinner = faSpinner;
  protected readonly faCloud = faCloud;

  uploading =  false

  image = new File([], '')


  ngOnInit() {
  }

  onChange(event: any){
    this.image = event.target?.files[0]
  }

  upload(){
    this.info = ''
    this.error = ''
    if (this.image?.name?.length != 0){
      this.uploading = true
      this.sirv.uploadImage(this.image).pipe(
        finalize(() => {
	        this.uploading = false
	        this.fileInput.nativeElement.value = ''
        })
      ).subscribe({
        next: resp => this.info = resp.message,
        error: err => this.error = err.error.message ? err.error.message : UNKNOWN_ERROR
      })
    }
    else
      this.error = IMAGE_LACKING
  }


  testDecodeToken(){
    this.authService.getTokenExpirationDate();
  }

}
