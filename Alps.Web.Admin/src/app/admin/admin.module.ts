import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgaModule } from '../theme/nga.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PurchaseModule } from './purchase/purchase.module';
import { SupplierModule } from "./supplier/supplier.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlpsComponentModule } from './component/component.module';
@NgModule({
  imports: [
    CommonModule,
      AdminRoutingModule,
      NgaModule, Ng2BootstrapModule.forRoot(), NgbModule.forRoot(), SimpleNotificationsModule.forRoot(), BrowserAnimationsModule, FormsModule, ReactiveFormsModule
      , AlpsComponentModule.forRoot()
  ],
  declarations: [AdminComponent]//,  AlpsSelectorComponent, AlpsSelectorModalComponent]
    
})
export class AdminModule { }
