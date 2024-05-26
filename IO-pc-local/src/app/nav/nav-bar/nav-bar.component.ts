import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NavigationStart, Router, RouterLink} from "@angular/router";
import {RoutePaths} from "../../app.routes";

interface NavBarEntry {
  readonly name: string;
  readonly routerLink: string;
}

const NavBarEntries: NavBarEntry[] = [
  {name: "Strona główna", routerLink: RoutePaths.Home},
  {name: "Wybierz ankietę", routerLink: RoutePaths.Forms.All},
  {name: "Stwórz ankietę", routerLink: RoutePaths.Forms.New},
]

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  protected readonly entries = NavBarEntries;
  protected selectedIndex = 0;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.selectIndex(event.url.substring(1))
      }
    })
  }

  protected selectIndex(routerUrl: string): void {
    const routerFoundIndex = this.entries.findIndex(entry =>
      routerUrl === entry.routerLink
    )
    if (routerFoundIndex >= 0) {
      this.selectedIndex = routerFoundIndex
    }
  }
}
