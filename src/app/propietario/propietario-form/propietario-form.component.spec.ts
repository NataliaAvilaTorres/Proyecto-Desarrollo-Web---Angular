import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioFormComponent } from './propietario-form.component';

describe('PropietarioFormComponent', () => {
  let component: PropietarioFormComponent;
  let fixture: ComponentFixture<PropietarioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioFormComponent]
    });
    fixture = TestBed.createComponent(PropietarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
