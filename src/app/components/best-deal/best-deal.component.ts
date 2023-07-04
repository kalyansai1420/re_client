import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-best-deal',
  templateUrl: './best-deal.component.html',
  styleUrls: ['./best-deal.component.css']
})
export class BestDealComponent  {
  @Input() propertyType!: string;
  @Input() propertyCity!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
