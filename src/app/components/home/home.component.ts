import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {faChevronRight, faCloud, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {map} from "rxjs";
import {Theme} from "../../models/theme.model";
import {BreadcrumbService} from "xng-breadcrumb";
import {ThemeStateManager} from "../../services/theme-state-manager";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  themeState = inject(ThemeStateManager)
  breadcrumbService = inject(BreadcrumbService)

  ngOnInit(): void {
    this.themeState.choosenTheme$.pipe(
      map((theme: Theme) => theme.label)
    ).subscribe((themeLabel: string |  undefined) => {
      if (themeLabel){
        this.breadcrumbService.set('@theme', themeLabel)
        this.breadcrumbService.set('@null1', themeLabel)
      }
    })
    this.breadcrumbService.set('@themes', 'Themes')
    this.breadcrumbService.set('@null2', {skip: true})
  }
  protected readonly faChevronRight = faChevronRight;
}
