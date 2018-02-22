import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckClientComponent } from './truck-client.component';

describe('TruckClientComponent', () => {
  let component: TruckClientComponent;
  let fixture: ComponentFixture<TruckClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
