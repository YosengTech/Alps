import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlpsSelectorComponent } from './alps-selector/alps-selector.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlpsListTableComponent } from './alps-list-table/alps-list-table.component';
import { RouterModule } from '@angular/router';
import { AlpsInlineEditComponent } from './alps-inline-edit/alps-inline-edit.component';
import { FormsModule } from '@angular/forms';
import { AlpsLoadingBarComponent } from './alps-loading-bar/alps-loading-bar.component';
import { AlpsLoadingBarService } from './alps-loading-bar/alps-loading-bar.service';
import { AutofocusDirective } from './autofocus.directive';

export { AlpsSelectItem } from './alps-selector/alps-select-item';
export * from './alps-loading-bar/alps-loading-bar.component';
export * from './alps-loading-bar/alps-loading-bar.service';
export { TableSetting } from './alps-list-table/alps-list-table.component';
@NgModule({
    imports: [
        CommonModule, ModalModule, NgbModule, RouterModule,FormsModule
    ],
    declarations: [AlpsSelectorComponent, AlpsListTableComponent, AlpsInlineEditComponent, AlpsLoadingBarComponent, AutofocusDirective],
    exports: [AlpsSelectorComponent, AlpsListTableComponent, AlpsInlineEditComponent, AlpsLoadingBarComponent, AutofocusDirective]
})
export class AlpsComponentModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AlpsComponentModule,
            providers: [AlpsLoadingBarService]
        };
    }

}


