import {inject, Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {API_URL_TOKEN} from "../config/api.config";
import {filter, map, of, switchMap, tap} from "rxjs";
import { Response } from "../models/response.model";
import {Theme} from "../models/theme.model";
import {ThemeStateManager} from "./theme-state-manager";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  http = inject(HttpClient)
  authService = inject(AuthService)
  themeState = inject(ThemeStateManager)
  api_url = inject(API_URL_TOKEN)
  local_url = `${this.api_url}/auth/theme`

  constructor() {
    this.loadThemesForUser().subscribe()
  }

  loadThemesForUser(){
    const userId = this.authService.getDecodedToken()?.userId
    return this.http.get<Response>(`${this.local_url}/user/${userId}`).pipe(
      map((resp: Response) => resp.data),
      map((themes: any) => {
        return themes.map((theme: any) =>
          new Theme({
            id: theme.id,
            label: theme.label,
            UserId: theme.UserId
        }))
      }),
      switchMap((themes: Theme[]) => of(themes)),
      tap((themes: Theme[]) => this.themeState.emitAllThemes(themes))
    )
  }

  saveTheme(label: string){
    return of(label).pipe(
      filter((label: string) => label?.length > 2),
      map((label: string) => {
        const UserId = this.authService.getDecodedToken()?.userId
        return new Theme({ label: label, UserId })
      }),
      switchMap((theme: Theme) => {
        return this.http.post<Response>(this.local_url, theme).pipe(
          tap((resp: Response) => this.themeState.addNewTheme(resp.data))
        )
      })
    )
  }

  deleteThemes(themesIds: string[]){
    this.themeState.unSelectAllThemes()
	  return this.http.delete<Response>(`${this.local_url}`, {body: themesIds}).pipe(
	    tap((resp: Response) => this.themeState.removeThemes(resp.data))
    )
  }
}
