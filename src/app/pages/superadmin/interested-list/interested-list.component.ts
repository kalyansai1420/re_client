import { Component, Input } from '@angular/core';
import { SavedService } from 'src/app/services/saved.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interested-list',
  templateUrl: './interested-list.component.html',
  styleUrls: ['./interested-list.component.css'],
})
export class InterestedListComponent {
  interestedProperties: any[] = [];
  agentInterestedProperties: any[] = [];
  customerInterestedProperties: any[] = [];
  isLoggedIn = false;
  @Input() user: any;
  @Input() id: any;
  @Input() username: any;
  constructor(
    private _saved: SavedService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserId();

    if (this.user.authorities[0].authority === 'Normal') {
      this.getCustomerInterested();
    } else if (this.user.authorities[0].authority === 'Admin') {
      this.getAgentInterested();
    } else {
      this.getInterested();
    }
  }
  getUserId() {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data: any) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
    this.id = this.user.uId;
    this.username = this.user.username;
  }
  getInterested() {
    this._saved.getSavedProperties().subscribe(
      (data: any) => {
        this.interestedProperties = data;
        console.log(this.interestedProperties);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getAgentInterested() {
    this._saved.getSavedProperties().subscribe((data: any) => {
      this.agentInterestedProperties = data.filter(
        (property: any) => property.property.user.username == this.username
      );
      console.log(this.agentInterestedProperties);
    });
  }

  getCustomerInterested() {
    this._saved.getSavedProperties().subscribe((data: any) => {
      this.customerInterestedProperties = data.filter(
        (property: any) => property.user.username == this.username
      );
      console.log(this.customerInterestedProperties);
    });
  }

  removeProperty(saveId: any) {
    console.log(saveId);
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        console.log('Deleting property:', saveId);
        this._saved.removePropertyfromSaved(saveId).subscribe(
          (data: any) => {
            console.log('Property deleted:', data);

            Swal.fire('success', 'Property deleted successfully', 'success');
            
          },
          (error) => {
            Swal.fire('error', 'Error deleting property', 'error');
            console.log('Error deleting property:', error);
          }
        );
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/superadmin']);
  }
}
