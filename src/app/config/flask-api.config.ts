import {InjectionToken} from "@angular/core";

const FLASK_API_URL = 'http://localhost:8000'


export const FLASK_API_URL_TOKEN = new InjectionToken('FLASK_API_URL', {
  providedIn: 'root',
  factory: () => FLASK_API_URL
})
