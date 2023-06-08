import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaSidebarComponent } from './sa-sidebar.component';

describe('SaSidebarComponent', () => {
  let component: SaSidebarComponent;
  let fixture: ComponentFixture<SaSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaSidebarComponent]
    });
    fixture = TestBed.createComponent(SaSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
