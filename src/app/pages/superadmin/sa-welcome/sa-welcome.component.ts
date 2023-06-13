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
  agentProperties: any;
  agentInterestedProperties: any[] = [];

  propertyCount: number = 0;
  agentPropertyCount: number = 0;
  userCount: number = 0;
  adminCount: number = 0;
  superadminCount: number = 0;
  interestedCount: number = 0;
  agentInterestedCount: number = 0;

  isLoggedIn = false;
  @Input() id: any;
  @Input() user: any;
  @Input() username: any;
  @Input() userRole: any;
  @Input() userIdentity: any;

  constructor(
    private _user: UserService,
    private _property: PropertyService,
    private _saved: SavedService,
    private router: Router,
    private login: LoginService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    if (this.isLoggedIn) {
      this.userIdentity = this.login.getUserId();
      this.user = this.login.getUser();
      this.userRole = this.login.getUserRole();
      
    }

    if (this.userRole == 'Admin') {
      this.getAgentProperties();
      this.getAgentInterested();
    } else if (this.userRole == 'SuperAdmin') {
      this.getUsers();
      this.getProperties();
      this.getInterested();
    }
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
  getAgentProperties() {
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        this.agentProperties = data.filter(
          (property: any) => property.user.username == this.user.username
        );
        console.log('all properties' ,this.properties)
        console.log('agent properties' ,this.agentProperties)
        this.countAgentProperties();
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
  getAgentInterested() {
    this._saved.getSavedProperties().subscribe((data: any) => {
      this.agentInterestedProperties = data.filter(
        (property: any) =>
          property.property.user.username == this.user.username
      );
      console.log(this.agentInterestedProperties);
      this.countAgentInterestedProperties();
    });
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

  countAgentProperties() {
    const agentPropertyCount = this.agentProperties.length;
    console.log('Number of Agent Properties:', agentPropertyCount);
    this.agentPropertyCount = agentPropertyCount;
  }

  countInterestedProperties() {
    const interestedCount = this.interestedProperties.length;
    console.log('Number of Interested Properties:', interestedCount);
    this.interestedCount = interestedCount;
  }

  countAgentInterestedProperties() {
    const agentinterestedCount = this.agentInterestedProperties.length;
    console.log('Number of Agent Interested Properties:', agentinterestedCount);
    this.agentInterestedCount = agentinterestedCount;
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
  onAgentInterestedClick() {
    this.router.navigate(['/admin/interestedProperties']);
  }
}
