import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';
import { SavedService } from 'src/app/services/saved.service';
import Swal from 'sweetalert2';

interface Property {
  pId: number;
  aArea: '';
  aCity: '';
  aLandmark: '';
  aPincode: '';
  aState: '';
  gardens: '';
  gym: '';
  hospitals: '';
  images: { id: number; imageUrl: string }[];
  lift: '';
  market_area: '';
  pAgeOfConstruction: '';
  pArea: '';
  pBHK: '';
  pBalcony: '';
  pBathroom: '';
  pBedroom: '';
  pDescription: '';
  pFacing: '';
  pFurnishedStatus: '';
  pName: '';
  pOfferType: '';
  pPhoto: '';
  pPossesionStatus: '';
  pPrice: '';
  pPropertyType: '';
  pRoomFloor: '';
  pTotalFloor: '';
  parkingArea: '';
  playground: '';
  powerBackup: '';
  schools: '';
  security: '';
  shoppingMall: '';
  waterSupply: '';
  soldOut: '';
  active: boolean;
  user: {
    uid: '';
    username: '';
    phonenumber: '';
  };
  likes: number;
  updatedAt:string;
}
@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  displayCount: number = 4; // Initial value of cards to display

  // Your other component code

  showMoreCards() {
    this.displayCount = Math.min(this.displayCount + 4, this.properties.length);
  }
  isLoggedIn = false;
  @Input() id: any;
  @Input() user: any;
  @Input() username: any;
  @Input() propertyType!: string;
  @Input() propertyCity!: string;
  p: any;
  userIdentity: string | undefined;
  userSavedProperty: any[] = [];
  properties: Property[] = [];
  propertySaved = {
    property: {
      pId: '',
    },
    user: {
      uId: '',
    },
  };
  typeProperties: any[] = [];
  cityProperties: any[] = [];

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
      this.getSavedProperty();
    }
    this.getProperties();
    if (this.propertyType != null) {
      this.getPropertyType();
    } else if (this.propertyCity != null) {
      this.getPropertyCity();
    }
  }

  getProperties() {
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        this.getLikesProperty();
        console.log('All Properties : ', this.properties);
        // Sort properties by updatedAt in descending order
        this.properties.sort((a: Property, b: Property) => {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  getPropertyType() {
    console.log("PropertyType",this.propertyType);
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        this.properties = this.properties.filter(
          (property: any) => property.pPropertyType == this.propertyType
        );
        console.log('All Properties : ', this.properties);
      },
      (error) => {
        console.log(error);
      }
    );

  }
  getPropertyCity() {
    console.log(this.propertyCity);
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        this.properties = this.properties.filter(
          (property: any) => property.aCity == this.propertyCity
        );
        console.log('All Properties : ', this.properties);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getSavedProperty() {
    if (this.userIdentity) {
      console.log('Id', this.userIdentity);
      this._save.getSavedProperty(this.userIdentity).subscribe(
        (data: any) => {
          this.userSavedProperty = data;
          console.log(this.userSavedProperty);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  isPropertySaved(propertyId: number): boolean {
    return this.userSavedProperty.some(
      (saved: any) => saved.property?.pId === propertyId
    );
  }

  getLikesProperty() {
    this._save.likesProperty().subscribe(
      (data: any) => {
        console.log(this.properties);
        data.forEach((item: any) => {
          const propertyId = item.p_id;
          const likesCount = item.likes;
          const property = this.properties.find(
            (p: Property) => p.pId === propertyId
          );
          console.log('Property ID:', propertyId);
          console.log('Likes Count:', likesCount);
          console.log('Found Property:', property);
          if (property) {
            property.likes = likesCount;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
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
        this._property
          .deleteProperty(pId)
          .toPromise()
          .then((data: any) => {
            console.log('Property deleted:', data);
            this.properties = this.properties.filter(
              (property: any) => property.pId != pId
            );
            Swal.fire('success', 'Property deleted successfully', 'success');
          })
          .catch((error) => {
            Swal.fire('error', 'Error deleting property', 'error');
            console.log('Error deleting property:', error);
          });
      }
    });
  }

  addToSaved(pId: any) {
    if (!this.isLoggedIn) {
      Swal.fire('Error', 'Please log in to add the property', 'error');
      return;
    }
    const savedProperty = this.userSavedProperty.find(
      (saved: any) => saved.property.pId === pId
    );

    if (savedProperty) {
      console.log(savedProperty.saveId);
      console.log(savedProperty.property.pId);

      this._save.removePropertyfromSaved(savedProperty.saveId).subscribe(
        (data: any) => {
          this.userSavedProperty = this.userSavedProperty.filter(
            (saved: any) => saved.property.pId !== pId
          );
          console.log(data);
          console.log('Property removed from saved list');
        },
        (error) => {
          console.log('Error removing property from saved list:', error);
        }
      );
    } else {
      if (this.userIdentity) {
        this.propertySaved.property.pId = pId;
        this.propertySaved.user = {
          uId: this.userIdentity.toString(),
        };
        console.log(this.propertySaved);
        this._save.addPropertytoSaved(this.propertySaved).subscribe(
          (data: any) => {
            Swal.fire('Success', 'Property got added', 'success');
            this.getProperties();
          },
          (error) => {
            console.error(error);
            Swal.fire('Error', 'Server Error', 'error');
          }
        );
      }
    }
  }
}
