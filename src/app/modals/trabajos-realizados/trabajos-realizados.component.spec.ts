import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajosRealizadosComponent } from './trabajos-realizados.component';

describe('TrabajosRealizadosComponent', () => {
  let component: TrabajosRealizadosComponent;
  let fixture: ComponentFixture<TrabajosRealizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajosRealizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
