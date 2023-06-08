import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router, private _user: UserService) { }

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      const path = segments[0]?.path;
      this.getUsersByPath(path);
    });
  }

  editUser(user: any) {
    console.log('clicked edit user');
  }
  deleteUser(user: any) {
    console.log('clicked delete user');
  }

  getUsersByPath(path: string) {
    console.log(path);
    this._user.getUsers().subscribe(
      (data: any) => {
        if (path === 'users') {
          this.users = data.filter(
            (user: any) =>
              user.authorities[0]?.authority === 'Normal' ||
              user.authorities.length === 0
          );
        } else if (path === 'admins') {
          this.users = data.filter(
            (user: any) => user.authorities[0]?.authority === 'Admin'
          );
        } else if (path === 'superadmins') {
          this.users = data.filter(
            (user: any) => user.authorities[0]?.authority === 'SuperAdmin'
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUsers() {
    console.log('working');
    this._user.getUsers().subscribe(
      (data: any) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/superadmin']);
  }
}
