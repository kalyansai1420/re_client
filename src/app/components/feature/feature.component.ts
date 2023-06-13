import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
})
export class FeatureComponent {
  @Input() propertyType!: string;
  @Input() propertyCity!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
