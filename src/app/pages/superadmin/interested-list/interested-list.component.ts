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
  @Input() userRole: any;
  @Input() userIdentity: any;
  constructor(
    private _saved: SavedService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.login.isLoggedIn();
    if (this.isLoggedIn) {
      this.userIdentity = this.login.getUserId();
      this.user = this.login.getUser();
      this.userRole = this.login.getUserRole();
    }
    if (this.userRole === 'Normal') {
      this.getCustomerInterested();
    } else if (this.userRole === 'Admin') {
      this.getAgentInterested();
    } else {
      this.getInterested();
    }
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
        (property: any) => property.property.user.username == this.user.username
      );
      console.log(this.agentInterestedProperties);
    });
  }

  getCustomerInterested() {
    this._saved.getSavedProperties().subscribe((data: any) => {
      this.customerInterestedProperties = data.filter(
        (property: any) => property.user.username == this.user.username
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
