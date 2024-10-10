import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioListComponent } from './veterinario-list.component';

describe('VeterinarioListComponent', () => {
  let component: VeterinarioListComponent;
  let fixture: ComponentFixture<VeterinarioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioListComponent]
    });
    fixture = TestBed.createComponent(VeterinarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
