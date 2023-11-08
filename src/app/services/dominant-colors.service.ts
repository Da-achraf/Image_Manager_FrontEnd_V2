import {inject, Injectable} from '@angular/core';
import {FLASK_API_URL_TOKEN} from "../config/flask-api.config";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";

export type RGBColorArray = [number, number, number];
@Injectable({
  providedIn: 'root'
})
export class DominantColorsService {

  flask_api_url = inject(FLASK_API_URL_TOKEN)
  http = inject(HttpClient)

    fetchDominantColors(imageUrl: string, numberOfColors: number){
      return this.http.get<any>(`${this.flask_api_url}/dominant_colors?image_url=${imageUrl}&num_colors=${numberOfColors}`).pipe(
        map((data: any) => data.dominant_colors[0]),
        map((dominant_colors: any) => dominant_colors.map((colorArray: RGBColorArray) => {
          const [r, g, b] = colorArray;
          return `rgb(${r}, ${g}, ${b})`;
        })),
      )
    }

}
