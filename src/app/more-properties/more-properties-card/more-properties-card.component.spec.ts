import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePropertiesCardComponent } from './more-properties-card.component';

describe('MorePropertiesCardComponent', () => {
  let component: MorePropertiesCardComponent;
  let fixture: ComponentFixture<MorePropertiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MorePropertiesCardComponent]
    });
    fixture = TestBed.createComponent(MorePropertiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
