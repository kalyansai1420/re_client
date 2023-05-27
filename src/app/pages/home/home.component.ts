import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  mode = new FormControl('over');

  isSidenavVisible: boolean = false;

  toggleSidenav() {
    this.isSidenavVisible = !this.isSidenavVisible;
  }

  isScrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
