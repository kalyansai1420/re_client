import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private _router: Router
  ) {}

  uId = 0;
  user: any;
  newPassword: string = '';
  ngOnInit(): void {
    this.routeSub = this._route.params.subscribe((params) => {
      this.uId = params['uId'];
      console.log(this.uId);
    });

    this._user.getOneUser(this.uId).subscribe(
      (data: any) => {
        this.user = data;
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateUser() {
    const requestData = {
      email: this.user.email,
      phonenumber: this.user.phonenumber,
      username: this.user.username,
      password: this.newPassword,
      authorities: {
        authority: this.user.authorities[0].authority,
      },
    };
    console.log(requestData);
    console.log(this.user);
    this._user.updateUser(requestData).subscribe(
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
