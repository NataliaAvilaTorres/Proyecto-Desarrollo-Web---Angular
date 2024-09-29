import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioPanelComponent } from './veterinario-panel.component';

describe('VeterinarioPanelComponent', () => {
  let component: VeterinarioPanelComponent;
  let fixture: ComponentFixture<VeterinarioPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioPanelComponent]
    });
    fixture = TestBed.createComponent(VeterinarioPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
