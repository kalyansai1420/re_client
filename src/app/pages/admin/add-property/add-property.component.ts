import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { switchMap, last } from 'rxjs/operators';

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
  images: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private property: PropertyService,
    private _snack: MatSnackBar,
    private login: LoginService,
    private storage: AngularFireStorage
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
    this.images = this.form.get('images') as FormArray;
    this.addGalleryImage();
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

  addProperty(propertyData: any) {
    if (this.form.valid) {
      console.log(this.form.value);
      const downloadURLs = this.images.controls.map(
        (
          value: AbstractControl<any>,
          index: number,
          array: AbstractControl<any>[]
        ) => (value as FormGroup).get('url')?.value
      );
      propertyData.images = downloadURLs;

      this.property.addProperty(propertyData).subscribe(
        (data: any) => {
          Swal.fire('Success', 'Property is added', 'success');
          console.log(data);
          this.form.reset();
        },
        (error) => {
          Swal.fire('Error!! ', error.error.message, 'error');
          console.log(error);
          console.log(error.message);
        }
      );
    } else {
      Swal.fire('Error', 'Please fill all the required fields', 'error');
    }
  }

  addGalleryImage() {
    const imageGroup = this.formBuilder.group({
      url: new FormControl(''),
    });

    this.images.push(imageGroup);
  }

  removeGalleryImage(index: number) {
    this.images.removeAt(index);
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    this.images.at(index).get('url')?.setValue(file);
  }

  uploadImages() {
    const fileInputs = this.images.value;
    const promises: Promise<any>[] = [];
    const imageUrls: string[] = []; // Array to store the image URLs

    fileInputs.forEach((fileInput: any, index: number) => {
      const file = fileInput.url as File;
      const filePath = `property-images/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      promises.push(
        uploadTask
          .snapshotChanges()
          .toPromise()
          .then((snapshot: any) => {
            return snapshot.ref.getDownloadURL().then((url: string) => {
              imageUrls[index] = url; // Store the image URL at the corresponding index
            });
          })
          .catch((error) => {
            // Error handling
            console.error('Error uploading image:', error);
            throw error;
          })
      );
    });

    Promise.all(promises)
      .then((downloadUrls: string[]) => {
        // All images uploaded successfully, URLs are available in the 'downloadUrls' array
        console.log('All images uploaded successfully');
        console.log('Download URLs:', downloadUrls);

        // Update the property data with the download URLs
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
          images: this.images.controls.forEach((control, index) => {
            control.get('url')?.setValue(imageUrls[index]);
          }), // Update with the download URLs
          user: {
            uId: this.user.uId,
          },
        };

        this.addProperty(propertyData); // Call the addProperty function with updated data
      })
      .catch((error) => {
        // Error occurred while uploading images
        console.error('Error uploading images:', error);
        Swal.fire('Error', 'An error occurred while uploading images', 'error');
      });
  }
}
