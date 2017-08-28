import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AlpsComponentModule } from '../component/component.module';
import { NgaModule } from '../../theme/nga.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductskuListComponent } from './productsku-list/productsku-list.component';
import { ProductskuEditComponent } from './productsku-edit/productsku-edit.component';
import { ProductService } from './services/product.service';
import { ProductskuService } from './services/productsku.service';
import { CatagoryEditComponent } from './catagory-edit/catagory-edit.component';
import { CatagoryListComponent } from './catagory-list/catagory-list.component';
import { CatagoryService } from './services/catagory.service';
@NgModule({
  imports: [
      CommonModule,
      ProductRoutingModule, AlpsComponentModule, NgaModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [ProductListComponent, ProductEditComponent, ProductskuListComponent, ProductskuEditComponent, CatagoryEditComponent, CatagoryListComponent]
    , providers: [ProductService, ProductskuService, CatagoryService]
})
export class ProductModule { }
