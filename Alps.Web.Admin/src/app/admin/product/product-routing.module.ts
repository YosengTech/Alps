import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductskuListComponent } from "./productsku-list/productsku-list.component";
import { ProductskuEditComponent } from "./productsku-edit/productsku-edit.component";
import { CatagoryListComponent } from "./catagory-list/catagory-list.component";
import { CatagoryEditComponent } from "./catagory-edit/catagory-edit.component";
const routes: Routes = [
   { path: '', redirectTo: 'list', pathMatch: 'full' },
   { path: 'list', component: ProductListComponent },
   { path: 'edit', component: ProductEditComponent },
   { path: 'edit/:id', component: ProductEditComponent },
   { path: 'skulist', component: ProductskuListComponent },
   { path: 'skuedit', component: ProductskuEditComponent },
   { path: 'skuedit/:id', component: ProductskuEditComponent },
   { path: 'catagorylist/:id', component: CatagoryListComponent },
   { path: 'catagorylist', redirectTo: 'catagorylist/', pathMatch: 'full' },// component: CatagoryListComponent },
   { path: 'catagorydit', component: CatagoryEditComponent },
   { path: 'catagoryedit/:id', component: CatagoryEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {


}
