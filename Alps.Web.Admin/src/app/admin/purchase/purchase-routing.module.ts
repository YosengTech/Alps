import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { PurchaseOrderEditComponent } from './purchase-order-edit/purchase-order-edit.component';
const routes: Routes = [{
    path: '',
    component: PurchaseComponent,
    children:
    [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: PurchaseOrderListComponent },
        { path: 'edit', component: PurchaseOrderEditComponent },
        { path: 'edit/:id', component: PurchaseOrderEditComponent }
    ]
    

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
