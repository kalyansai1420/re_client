import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  deleteUser(uId: any) {
    console.log('clicked delete user :', uId);
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        console.log('Deleting user:', uId);
        this._user.deleteUser(uId).subscribe(
          (data: any) => {
            console.log('User deleted:', data);
            Swal.fire('success', 'User deleted successfully', 'success');
            window.location.reload();
          },
          (error) => {
            Swal.fire('error', 'Error deleting user', 'error');
            console.log('Error deleting user:', error);
          }
        );
      }
    });
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
