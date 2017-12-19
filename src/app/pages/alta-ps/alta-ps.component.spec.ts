import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPSComponent } from './alta-ps.component';

describe('AltaPSComponent', () => {
  let component: AltaPSComponent;
  let fixture: ComponentFixture<AltaPSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaPSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
