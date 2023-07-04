import { Component, OnDestroy } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  constructor(private localStorageService: LoginService) {}

  ngOnDestroy() {
    // Remove user data from local storage
    this.localStorageService.removeUser();
  }
}
