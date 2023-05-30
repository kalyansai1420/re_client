import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-dis-card',
  templateUrl: './dis-card.component.html',
  styleUrls: ['./dis-card.component.css'],
})
export class DisCardComponent implements OnInit {
  countByCity: any[] = [];

  cityImageMapping: any = {
    Hyderabad: 'https://in.bmscdn.com/m6/images/common-modules/regions/hyd.png',
    Chennai: 'https://in.bmscdn.com/m6/images/common-modules/regions/chen.png',
    Mumbai: 'https://in.bmscdn.com/m6/images/common-modules/regions/mumbai.png',
    Delhi: 'https://in.bmscdn.com/m6/images/common-modules/regions/ncr.png',
    Bangalore:
      'https://in.bmscdn.com/m6/images/common-modules/regions/bang.png',
  };

  constructor(private propertyService: PropertyService) {}

  getImageUrl(city: string): string {
    return (
      this.cityImageMapping[city] || '../../../../assets/icons/city.png'
    );
  }

  ngOnInit(): void {
    this.propertyService.countPropertiesByCity().subscribe(
      (data: any) => {
        this.countByCity = data;
        console.log(this.countByCity);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
