import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOutVoucherListComponent } from './stock-out-voucher-list.component';

describe('StockOutVoucherListComponent', () => {
  let component: StockOutVoucherListComponent;
  let fixture: ComponentFixture<StockOutVoucherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOutVoucherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOutVoucherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
