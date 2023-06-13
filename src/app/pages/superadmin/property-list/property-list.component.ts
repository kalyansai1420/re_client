import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent {
  properties: any;
  property: any;
  agentProperties: any;
  display: number = 2;

  isLoggedIn = false;
  @Input() user: any;
  @Input() userRole: any;
  @Input() userIdentity: any;

  constructor(
    private _property: PropertyService,
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
    if (this.userRole == 'Admin') {
      this.getAgentProperties();
    } else {
      this.getProperties();
    }
  }

  getProperties() {
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        console.log('All Properties : ', this.properties);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAgentProperties() {
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        this.agentProperties = data.filter(
          (property: any) => property.user.username == this.user.username
        );
        console.log('all properties', this.properties);
        console.log('agent properties', this.agentProperties);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeDisplay(mode: number): void {
    this.display = mode;
  }

  togglePropertyActive(property: any) {
    property.active = !property.active;
    const requestData = {
      aArea: property.aArea,
      aCity: property.aCity,
      aLandmark: property.aLandmark,
      aPincode: property.aPincode,
      aState: property.aState,
      active: property.active,
      createdAt: property.createdAt,
      gardens: property.gardens,
      gym: property.gym,
      hospitals: property.hospitals,
      lift: property.lift,
      marketArea: property.marketArea,
      pAgeOfConstruction: property.pAgeOfConstruction,
      pArea: property.pArea,
      pBHK: property.pBHK,
      pBalcony: property.pBalcony,
      pBathroom: property.pBathroom,
      pBedroom: property.pBedroom,
      pDescription: property.pDescription,
      pFacing: property.pFacing,
      pFurnishedStatus: property.pFurnishedStatus,
      pId: property.pId,
      pName: property.pName,
      pOfferType: property.pOfferType,
      pPhoto: property.pPhoto,
      pPossesionStatus: property.pPossesionStatus,
      pPrice: property.pPrice,
      pPropertyType: property.pPropertyType,
      pRoomFloor: property.pRoomFloor,
      pTotalFloor: property.pTotalFloor,
      parkingArea: property.parkingArea,
      playground: property.playground,
      powerBackup: property.powerBackup,
      schools: property.schools,
      security: property.security,
      shoppingMall: property.shoppingMall,
      soldOut: property.soldOut,
      updatedAt: property.updatedAt,
      user: {
        uId: property.user.uId,
      },
    };
    Swal.fire({
      icon: 'info',
      title: 'Have you verified ?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._property.updateProperty(requestData).subscribe((data: any) => {
          console.log('Property updated:', data);
        });
      }
    });
  }

  toggleSoldOut(property: any) {
    // Handle the toggle sold out event
    property.soldOut = !property.soldOut;
    const requestData = {
      aArea: property.aArea,
      aCity: property.aCity,
      aLandmark: property.aLandmark,
      aPincode: property.aPincode,
      aState: property.aState,
      active: property.active,
      createdAt: property.createdAt,
      gardens: property.gardens,
      gym: property.gym,
      hospitals: property.hospitals,
      lift: property.lift,
      marketArea: property.marketArea,
      pAgeOfConstruction: property.pAgeOfConstruction,
      pArea: property.pArea,
      pBHK: property.pBHK,
      pBalcony: property.pBalcony,
      pBathroom: property.pBathroom,
      pBedroom: property.pBedroom,
      pDescription: property.pDescription,
      pFacing: property.pFacing,
      pFurnishedStatus: property.pFurnishedStatus,
      pId: property.pId,
      pName: property.pName,
      pOfferType: property.pOfferType,
      pPhoto: property.pPhoto,
      pPossesionStatus: property.pPossesionStatus,
      pPrice: property.pPrice,
      pPropertyType: property.pPropertyType,
      pRoomFloor: property.pRoomFloor,
      pTotalFloor: property.pTotalFloor,
      parkingArea: property.parkingArea,
      playground: property.playground,
      powerBackup: property.powerBackup,
      schools: property.schools,
      security: property.security,
      shoppingMall: property.shoppingMall,
      soldOut: property.soldOut,
      updatedAt: property.updatedAt,
      user: {
        uId: property.user.uId,
      },
    };
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._property.updateProperty(requestData).subscribe((data: any) => {
          console.log('Property updated:', data);
        });
      }
    });
    // Add your logic here
  }
  updateProperty(property: any) {
    console.log('btn-clicked');
    console.log(property.pId);
  }
  deleteProperty(pId: any) {
    console.log(pId);
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        console.log('Deleting property:', pId);
        this._property.deleteProperty(pId).subscribe(
          (data: any) => {
            console.log('Property deleted:', data);
            this.properties = this.properties.filter(
              (property: any) => property.pId != pId
            );
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
}
