import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  
  properties: any[] = [];

  constructor(
    private _property: PropertyService,
    private login: LoginService,
    private router: Router
  ) {}

  isLoggedIn = false;
  @Input() user: any;
  @Input() id: any;

  ngOnInit(): void {
    this.getUserId();
    this.getPropertyUser();
  }

  getUserId() {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data: any) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
    this.id = this.user.uId;
    console.log(this.id);
  }

  getPropertyUser() {
    this._property.getPropertyUser(this.id).subscribe(
      (data: any) => {
        this.properties = data;
        console.log(this.properties);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCustomersClick() {}

  onPropertiesClick() {
     this.router.navigate(['/admin/properties']);
  }

  onAdminsClick() {
    console.log('Admins button clicked');
  }
}
