import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckHomeComponent } from './truck-home.component';

describe('TruckHomeComponent', () => {
  let component: TruckHomeComponent;
  let fixture: ComponentFixture<TruckHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
