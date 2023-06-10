import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';


interface Role{
  value: string,
  viewValue: string;
}
@Component({
  selector: 'app-sa-update-user',
  templateUrl: './sa-update-user.component.html',
  styleUrls: ['./sa-update-user.component.css'],
})
export class SaUpdateUserComponent {
  private routeSub: Subscription | undefined;
  constructor(
    private _route: ActivatedRoute,
    private _user: UserService,
    private _router: Router,
    private login: LoginService
  ) {}
  isLoggedIn = false;
  user: any;
  id: any;
  uId = 0;
  roles: Role[] = [
    { value: 'SuperAdmin', viewValue: 'SuperAdmin' },
    { value: 'Admin', viewValue: 'Agent' },
    { value: 'Normal', viewValue: 'Customer' },
    
  ]
  customer: any;
  newPassword: string = '';
  ngOnInit(): void {
    this.routeSub = this._route.params.subscribe((params) => {
      this.uId = params['uId'];
      console.log(this.uId);
    });
    this.getUserId();
    this._user.getOneUser(this.uId).subscribe(
      (data: any) => {
        this.customer = data;
        console.log(this.customer);
      },
      (error) => {
        console.log(error);
      }
    );
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
  selectedRole = this.roles[2].value;
  public updateUser() {
    const requestData = {
      email: this.customer.email,
      phonenumber: this.customer.phonenumber,
      username: this.customer.username,
      password: this.newPassword,
      authorities: {
        authority: this.selectedRole,
      },
    };
    const updatedUser = {
      email: this.customer.email,
      phonenumber: this.customer.phonenumber,
      username: this.customer.username,
      password: this.newPassword,
      authorities :[requestData.authorities]
    };
    console.log(requestData);
    console.log(updatedUser)

    this._user.updateUser(updatedUser).subscribe(
      (data: any) => {
        Swal.fire('Success', 'User Updated', 'success').then(() => {
          this._router.navigate(['superadmin/users']);
        });
      },
      (error: any) => {
        Swal.fire('Error', 'User not updated', 'error');
        console.log(error);
      }
    );
  }
  goBackSuperAdmin(): void {
    this._router.navigate(['/superadmin']);
  }
  goBackAdmin() {
    this._router.navigate(['/admin']);
  }
}
