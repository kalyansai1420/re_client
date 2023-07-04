import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private userService: UserService, private snack: MatSnackBar) {}

  public user = {
    username: '',
    password: '',
    phonenumber: '',
    email: '',
  };

  ngOnInit(): void { }
  
  clearInput() {
    this.user.email = '';
    this.user.phonenumber = '';
    this.user.username = '';
    this.user.password = '';
  }

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Name is required', 'ok');
      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('password is required', 'ok');
      return;
    }

    if (this.user.phonenumber == '' || this.user.phonenumber == null) {
      this.snack.open('phonenumber is required', 'ok');
      return;
    }
    if (this.user.email == '' || this.user.email == null) {
      this.snack.open('email is required', 'ok');
      return;
    }

    //add user
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.username);
        Swal.fire('successfully done !!', 'user ' + data.username, 'success');
      },
      (error: any) => {
        console.log(error);

        this.snack.open(error.error.message, 'ok');
      }
    );
  }
}
