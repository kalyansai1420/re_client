import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent {
  isLoggedIn = false;
  @Input() user: any;
  @Input() id: any;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private property: PropertyService,
    private _snack: MatSnackBar,
    private login: LoginService
  ) {
    this.form = formBuilder.group({
      pName: new FormControl(''),
      pPhoto: new FormControl(''),
      aArea: [''],
      aLandmark: [''],
      aCity: [''],
      aState: [''],
      aPincode: [''],
      pPrice: new FormControl(''),
      pOfferType: new FormControl(''),
      pPropertyType: new FormControl(''),
      pPossesionStatus: new FormControl(''),
      pFurnishedStatus: new FormControl(''),
      pFacing: new FormControl(''),
      pAgeOfConstruction: new FormControl(''),
      pBHK: new FormControl(''),
      pBedroom: new FormControl(''),
      pBathroom: new FormControl(''),
      pBalcony: new FormControl(''),
      pTotalFloor: new FormControl(''),
      pRoomFloor: new FormControl(''),
      pArea: new FormControl(''),
      pDescription: new FormControl(''),
      lift: new FormControl(false),
      security: new FormControl(false),
      playground: new FormControl(false),
      gardens: new FormControl(false),
      waterSupply: new FormControl(false),
      powerBackup: new FormControl(false),
      parkingArea: new FormControl(false),
      gym: new FormControl(false),
      shoppingMall: new FormControl(false),
      hospitals: new FormControl(false),
      schools: new FormControl(false),
      marketArea: new FormControl(false),
    });
  }

  ngOnInit(): void {
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
    console.log(this.id);
  }

  addProperty() {
    const propertyData = {
      pName: this.form.get('pName')?.value,
      pPhoto: this.form.get('pPhoto')?.value,
      aArea: this.form.get('aArea')?.value,
      aLandmark: this.form.get('aLandmark')?.value,
      aCity: this.form.get('aCity')?.value,
      aState: this.form.get('aState')?.value,
      aPincode: this.form.get('aPincode')?.value,
      pPrice: this.form.get('pPrice')?.value,
      pOfferType: this.form.get('pOfferType')?.value,
      pPropertyType: this.form.get('pPropertyType')?.value,
      pPossesionStatus: this.form.get('pPossesionStatus')?.value,
      pFurnishedStatus: this.form.get('pFurnishedStatus')?.value,
      pFacing: this.form.get('pFacing')?.value,
      pAgeOfConstruction: this.form.get('pAgeOfConstruction')?.value,
      pBHK: this.form.get('pBHK')?.value,
      pBedroom: this.form.get('pBedroom')?.value,
      pBathroom: this.form.get('pBathroom')?.value,
      pBalcony: this.form.get('pBalcony')?.value,
      pTotalFloor: this.form.get('pTotalFloor')?.value,
      pRoomFloor: this.form.get('pRoomFloor')?.value,
      pArea: this.form.get('pArea')?.value,
      pDescription: this.form.get('pDescription')?.value,
      lift: this.form.get('lift')?.value,
      security: this.form.get('security')?.value,
      playground: this.form.get('playground')?.value,
      gardens: this.form.get('gardens')?.value,
      waterSupply: this.form.get('waterSupply')?.value,
      powerBackup: this.form.get('powerBackup')?.value,
      parkingArea: this.form.get('parkingArea')?.value,
      gym: this.form.get('gym')?.value,
      shoppingMall: this.form.get('shoppingMall')?.value,
      hospitals: this.form.get('hospitals')?.value,
      schools: this.form.get('schools')?.value,
      marketArea: this.form.get('marketArea')?.value,
      user: {
        uId: this.user.uId,
      },
    };

    this.property.addProperty(propertyData).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Property is added', 'success');
        console.log(data);
      },
      (error) => {
        Swal.fire('Error!! ', 'Error while adding property', 'error');
        console.log(error);
      }
    );
  }
}

// import { Component, Input } from '@angular/core';
// import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { PropertyService } from 'src/app/services/property.service';
// import Swal from 'sweetalert2';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { LoginService } from 'src/app/services/login.service';

// @Component({
//   selector: 'app-add-property',
//   templateUrl: './add-property.component.html',
//   styleUrls: ['./add-property.component.css'],
// })
// export class AddPropertyComponent {
//   isLoggedIn = false;
//   @Input() user: any;
//   @Input() id: any;
//   form: FormGroup<any>;

//   constructor(
//     private formBuilder: FormBuilder,
//     private property: PropertyService,
//     private _snack: MatSnackBar,
//     private login: LoginService
//   ) {
//     this.form = formBuilder.group({
//       pName: new FormControl('', []), // Update the default value to an empty string
//       pPhoto: new FormControl('', []), // Update the default value to an empty string
//       pAddress: new FormControl('', []), // Update the default value to an empty string
//       aLandmark: new FormControl('', []), // Update the default value to an empty string
//       aCity: new FormControl('', []), // Update the default value to an empty string
//       aState: new FormControl('', []), // Update the default value to an empty string
//       aPincode: new FormControl('', []), // Update the default value to an empty string
//       pPrice: new FormControl('', []), // Update the default value to an empty string
//       pOfferType: new FormControl('', []), // Update the default value to an empty string
//       pPropertyType: new FormControl('', []), // Update the default value to an empty string
//       pPropertyStatus: new FormControl('', []), // Update the default value to an empty string
//       pFurnishedStatus: new FormControl('', []), // Update the default value to an empty string
//       pFacing: new FormControl('', []), // Update the default value to an empty string
//       pAgeOfConstruction: new FormControl('', []), // Update the default value to an empty string
//       pBHK: new FormControl('', []), // Update the default value to an empty string
//       pBedroom: new FormControl('', []), // Update the default value to an empty string
//       pBathroom: new FormControl('', []), // Update the default value to an empty string
//       pBalcony: new FormControl('', []), // Update the default value to an empty string
//       pTotalFloor: new FormControl('', []), // Update the default value to an empty string
//       pRoomFloor: new FormControl('', []), // Update the default value to an empty string
//       pCarpetArea: new FormControl('', []), // Update the default value to an empty string
//       pDescription: new FormControl('', []), // Update the default value to an empty string
//       lift: new FormControl(false, []), // Update the default value to false
//       security: new FormControl(false, []), // Update the default value to false
//       playground: new FormControl(false, []), // Update the default value to false
//       garden: new FormControl(false, []), // Update the default value to false
//       waterSupply: new FormControl(false, []), // Update the default value to false
//       powerSupply: new FormControl(false, []), // Update the default value to false
//       parkingArea: new FormControl(false, []), // Update the default value to false
//       gym: new FormControl(false, []), // Update the default value to false
//       shoppingMall: new FormControl(false, []), // Update the default value to false
//       hospital: new FormControl(false, []), // Update the default value to false
//       school: new FormControl(false, []), // Update the default value to false
//       marketArea: new FormControl(false, []), // Update the default value to false
//     });
//   }

//   propertyData: any = {
//     pName: '1199',
//     pPhoto: '',
//     pAddress: '',
//     aLandmark: '',
//     aCity: '',
//     aState: '',
//     aPincode: '',
//     pPrice: '',
//     pOfferType: '',
//     pPropertyType: '',
//     pPropertyStatus: '',
//     pFurnishedStatus: '',
//     pFacing: '',
//     pAgeOfConstruction: '',
//     pBHK: '',
//     pBedroom: '',
//     pBathroom: '',
//     pBalcony: '',
//     pTotalFloor: '',
//     pRoomFloor: '',
//     pCarpetArea: '',
//     pDescription: '',
//     lift: '',
//     security: '',
//     playground: '',
//     garden: '',
//     waterSupply: '',
//     powerSupply: '',
//     parkingArea: '',
//     gym: '',
//     shoppingMall: '',
//     hospital: '',
//     school: '',
//     marketArea: '',
//     // user: {
//     //   uId: '',
//     // }
//   };

//   ngOnInit(): void {
//     this.getUserId();
//   }

//   getUserId() {
//     this.isLoggedIn = this.login.isLoggedIn();
//     this.user = this.login.getUser();
//     this.login.loginStatusSubject.asObservable().subscribe((data: any) => {
//       this.isLoggedIn = this.login.isLoggedIn();
//       this.user = this.login.getUser();
//     });
//     this.id = this.user.uId;
//     console.log(this.id);
//   }

//   addProperty() {
//     this.property.addProperty(this.propertyData).subscribe(
//       (data: any) => {
//         Swal.fire('Success', 'Property is added', 'success');
//         this.propertyData = {
//           pName: this.form.get('pName')?.value,
//           pPhoto: this.form.get('pPhoto')?.value,
//           pAddress: this.form.get('pAddress')?.value,
//           aLandmark: this.form.get('aLandmark')?.value,
//           aCity: this.form.get('aCity')?.value,
//           aState: this.form.get('aState')?.value,
//           aPincode: this.form.get('aPincode')?.value,
//           pPrice: this.form.get('pPrice')?.value,
//           pOfferType: this.form.get('pOfferType')?.value,
//           pPropertyType: this.form.get('pPropertyType')?.value,
//           pPropertyStatus: this.form.get('pPropertyStatus')?.value,
//           pFurnishedStatus: this.form.get('pFurnishedStatus')?.value,
//           pFacing: this.form.get('pFacing')?.value,
//           pAgeOfConstruction: this.form.get('pAgeOfConstruction')?.value,
//           pBHK: this.form.get('pBHK')?.value,
//           pBedroom: this.form.get('pBedroom')?.value,
//           pBathroom: this.form.get('pBathroom')?.value,
//           pBalcony: this.form.get('pBalcony')?.value,
//           pTotalFloor: this.form.get('pTotalFloor')?.value,
//           pRoomFloor: this.form.get('pRoomFloor')?.value,
//           pCarpetArea: this.form.get('pCarpetArea')?.value,
//           pDescription: this.form.get('pDescription')?.value,
//           lift: this.form.get('lift')?.value,
//           security: this.form.get('security')?.value,
//           playground: this.form.get('playground')?.value,
//           garden: this.form.get('garden')?.value,
//           waterSupply: this.form.get('waterSupply')?.value,
//           powerSupply: this.form.get('powerSupply')?.value,
//           parkingArea: this.form.get('parkingArea')?.value,
//           gym: this.form.get('gym')?.value,
//           shoppingMall: this.form.get('shoppingMall')?.value,
//           hospital: this.form.get('hospital')?.value,
//           school: this.form.get('school')?.value,
//           marketArea: this.form.get('marketArea')?.value,
//           user: {
//             uId: this.user.uId,
//           },
//         };
//         console.log(data);
//       },
//       (error) => {
//         Swal.fire('Error!! ', 'Error while adding property', 'error');
//         console.log(error);
//       }
//     );
//   }
// }
