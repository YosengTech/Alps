import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierListComponent } from "./supplier-list/supplier-list.component";
import { SupplierEditComponent } from "./supplier-edit/supplier-edit.component";
const routes: Routes = [

            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: SupplierListComponent },
            { path: 'edit', component: SupplierEditComponent },
            { path: 'edit/:id', component: SupplierEditComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
