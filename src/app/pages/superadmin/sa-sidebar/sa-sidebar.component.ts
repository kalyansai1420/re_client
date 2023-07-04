import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sa-sidebar',
  templateUrl: './sa-sidebar.component.html',
  styleUrls: ['./sa-sidebar.component.css']
})
export class SaSidebarComponent {

   constructor(public login: LoginService) {}

  ngOnInit(): void {}
  public logout() {
    this.login.logout();
    window.location.reload();
  }

}
