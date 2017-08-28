import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInVoucherListComponent } from './stock-in-voucher-list.component';

describe('StockInVoucherListComponent', () => {
  let component: StockInVoucherListComponent;
  let fixture: ComponentFixture<StockInVoucherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockInVoucherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInVoucherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
