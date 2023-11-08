import {inject, Injectable} from '@angular/core';
import {FLASK_API_URL_TOKEN} from "../config/flask-api.config";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  flask_api_url = inject(FLASK_API_URL_TOKEN)
  http = inject(HttpClient)

  fetchMomentData(imageUrl: string){
    return this.http.get<any>(`${this.flask_api_url}/moments?image_url=${imageUrl}`).pipe(
      map((data: any) => data?.moments)
    )
  }
}
