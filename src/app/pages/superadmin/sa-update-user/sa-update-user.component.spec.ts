import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaUpdateUserComponent } from './sa-update-user.component';

describe('SaUpdateUserComponent', () => {
  let component: SaUpdateUserComponent;
  let fixture: ComponentFixture<SaUpdateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaUpdateUserComponent]
    });
    fixture = TestBed.createComponent(SaUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
