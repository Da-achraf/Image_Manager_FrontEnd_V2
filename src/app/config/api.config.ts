import {InjectionToken} from "@angular/core";

const API_URL = 'http://localhost:5000/api'

export const API_URL_TOKEN = new InjectionToken('API_URL', {
  providedIn: 'root',
  factory: () => API_URL
})
