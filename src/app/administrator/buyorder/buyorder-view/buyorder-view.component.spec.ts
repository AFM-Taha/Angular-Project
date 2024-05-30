import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyorderViewComponent } from './buyorder-view.component';

describe('BuyorderViewComponent', () => {
  let component: BuyorderViewComponent;
  let fixture: ComponentFixture<BuyorderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyorderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyorderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
