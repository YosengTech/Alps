import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule } from "@angular/forms";

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';

import { AlpsComponentModule } from '../component/component.module';
import { SupplierService } from "./supplier.service";
@NgModule({
  imports: [
      CommonModule,
      SupplierRoutingModule, AlpsComponentModule, NgaModule,FormsModule
  ],
  declarations: [SupplierListComponent, SupplierEditComponent],
  providers: [SupplierService]
})
export class SupplierModule { }
