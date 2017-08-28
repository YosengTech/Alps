import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { ListComponent } from './list/list.component';
import { PurchaseComponent } from './purchase.component';
import { PurchaseService } from './services/purchase.service';
import { PurchaseOrderEditComponent } from './purchase-order-edit/purchase-order-edit.component';
import { AlpsListTableComponent } from '../component/alps-list-table/alps-list-table.component';

import { AlpsComponentModule } from '../component/component.module';
@NgModule({
  imports: [
    CommonModule,
      PurchaseRoutingModule,
        NgaModule,
      Ng2SmartTableModule,
      FormsModule, AlpsComponentModule

  ],
  declarations: [ListComponent, PurchaseComponent, PurchaseOrderEditComponent, AlpsListTableComponent],
  providers: [PurchaseService]
})
export class PurchaseModule { }
