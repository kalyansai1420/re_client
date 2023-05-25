import { Component } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {

  property = [
    {
      pid: '',
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
        uid:'',
      }
    }
  ]


  constructor(private _property: PropertyService) { }


  ngOnInit():void {
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


}
