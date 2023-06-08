import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaUpdatePropertyComponent } from './sa-update-property.component';

describe('SaUpdatePropertyComponent', () => {
  let component: SaUpdatePropertyComponent;
  let fixture: ComponentFixture<SaUpdatePropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaUpdatePropertyComponent]
    });
    fixture = TestBed.createComponent(SaUpdatePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
