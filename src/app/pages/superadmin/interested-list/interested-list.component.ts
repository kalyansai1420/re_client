import { Component } from '@angular/core';
import { SavedService } from 'src/app/services/saved.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interested-list',
  templateUrl: './interested-list.component.html',
  styleUrls: ['./interested-list.component.css'],
})
export class InterestedListComponent {
  interestedProperties: any[] = [];
  constructor(private _saved: SavedService, private router: Router) {}

  ngOnInit() {
    this.getInterested();
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
  goBack(): void {
    this.router.navigate(['/superadmin']);
  }
}
