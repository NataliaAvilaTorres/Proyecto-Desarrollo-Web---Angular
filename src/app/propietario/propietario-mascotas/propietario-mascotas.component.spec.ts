import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioMascotasComponent } from './propietario-mascotas.component';

describe('PropietarioMascotasComponent', () => {
  let component: PropietarioMascotasComponent;
  let fixture: ComponentFixture<PropietarioMascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioMascotasComponent]
    });
    fixture = TestBed.createComponent(PropietarioMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
