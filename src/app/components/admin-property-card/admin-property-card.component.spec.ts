import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropertyCardComponent } from './admin-property-card.component';

describe('AdminPropertyCardComponent', () => {
  let component: AdminPropertyCardComponent;
  let fixture: ComponentFixture<AdminPropertyCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPropertyCardComponent]
    });
    fixture = TestBed.createComponent(AdminPropertyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
