import {InjectionToken} from "@angular/core";

const FLASK_API_URL = 'http://35.177.90.253:5000'


export const FLASK_API_URL_TOKEN = new InjectionToken('FLASK_API_URL', {
  providedIn: 'root',
  factory: () => FLASK_API_URL
})
