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
  @Input() id: any;
  @Input() user: any;
  @Input() username: any;
  @Input() propertyType!: string;
  p: any;
  agentProperties: any;
  // properties = [
  //   {
  //     pId: '',
  //     aArea: '',
  //     aCity: '',
  //     aLandmark: '',
  //     aPincode: '',
  //     aState: '',
  //     gardens: '',
  //     gym: '',
  //     hospitals: '',
  //     lift: '',
  //     market_area: '',
  //     pAgeOfConstruction: '',
  //     pArea: '',
  //     pBHK: '',
  //     pBalcony: '',
  //     pBathroom: '',
  //     pBedroom: '',
  //     pDescription: '',
  //     pFacing: '',
  //     pFurnishedStatus: '',
  //     pName: '',
  //     pOfferType: '',
  //     pPhoto: '',
  //     pPossesionStatus: '',
  //     pPrice: '',
  //     pPropertyType: '',
  //     pRoomFloor: '',
  //     pTotalFloor: '',
  //     parkingArea: '',
  //     playground: '',
  //     powerBackup: '',
  //     schools: '',
  //     security: '',
  //     shoppingMall: '',
  //     waterSupply: '',
  //     soldOut: '',
  //     active: '',
  //     likes: '',
  //     user: {
  //       uid: '',
  //       username: '',
  //       phonenumber: '',
  //     },
  //   },
  // ];
  properties: any[] = [];
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
    
    this.getLikesProperty();
    if (this.propertyType != null) {
      this.getPropertyType();
    } else {
      this.getProperties();
    }
  }

  getUserId() {
    this.isLoggedIn = this.login.isLoggedIn();
    this.login.loginStatusSubject.asObservable().subscribe((data: any) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.id = this.user ? this.user.uId : null; // Assign null if user is null
      this.username = this.user ? this.user.username : null; // Assign null if user is null
    });
    //this.id = this.user.uId;
    console.log(this.id);
    // this.username = this.user.username;
    console.log(this.username);
  }
  getProperties() {
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        this.agentProperties = data.filter(
          (property: any) => property.user.username == this.username
        );
        console.log('All Properties : ', this.properties);
        console.log('Agent Properties : ', this.agentProperties);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getPropertyType() {
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data.filter(
          (property: any) => property.pPropertyType == this.propertyType
        );
        console.log(this.properties)
      }
    )
  }

  getLikesProperty() {
    console.log('getLikesProperty() called');
    // this._save.likesProperty().subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     data.forEach((item: any) => {
    //       const propertyId = item.p_id;
    //       const likesCount = item.likes;

    //       const properties = this.properties.filter(
    //         (p: any) => p.pId === propertyId
    //       );

    //       console.log('Property ID:', propertyId);
    //       console.log('Likes Count:', likesCount);
    //       console.log('Found Property:', properties);

    //       if (properties) {
    //         properties.likes = likesCount;
    //       }
    //     });
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
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
  addToSaved(p: any) {
    console.log(p);

    if (!this.isLoggedIn) {
      // Handle the scenario when the user is not logged in
      Swal.fire('Error', 'Please log in to add the property', 'error');
      return;
    }

    this.propertySaved.property.pId = p;
    this.propertySaved.user.uId = this.id;
    console.log(this.propertySaved);
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
