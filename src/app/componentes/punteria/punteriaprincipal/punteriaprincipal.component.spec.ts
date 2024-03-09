import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunteriaprincipalComponent } from './punteriaprincipal.component';

describe('PunteriaprincipalComponent', () => {
  let component: PunteriaprincipalComponent;
  let fixture: ComponentFixture<PunteriaprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunteriaprincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunteriaprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
