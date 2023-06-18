import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';
import { SavedService } from 'src/app/services/saved.service';
import Swal from 'sweetalert2';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


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
  @Input() propertyCity!: string;
  @Input() propertyLikes!: string;
  p: any;
  userIdentity: string | undefined;
  userSavedProperty: any[] = [];
  // properties: Property[] = [];
  @Input() properties: any[] = [];
  Likedproperty: any[] = [];
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
  likespropertiesdetails: any[] = [];

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
    console.log('hello world', this.propertyLikes);
    this.getProperties();
    if (this.propertyType != null) {
      this.getPropertyType();
    } else if (this.propertyCity != null) {
      this.getPropertyCity();
    }
    if (this.propertyLikes != null) {
      this.getLikesPropertyDetails();
    }
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
  getPropertyType() {
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

    console.log(this.properties);
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

    console.log(this.properties);
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
        this.properties = data;
        console.log('likes property details', this.properties);
      },
      (error) => {
        console.error(error);
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
  sendEmailtoAgent(customerName: string, propertyName: string,customerNumber:string,customerEmail:string,agentEmail:string) {
    const templateParams = {
      customerName: customerName,
      propertyName: propertyName,
      customerNumber: customerNumber,
      customerEmail: customerEmail,
      agentEmail: agentEmail,
    };

    emailjs
      .send(
        'agent_side',
        'agent_template',
        templateParams,
        'user_0ggBS8Oxule52AEBUsjUV'
      )
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('Email sent', response);
        },
        (error) => {
          console.error('Email error', error);
        }
      );
  }
  sendEmailtoCustomer(email: string, propertyName: string) {
    const templateParams = {
      email: email,
      propertyName: propertyName,
    };

    emailjs
      .send(
        'customer_side',
        'customer_template',
        templateParams,
        'user_0ggBS8Oxule52AEBUsjUV'
      )
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('Email sent', response);
        },
        (error) => {
          console.error('Email error', error);
        }
      );
  }

  addToSaved(p:any) {
    if (!this.isLoggedIn) {
      Swal.fire('Error', 'Please log in to add the property', 'error');
      return;
    }
    const savedProperty = this.userSavedProperty.find(
      (saved: any) => saved.property.pId === p.pId
    );

    if (savedProperty) {
      console.log(savedProperty.saveId);
      console.log(savedProperty.property.pId);

      this._save.removePropertyfromSaved(savedProperty.saveId).subscribe(
        (data: any) => {
          this.userSavedProperty = this.userSavedProperty.filter(
            (saved: any) => saved.property.pId !== p.pId
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
        this.propertySaved.property.pId = p.pId;
        this.propertySaved.user = {
          uId: this.userIdentity.toString(),
        };
        console.log(this.propertySaved);
        this._save.addPropertytoSaved(this.propertySaved).subscribe(
          (data: any) => {
            Swal.fire('Success', 'Property got added', 'success');
            this.getProperties();
            this.sendEmailtoCustomer(this.user.email, p.pName);
            this.sendEmailtoAgent(this.user.username,p.pName,this.user.phonenumber,this.user.email,p.user.email)
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
