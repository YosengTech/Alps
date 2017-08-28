import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DinnerInfoComponent } from './dinner-info/dinner-info.component';
import { CanteenComponent } from './canteen.component';
import { BookDinnerComponent } from './book-dinner/book-dinner.component';
import { AuthGuard } from '../auth.guard';
import { TakeDinnerComponent } from "./take-dinner/take-dinner.component";
import { TakeInfoComponent } from "./take-info/take-info.component";
const routes: Routes = [
    {
        path: '', component: CanteenComponent, children: [
            { path: '', redirectTo: 'canteeninfo', pathMatch: 'full' },
            { path: 'canteeninfo', component: DinnerInfoComponent },
            { path: 'bookdinner', component: BookDinnerComponent, canActivate: [AuthGuard], data: { roles: ["admin","canteen","user"] }},
            { path: 'takedinner', component: TakeDinnerComponent, canActivate: [AuthGuard], data: { roles: ["canteen", "admin"] } },
            { path: 'takeinfo', component: TakeInfoComponent, canActivate: [AuthGuard], data: { roles: [ "admin"] } }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CanteenRoutingModule { }
