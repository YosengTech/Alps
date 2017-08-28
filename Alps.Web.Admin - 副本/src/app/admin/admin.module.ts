import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NgaModule } from '../theme/nga.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PurchaseModule } from './purchase/purchase.module';
//import { AlpsSelectorComponent } from './component/alps-selector/alps-selector.component';
///import { AlpsSelectorModalComponent } from './component/alps-selector/alps-selector-modal/alps-selector-modal.component';
//import { AlpsListTableComponent } from './component/alps-list-table/alps-list-table.component';

@NgModule({
  imports: [
    CommonModule,
      AdminRoutingModule,
      NgaModule, Ng2BootstrapModule.forRoot()
  ],
  declarations: [AdminComponent  ]//,  AlpsSelectorComponent, AlpsSelectorModalComponent]
})
export class AdminModule { }
