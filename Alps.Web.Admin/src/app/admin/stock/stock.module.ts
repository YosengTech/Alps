import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { AlpsComponentModule } from '../component/component.module';
import { ReactiveFormsModule } from '@angular/forms';

import { StockRoutingModule } from './stock-routing.module';
import { StockListComponent } from './stock-list/stock-list.component';
//import { StockInComponent } from './stock-in/stock-in.component';
//import { StockOutComponent } from './stock-out/stock-out.component';
import { StockService } from "./service/stock.service";
import { StockInService } from "./service/stock-in.service";
import { StockOutService } from "./service/stock-out.service";
import { StockInVoucherListComponent } from './stock-in-voucher-list/stock-in-voucher-list.component';
import { StockInVoucherEditComponent } from './stock-in-voucher-edit/stock-in-voucher-edit.component';
import { StockOutVoucherEditComponent } from './stock-out-voucher-edit/stock-out-voucher-edit.component';
import { StockOutVoucherListComponent } from './stock-out-voucher-list/stock-out-voucher-list.component';

///import { AutofocusDirective } from '../component/component.module';
@NgModule({
  imports: [
    CommonModule,
      StockRoutingModule, AlpsComponentModule, NgaModule, ReactiveFormsModule
  ],
  declarations: [StockListComponent,  StockInVoucherListComponent, StockInVoucherEditComponent, StockOutVoucherEditComponent, StockOutVoucherListComponent],
  providers: [StockService, StockOutService, StockInService]
})
export class StockModule { }
