import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaWelcomeComponent } from './sa-welcome.component';

describe('SaWelcomeComponent', () => {
  let component: SaWelcomeComponent;
  let fixture: ComponentFixture<SaWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaWelcomeComponent]
    });
    fixture = TestBed.createComponent(SaWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
