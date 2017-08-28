import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {  ReactiveFormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { PurchaseService } from './services/purchase.service';
import { PurchaseOrderEditComponent } from './purchase-order-edit/purchase-order-edit.component';

import { AlpsComponentModule } from '../component/component.module';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
@NgModule({
  imports: [
    CommonModule,
      PurchaseRoutingModule,
        NgaModule,
      Ng2SmartTableModule,
       AlpsComponentModule, ReactiveFormsModule

  ],
  declarations: [ PurchaseComponent, PurchaseOrderEditComponent, PurchaseOrderListComponent],
  providers: [PurchaseService]
})
export class PurchaseModule { }
