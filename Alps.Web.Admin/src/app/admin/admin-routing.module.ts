import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [{
    path: 'admin',
    component: AdminComponent,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', loadChildren: 'app/admin/dashboard/dashboard.module#DashboardModule' },
        { path: 'purchase', loadChildren: 'app/admin/purchase/purchase.module#PurchaseModule' },
        { path: 'supplier', loadChildren: 'app/admin/supplier/supplier.module#SupplierModule' },
        { path: 'product', loadChildren: 'app/admin/product/product.module#ProductModule' },
        { path: 'stock', loadChildren:'app/admin/stock/stock.module#StockModule' }
        //{ path: 'components', loadChildren: 'app/admin/components/components.module#ComponentsModule' },
        //{ path: 'charts', loadChildren: 'app/admin/charts/charts.module#ChartsModule' },
        //{ path: 'ui', loadChildren: 'app/admin/ui/ui.module#UiModule' },
        //{ path: 'forms', loadChildren: 'app/admin/forms/forms.module#FormsModule' },
        //{ path: 'tables', loadChildren: 'app/admin/tables/tables.module#TablesModule' },
        //{ path: 'maps', loadChildren: 'app/admin/maps/maps.module#MapsModule' }
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
