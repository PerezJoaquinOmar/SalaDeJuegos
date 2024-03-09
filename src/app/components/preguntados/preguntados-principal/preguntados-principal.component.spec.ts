import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntadosPrincipalComponent } from './preguntados-principal.component';

describe('PreguntadosPrincipalComponent', () => {
  let component: PreguntadosPrincipalComponent;
  let fixture: ComponentFixture<PreguntadosPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntadosPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntadosPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
