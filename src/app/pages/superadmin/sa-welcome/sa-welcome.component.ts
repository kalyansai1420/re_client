import { Component, Input } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SavedService } from 'src/app/services/saved.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sa-welcome',
  templateUrl: './sa-welcome.component.html',
  styleUrls: ['./sa-welcome.component.css'],
})
export class SaWelcomeComponent {
  users: any[] = [];
  properties: any[] = [];
  interestedProperties: any[] = [];
  propertyCount: number = 0;
  userCount: number = 0;
  adminCount: number = 0;
  superadminCount: number = 0;
  interestedCount: number = 0;
  isLoggedIn = false;
  @Input() user: any;
  @Input() id: any;
  constructor(
    private _user: UserService,
    private _property: PropertyService,
    private _saved: SavedService,
    private router: Router,
    private login: LoginService
  ) {}

  ngOnInit(): void {
    this.getUserId();
    this.getUsers();
    this.getProperties();
    this.getInterested();
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

  getUsers() {
    this._user.getUsers().subscribe(
      (data: any) => {
        this.users = data;
        this.countUsers();
        this.countAdmins();
        this.countSuperAdmins();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProperties() {
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        this.countProperties();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getInterested() {
    this._saved.getSavedProperties().subscribe(
      (data: any) => {
        this.interestedProperties = data;
        console.log(this.interestedProperties);
        this.countInterestedProperties();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  countSuperAdmins() {
    let superadminCount = 0;
    this.users.forEach((user) => {
      user.authorities.forEach((authority: any) => {
        if (authority.authority === 'SuperAdmin') {
          superadminCount++;
        }
      });
    });
    console.log('Number of Super Admins:', superadminCount);

    this.superadminCount = superadminCount;
  }
  countAdmins() {
    let adminCount = 0;
    this.users.forEach((user) => {
      user.authorities.forEach((authority: any) => {
        if (authority.authority === 'Admin') {
          adminCount++;
        }
      });
    });
    console.log('Number of Admins:', adminCount);

    this.adminCount = adminCount;
  }
  countUsers() {
    // const userCount = this.users.length;
    let userCount = 0;
    this.users.forEach((user) => {
      user.authorities.forEach((authority: any) => {
        if (authority.authority === 'Normal') {
          userCount++;
        }
      });
    });
    console.log('Number of Users:', userCount);
    this.userCount = userCount;
  }

  countProperties() {
    const propertyCount = this.properties.length;
    console.log('Number of Properties:', propertyCount);
    this.propertyCount = propertyCount;
  }

  countInterestedProperties() {
    const interestedCount = this.interestedProperties.length;
    console.log('Number of Interested Properties:', interestedCount);
    this.interestedCount = interestedCount;
  }

  onPropertiesClick() {
    this.router.navigate(['/superadmin/properties']);
  }

  onCustomersClick() {
    this.router.navigate(['/superadmin/users']);
  }
  onAdminsClick() {
    this.router.navigate(['/superadmin/admins']);
  }
  onSuperAdminsClick() {
    this.router.navigate(['/superadmin/superadmins']);
  }
  onInterestedClick() {
    this.router.navigate(['/superadmin/interestedProperties']);
  }
}
