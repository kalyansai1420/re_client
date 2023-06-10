import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-u-sidebar',
  templateUrl: './u-sidebar.component.html',
  styleUrls: ['./u-sidebar.component.css'],
})
export class USidebarComponent {
  constructor(public login: LoginService) {}

  ngOnInit(): void {}
  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
