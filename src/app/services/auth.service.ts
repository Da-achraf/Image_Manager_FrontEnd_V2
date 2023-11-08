import {Inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL_TOKEN } from "../config/api.config";
import { Response } from '../models/response.model'
import {jwtDecode} from 'jwt-decode'
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {ThemeStateManager} from "./theme-state-manager";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(API_URL_TOKEN) private api_url: string,
    private themeState: ThemeStateManager
  ){}


	register(formValue: any){
		return this.http.post<Response>(`${this.api_url}/register`, formValue)
	}

	login(formValue: any){
    return this.http.post<Response>(`${this.api_url}/login`, formValue).pipe(
      tap((resp: Response) => {
        if (resp.status === 200){
          this.setToken(resp.data.token)
          this.themeState.emitLoggedInUser(resp.data.user)
        }
      })
    )
  }

  async logout() {
	  if (this.getToken())
		  this.removeToken()
	  await this.router.navigate(['/login'])
  }

	isLoggedIn(){
    return !!this.getToken();
	}

  getToken(){
	  let token: any = localStorage.getItem('image_manager_token')
	  if (token){
		  return token
	  }
    return null
  }

  setToken(token: string){
    localStorage.setItem('image_manager_token', token)
  }

  removeToken(){
    localStorage.removeItem('image_manager_token')
  }

  getDecodedToken(): any {
    const token = this.getToken()
    if (token)
      return jwtDecode(token)
    return null
  }

  getTokenExpirationDate():Date | null {
    const decoded: any = this.getDecodedToken()
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenValid(){
    const expirationDate = this.getTokenExpirationDate()
    if (expirationDate){
      const now = new Date()
      return expirationDate >= now;
    }
    return false
  }

}
