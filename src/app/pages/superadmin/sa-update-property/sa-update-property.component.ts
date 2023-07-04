import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { Subscription } from 'rxjs'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-sa-update-property',
  templateUrl: './sa-update-property.component.html',
  styleUrls: ['./sa-update-property.component.css'],
})
export class SaUpdatePropertyComponent {
  isLoggedIn = false;
  @Input() user: any;
  @Input() id: any;
  @Input() username: any;
  private routeSub: Subscription | undefined;
  constructor(
    private _route: ActivatedRoute,
    private _property: PropertyService,
    private _router: Router,
    private login: LoginService,
    private formBuilder: FormBuilder
  ) {}

  pId = 0;
  property: any;
  // myForm: FormGroup;
  ngOnInit(): void {
    this.routeSub = this._route.params.subscribe((params) => {
      this.pId = params['pId'];
      console.log(this.pId);
    });

    this._property.getProperty(this.pId).subscribe(
      (data: any) => {
        this.property = data;
        console.log(this.property);
      },
      (error) => {
        console.log(error);
      }
    );
     this.getUserId();
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
    console.log(this.username);
    console.log(this.id);
  }

  public updateProperty() {
    const requestData = {
      aArea: this.property.aArea,
      aCity: this.property.aCity,
      aLandmark: this.property.aLandmark,
      aPincode: this.property.aPincode,
      aState: this.property.aState,
      active: this.property.active,
      createdAt: this.property.createdAt,
      gardens: this.property.gardens,
      gym: this.property.gym,
      hospitals: this.property.hospitals,
      lift: this.property.lift,
      marketArea: this.property.marketArea,
      pAgeOfConstruction: this.property.pAgeOfConstruction,
      pArea: this.property.pArea,
      pBHK: this.property.pBHK,
      pBalcony: this.property.pBalcony,
      pBathroom: this.property.pBathroom,
      pBedroom: this.property.pBedroom,
      pDescription: this.property.pDescription,
      pFacing: this.property.pFacing,
      pFurnishedStatus: this.property.pFurnishedStatus,
      pId: this.property.pId,
      pName: this.property.pName,
      pOfferType: this.property.pOfferType,
      pPhoto: this.property.pPhoto,
      pPossesionStatus: this.property.pPossesionStatus,
      pPrice: this.property.pPrice,
      pPropertyType: this.property.pPropertyType,
      pRoomFloor: this.property.pRoomFloor,
      pTotalFloor: this.property.pTotalFloor,
      parkingArea: this.property.parkingArea,
      playground: this.property.playground,
      powerBackup: this.property.powerBackup,
      schools: this.property.schools,
      security: this.property.security,
      shoppingMall: this.property.shoppingMall,
      soldOut: this.property.soldOut,
      updatedAt: this.property.updatedAt,
      user: {
        uId: this.property.user.uId,
      },
    };
    console.log(requestData);
    console.log(this.property);
    this._property.updateProperty(requestData).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Property updated', 'success').then(() => {
          //this._router.navigate(['superadmin/properties']);
        });
      },
      (error: any) => {
        Swal.fire('Error', 'Property not updated', 'error');
        console.log(error);
      }
    );
  }
  goBack(): void {
    this._router.navigate(['/superadmin']);
  }
}
