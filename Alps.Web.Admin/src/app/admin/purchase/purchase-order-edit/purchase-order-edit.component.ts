import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseOrderEditModel, PurchaseOrderForEditDto, PurchaseOrderItemForEditDto } from '../../model/PurchaseOrderModels';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from "rxjs/Rx";
import { AlpsSelectItem } from '../../component/component.module';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import 'style-loader!./smartTables.scss';
@Component({
    selector: 'alps-purchase-order-edit',
    templateUrl: './purchase-order-edit.component.html',
    styleUrls: ['./purchase-order-edit.component.css']
})
export class PurchaseOrderEditComponent implements OnInit, OnDestroy {

    productskuOptions: AlpsSelectItem[];
    supllierOptions: AlpsSelectItem[];
    departmentOptions: AlpsSelectItem[];
    editForm: FormGroup;
    sub: Subscription;

    constructor(private _purchaseService: PurchaseService, private _activatedRouter: ActivatedRoute, private _formBuilder: FormBuilder, private _router: Router) {
        this.editForm = this._formBuilder.group({
            id: [""], supplierID: ["", [Validators.required]], departmentID: ["", [Validators.required]],
            items: this._formBuilder.array([])
        });
    }
    newItem(): FormGroup {
        return this._formBuilder.group({
            id:"",
            skuid: [null, Validators.required],
            quantity: [null, [Validators.required, Validators.pattern("[1-9][0-9]*[.]{0,1}[0-9]*")]],
            price: [null, [Validators.required, Validators.pattern("[1-9][0-9]*[.]{0,1}[0-9]*")]],
            amount: ""
        });
    }
    getItems(): FormArray {
        return this.editForm.get("items") as FormArray;
    }
    addItem() {
        this.getItems().push(this.newItem());
    }
    removeItem(i) {
        if (confirm("确定要删除？"))
            this.getItems().removeAt(i);

    }
    recaluAmount(event, item) {
        setTimeout(() => item.controls.amount.setValue(item.controls.quantity.value * item.controls.price.value), 200);
    }
    ngOnInit() {
        var purchaseOrderID = this._activatedRouter.snapshot.params["id"];
        if (purchaseOrderID) {
            this.sub = this._purchaseService.get(purchaseOrderID).subscribe((data: PurchaseOrderEditModel) => {
                data.order.items.forEach(p => this.addItem());
                this.editForm.patchValue(data.order);
            });
        }
        this._purchaseService.query("SupplierOptions").subscribe((data: AlpsSelectItem[]) => {
            this.supllierOptions = data;
        });
        this._purchaseService.query("ProductSkuOptions").subscribe((data: AlpsSelectItem[]) => {
            this.productskuOptions = data;
        });
        this._purchaseService.query("DepartmentOptions").subscribe((data: AlpsSelectItem[]) => {
            this.departmentOptions = data;
        });
    }
    ngOnDestroy() {
        if (this.sub)
            this.sub.unsubscribe();
    }
    save() {
        if (this.editForm.valid)
            this._purchaseService.createAndUpdate(this.editForm.value).subscribe(p => this.backToList());
        
    }
    backToList() {
        this._router.navigate(["/admin/purchase/list"]);
    }
   

}
