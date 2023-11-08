import {inject, Injectable} from '@angular/core';
import {FLASK_API_URL_TOKEN} from "../config/flask-api.config";
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs';
import * as Highcharts from "highcharts";

@Injectable({
  providedIn: 'root'
})
export class HistogramService {

  flask_api_url = inject(FLASK_API_URL_TOKEN)
  http = inject(HttpClient)

  private readonly colorChannelNames = ['Blue', 'Green', 'Red'];

  xAxisCategories = Array.from({ length: 256 }, (_, i) => i.toString());



  loadHistogram(imageUrl: string){
    return this.http.get<any>(`${this.flask_api_url}/histogram?image_url=${imageUrl}`).pipe(
      map((data: any) => {
        return data.histogram?.map((channelHist: number[], index: number) => ({
          name: this.colorChannelNames[index],
          data: channelHist,
        }));
      })
    )
  }


  getChart(data: any){
    Highcharts.chart('container', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Color Histogram',
      },
      credits: {
        enabled: false
      },
      yAxis:{
        title:{
          text: "Frequency"
        }
      },
      xAxis: {
        categories: this.xAxisCategories,
        title:{
          text: "Pixel Value"
        }
      },
      series: data,
      colors: ['#0000FF', '#00FF00', '#FF0000'],
    })
  }


}
