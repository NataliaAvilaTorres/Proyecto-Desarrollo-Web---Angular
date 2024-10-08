import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorPanelComponent } from './administrador-panel.component';

describe('AdministradorPanelComponent', () => {
  let component: AdministradorPanelComponent;
  let fixture: ComponentFixture<AdministradorPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministradorPanelComponent]
    });
    fixture = TestBed.createComponent(AdministradorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
