import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInVoucherEditComponent } from './stock-in-voucher-edit.component';

describe('StockInVoucherEditComponent', () => {
  let component: StockInVoucherEditComponent;
  let fixture: ComponentFixture<StockInVoucherEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockInVoucherEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInVoucherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
