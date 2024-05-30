import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyorderListComponent } from './buyorder-list.component';

describe('BuyorderListComponent', () => {
  let component: BuyorderListComponent;
  let fixture: ComponentFixture<BuyorderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyorderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyorderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
