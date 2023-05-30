import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';
import { SavedService } from 'src/app/services/saved.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  isLoggedIn = false;
  @Input() user: any;
  @Input() id: any;
  p: any;
  property = [
    {
      pId: '',
      aArea: '',
      aCity: '',
      aLandmark: '',
      aPincode: '',
      aState: '',
      gardens: '',
      gym: '',
      hospitals: '',
      lift: '',
      market_area: '',
      pAgeOfConstruction: '',
      pArea: '',
      pBHK: '',
      pBalcony: '',
      pBathroom: '',
      pBedroom: '',
      pDescription: '',
      pFacing: '',
      pFurnishedStatus: '',
      pName: '',
      pOfferType: '',
      pPhoto: '',
      pPossesionStatus: '',
      pPrice: '',
      pPropertyType: '',
      pRoomFloor: '',
      pTotalFloor: '',
      parkingArea: '',
      playground: '',
      powerBackup: '',
      schools: '',
      security: '',
      shoppingMall: '',
      waterSupply: '',
      user: {
        uid: '',
      },
    },
  ];
  propertySaved = {
    property: {
      pId: '',
    },
    user: {
      uId: '',
    },
  };

  constructor(
    private _property: PropertyService,
    private _save: SavedService,
    private login: LoginService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserId();
    console.log(this.getUserId());
    this._property.properties().subscribe(
      (data: any) => {
        this.property = data;
        console.log(data);
        console.log(this.property);
        console.log(this.property);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getUserId() {
    this.isLoggedIn = this.login.isLoggedIn();
    if (!this.isLoggedIn) {
      return null;
    } else {
      this.user = this.login.getUser();
      this.login.loginStatusSubject.asObservable().subscribe((data: any) => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      });
      return this.user ? this.user.uId : null; // Add null check for user object
    }
  }



  addToSaved(p: any) {
    console.log(p);

    if (!this.isLoggedIn) {
      // Handle the scenario when the user is not logged in
      Swal.fire('Error', 'Please log in to add the property', 'error');
      return;
    }

    this.propertySaved.property.pId = p;
    this.propertySaved.user.uId = this.getUserId();
    this._save.addPropertytoSaved(this.propertySaved).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Property got added', 'success');
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'Server Error', 'error');
      }
    );
  }
}
