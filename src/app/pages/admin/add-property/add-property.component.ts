import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { v4 as uuidv4 } from 'uuid';
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
      aArea: new FormControl(''),
      aLandmark: new FormControl(''),
      aCity: new FormControl(''),
      aState: new FormControl(''),
      aPincode: new FormControl(''),
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
      images: formBuilder.array([]), // Array for gallery images
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
      images: this.form.get('images')?.value,
      user: {
        uId: this.user.uId,
      },
    };

    if (this.form.valid) {
      console.log(this.form.value);
      this.property.addProperty(propertyData).subscribe(
        (data: any) => {
          Swal.fire('Success', 'Property is added', 'success');
          console.log(data);
          this.form.reset();
        }, (error) => {
          Swal.fire('Error!! ', error.error.message, 'error');
          console.log(error);
          console.log(error.message)
        })
    
    } else {
      Swal.fire('Error', 'Please fill all the required fields', 'error');
    }
  }

  // Getter for the gallery form array
  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  // Add a new gallery image input field
  addGalleryImage() {
    this.images.push(new FormControl(''));
  }

  // Remove a gallery image input field
  removeGalleryImage(index: number) {
    this.images.removeAt(index);
  }
}
