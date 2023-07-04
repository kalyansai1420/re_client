import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';
import { SavedService } from 'src/app/services/saved.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liked-property-card',
  templateUrl: './liked-property-card.component.html',
  styleUrls: ['./liked-property-card.component.css'],
})
export class LikedPropertyCardComponent {
  isLoggedIn = false;
  @Input() id: any;
  @Input() user: any;
  @Input() username: any;
  userIdentity: string | undefined;
  properties: any[] = [];
  userSavedProperty: any[] = [];
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
    this.isLoggedIn = this.login.isLoggedIn();
    if (this.isLoggedIn) {
      this.userIdentity = this.login.getUserId();
      this.user = this.login.getUser();
    }

    this.getLikesPropertyDetails();
  }
  getProperties() {
    this._property.properties().subscribe(
      (data: any) => {
        this.properties = data;
        this.getLikesProperty();
        console.log('All Properties : ', this.properties);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getLikesProperty() {
    this._save.likesProperty().subscribe(
      (data: any) => {
        console.log(data);
        console.log(this.properties);
        data.forEach((item: any) => {
          const propertyId = item.p_id;
          const likesCount = item.likes;
          const Likedproperty = this.properties.find(
            (p: any) => p.pId === propertyId
          );
          console.log('Property ID:', propertyId);
          console.log('Likes Count:', likesCount);
          console.log('Found Property:', Likedproperty);
          if (Likedproperty) {
            Likedproperty.likes = likesCount;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getLikesPropertyDetails() {
    console.log('likes property details');
    this._save.likesPropertyDetails().subscribe(
      (data: any) => {
        console.log('likes property', data);
        this.properties = data;
        console.log('likes property details', this.properties);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isPropertySaved(propertyId: number): boolean {
    return this.userSavedProperty.some(
      (saved: any) => saved.property?.pId === propertyId
    );
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
