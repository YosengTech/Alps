import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOutVoucherEditComponent } from './stock-out-voucher-edit.component';

describe('StockOutVoucherEditComponent', () => {
  let component: StockOutVoucherEditComponent;
  let fixture: ComponentFixture<StockOutVoucherEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOutVoucherEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOutVoucherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
