import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaPrincipalComponent } from './encuesta-principal.component';

describe('EncuestaPrincipalComponent', () => {
  let component: EncuestaPrincipalComponent;
  let fixture: ComponentFixture<EncuestaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
