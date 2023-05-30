import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  mode = new FormControl('over');

  isSidenavVisible: boolean = false;

  constructor(public login: LoginService) {}

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

  public logout() {
    this.login.logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }
}
