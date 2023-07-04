import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';
import { SavedService } from 'src/app/services/saved.service';
import Swal from 'sweetalert2';
import * as moment from 'moment'; // Import Moment.js library


@Component({
  selector: 'app-recent-card',
  templateUrl: './recent-card.component.html',
  styleUrls: ['./recent-card.component.css'],
})
export class RecentCardComponent {
  isLoggedIn = false;
  @Input() id: any;
  @Input() user: any;
  @Input() username: any;
  userIdentity: string | undefined;
  properties: any[] = [];
  constructor(
    private _property: PropertyService,
    private _save: SavedService,
    private login: LoginService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    if (this.isLoggedIn) {
      this.userIdentity = this.login.getUserId();
      this.user = this.login.getUser();
    }

    this.getRecentProperty();
  }

  getRecentProperty() {
    this._property.getRecentProperty().subscribe(
      (data: any) => {
        console.log(data);
        this.properties = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatUpdatedAt(updatedAt: string): string {
    // Calculate the time difference using Moment.js
    const now = moment(); // Current time
    const updated = moment(updatedAt); // Updated time
    const diffInDays = now.diff(updated, 'days'); // Calculate the difference in days

    // Format the result based on the difference in days
    if (diffInDays === 0) {
      return 'created today';
    } else if (diffInDays === 1) {
      return 'created 1 day ago';
    } else {
      return `created ${diffInDays} days ago`;
    }
  }
}
