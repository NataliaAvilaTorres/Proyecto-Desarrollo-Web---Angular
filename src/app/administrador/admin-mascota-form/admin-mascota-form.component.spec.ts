import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMascotaFormComponent } from './admin-mascota-form.component';

describe('AdminMascotaFormComponent', () => {
  let component: AdminMascotaFormComponent;
  let fixture: ComponentFixture<AdminMascotaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMascotaFormComponent]
    });
    fixture = TestBed.createComponent(AdminMascotaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
