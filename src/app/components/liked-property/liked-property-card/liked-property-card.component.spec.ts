import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedPropertyCardComponent } from './liked-property-card.component';

describe('LikedPropertyCardComponent', () => {
  let component: LikedPropertyCardComponent;
  let fixture: ComponentFixture<LikedPropertyCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedPropertyCardComponent]
    });
    fixture = TestBed.createComponent(LikedPropertyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
