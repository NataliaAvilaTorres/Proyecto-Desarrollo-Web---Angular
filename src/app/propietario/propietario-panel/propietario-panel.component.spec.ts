import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioPanelComponent } from './propietario-panel.component';

describe('PropietarioPanelComponent', () => {
  let component: PropietarioPanelComponent;
  let fixture: ComponentFixture<PropietarioPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioPanelComponent]
    });
    fixture = TestBed.createComponent(PropietarioPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
