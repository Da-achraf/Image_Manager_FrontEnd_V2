import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ThemeStateManager} from "../services/theme-state-manager";
import {Theme} from "../models/theme.model";

export const imageGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)

  const themeState = inject(ThemeStateManager)

  const imageId: string = route.params['id']



  const choosenTheme = getChoosenTheme()

  //
  // let themeExist = null
  // themeExist = allThemes.find((theme: Theme) => theme.id == id)
  //
  // if (themeExist)
  //   return true
  // await router.navigate([`/app/themes/${choosenTheme?.id}`])
  return true;
};


const getChoosenTheme = () => {
  const themeState = inject(ThemeStateManager)
  const choosenTheme = themeState.getChoosenTheme()
  if (choosenTheme)
    return choosenTheme
  return getChoosenThemeFromLocalStorage()
}

const getChoosenThemeFromLocalStorage = () => {
  const chooseThemeUnParsed = localStorage.getItem('choosenTheme')
  if (chooseThemeUnParsed)
    return JSON.parse(chooseThemeUnParsed) as Theme
  return null
}
