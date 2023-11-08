import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ThemeStateManager} from "../services/theme-state-manager";
import {Theme} from "../models/theme.model";

export const imagesGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)

  /**
   * Param Passed To The Route /app/themes/:id
   * It's Actually The ID Of The Theme We Want To
   * Retrieve Its Images.
   */
  const id: string = route.params['id']

  const allThemes = getAllThemes()

  let themeExist = null
  themeExist = allThemes.find((theme: Theme) => theme.id == id)

  if (themeExist)
    return true
  await router.navigate(['themes'])
  return false;
};


const getAllThemes = () => {
  const themeState = inject(ThemeStateManager)
  const allThemes = themeState.getAllThemes()
  if (allThemes.length != 0)
    return allThemes
  return getAllThemesFromLocalStorage()
}

const getAllThemesFromLocalStorage = () => {
  const allThemesUnParsed = localStorage.getItem('allThemes')
  if (allThemesUnParsed)
    return JSON.parse(allThemesUnParsed) as Theme[]
  return []
}
