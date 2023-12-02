import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, from} from "rxjs";
import {User} from "../models/user.model";
import {Theme} from "../models/theme.model";

@Injectable({
  providedIn: 'root'
})
export class ThemeStateManager {

  private loggedInUser = new BehaviorSubject<User>(new User({}))
  loggedInUser$ = from(this.loggedInUser)

  private allThemes = new BehaviorSubject<Theme[]>([])
  allThemes$ = from(this.allThemes)

  private selectedThemesIds = new BehaviorSubject<string[]>([])
  selectedThemesIds$ = from(this.selectedThemesIds)

  private choosenTheme = new BehaviorSubject<Theme>(new Theme({}))
  choosenTheme$ = from(this.choosenTheme)

  constructor() {
    window.onbeforeunload = () => {
      if (this.getAllThemes().length != 0)
        localStorage.setItem('allThemes', JSON.stringify(this.getAllThemes()))
    };
  }

  emitLoggedInUser(user: User){
    this.loggedInUser.next(user)
  }

  emitAllThemes(themes: Theme[]){
    this.allThemes.next(themes)
  }

  addNewTheme(theme: Theme){
    this.allThemes.next([...this.allThemes.value, theme])
  }

  /**
   * If One Or Multiple Themes Were Deleted
   */
  removeThemes(themes: Theme[]){
	  this.allThemes.next(this.allThemes.value.filter(item => !themes.some(theme => theme.id === item.id)))
  }

  getAllThemes(){
    return this.allThemes.value
  }
  getSelectedThemes(){
    return this.selectedThemesIds.value
  }

  emitSelectedTheme(themeId: string){
    this.selectedThemesIds.next([...this.selectedThemesIds.value, themeId])
  }

  emitChoosenTheme(themeId: string){
    const choosenTheme = this.allThemes.value.find((theme: Theme) => theme.id == themeId)
    console.log(this.allThemes.value)
    if (choosenTheme)
     this.choosenTheme.next(choosenTheme)
  }

  getChoosenTheme(){
    return this.choosenTheme.value
  }

  emitUnSelectedTheme(themeId: string){
    this.selectedThemesIds.next(this.selectedThemesIds.value.filter(id => id != themeId))
  }

  selectAllThemes(){
    this.selectedThemesIds.next(this.allThemes.value.map((theme: Theme) => theme.id))
  }

  unSelectAllThemes(){
    this.selectedThemesIds.next([])
  }

}
