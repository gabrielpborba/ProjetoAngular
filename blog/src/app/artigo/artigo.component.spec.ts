import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigoComponent } from './artigo.component';

describe('ArtigoComponent', () => {
  let component: ArtigoComponent;
  let fixture: ComponentFixture<ArtigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
