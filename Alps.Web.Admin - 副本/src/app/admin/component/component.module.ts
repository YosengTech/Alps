import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlpsSelectorComponent } from './alps-selector/alps-selector.component';
import {  ModalModule } from 'ng2-bootstrap';
@NgModule({
    imports: [
        CommonModule, ModalModule
    ],
  declarations: [AlpsSelectorComponent],
  exports: [AlpsSelectorComponent]
})
export class AlpsComponentModule { }
