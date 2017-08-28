import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { StockInService } from '../service/stock-in.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminConfig } from '../../admin.config';
import { NotificationsService } from "angular2-notifications";
@Component({
    selector: 'stock-in-voucher-edit',
    templateUrl: './stock-in-voucher-edit.component.html',
    styleUrls: ['./stock-in-voucher-edit.component.css']
})
export class StockInVoucherEditComponent implements OnInit {

    stockInForm: FormGroup;
    supllierOptions: any[];
    departmentOptions: any[];
    productSkuOptions: any[];
    positionOptions: any[];
    arrayItem = {
        id: AdminConfig.EMPTY_GUID,
        productSkuID: ["", Validators.required], auxiliaryQuantity: [0, [Validators.pattern(AdminConfig.NUMBER_PATTERN)]], quantity: [0, [Validators.required, Validators.pattern(AdminConfig.NON_ZERO_NUMBER_PATTERN)]],
        price: ["", [Validators.required, Validators.pattern(AdminConfig.NON_ZERO_NUMBER_PATTERN)]], positionID: ["", Validators.required], serialNumber: ""
    }
    constructor(private _formBuilder: FormBuilder, private _stockInService: StockInService, private _router: Router, private _activateRoute: ActivatedRoute, private notifer: NotificationsService) {
        this.stockInForm = this._formBuilder.group({
            id:  AdminConfig.EMPTY_GUID, departmentID: [ null, [Validators.required]], sourceID: [null, Validators.required], status: 0,
            items: this._formBuilder.array([])
        });
    }
    getItems(): FormArray {
        return this.stockInForm.get("items") as FormArray;
    }
    addItem() {
        this.getItems().push(this._formBuilder.group(this.arrayItem));

    }
    removeItem(i) {
        if (confirm("确定要删除？"))
            this.getItems().removeAt(i);
    }
    ngOnInit() {
        this._stockInService.query("SupplierOptions").subscribe((data) => {
            this.supllierOptions = data;
        });
        this._stockInService.query("ProductSkuOptions").subscribe((data) => {
            this.productSkuOptions = data;
        });
        this._stockInService.query("DepartmentOptions").subscribe((data) => {
            this.departmentOptions = data;
        });
        this._stockInService.query("PositionOptions").subscribe((data) => {
            this.positionOptions = data;
        });
        this._stockInService.query("TradeAccountOptions").subscribe((data) => {
            this.supllierOptions = data;
            this.departmentOptions = data;
        });
        var id = this._activateRoute.snapshot.params["id"];
        if (id) {
            this._stockInService.get(id).subscribe(data => {
                this.loadDto(data);
            });
        }
        //this.stockInForm.get("id").disable();
        //console.info(this.stockInForm);
    }
    loadDto(data) {
        for (let i = this.getItems().length; i < data.items.length; i++)
            this.addItem();
        for (let i = this.getItems().length; i > data.items.length; i--)
            this.getItems().removeAt(i - 1);
        this.stockInForm.setValue(data);
    }
    save() {
        if (this.stockInForm.valid) {
            
            this._stockInService.createAndUpdate(this.stockInForm.value).subscribe(data => {
                this.loadDto(data);
            });
        }
        else
            this.notifer.warn("提示", "单据有错误，请检查");
    }
    del() {
        this._stockInService.delete(this.stockInForm.value["id"]).subscribe();
    }
    submit() {
        this._stockInService.action("Submit/" + this.stockInForm.value["id"]).subscribe();
    }
    back() {
        this._router.navigate(['/admin/stock/stockinlist']);
    }
    hasID()
    {
        return this.stockInForm && this.stockInForm.controls["id"] && this.stockInForm.controls["id"].value !== AdminConfig.EMPTY_GUID;
    }
}
