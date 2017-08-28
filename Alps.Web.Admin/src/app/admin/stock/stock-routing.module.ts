import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
//import { StockInComponent } from './stock-in/stock-in.component';
//import { StockOutComponent } from './stock-out/stock-out.component';
import { StockInVoucherListComponent } from './stock-in-voucher-list/stock-in-voucher-list.component';
import { StockInVoucherEditComponent } from './stock-in-voucher-edit/stock-in-voucher-edit.component';
import { StockOutVoucherListComponent } from './stock-out-voucher-list/stock-out-voucher-list.component';
import { StockOutVoucherEditComponent } from './stock-out-voucher-edit/stock-out-voucher-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'stocklist', pathMatch: 'full' },
    { path: 'stocklist', component: StockListComponent },
    { path: 'stockin', component: StockInVoucherEditComponent },
    { path: 'stockin/:id', component: StockInVoucherEditComponent },
    { path: 'stockinlist', component: StockInVoucherListComponent },
    { path: 'stockoutlist', component: StockOutVoucherListComponent },
    { path: 'stockout', component: StockOutVoucherEditComponent },
    { path: 'stockout/:id', component: StockOutVoucherEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
