import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { SHA1 } from 'crypto-js';
import {Response} from "../models/response.model";
@Injectable({
  providedIn: 'root'
})
export class SirvApiService {

  private http = inject(HttpClient);

  uploadImage(file: File){
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<Response>('http://localhost:5000/api/auth/image', formData)
  }
}
