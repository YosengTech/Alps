import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { StockOutService } from '../service/stock-out.service';
@Component({
  selector: 'stock-out-voucher-edit',
  templateUrl: './stock-out-voucher-edit.component.html',
  styleUrls: ['./stock-out-voucher-edit.component.css']
})
export class StockOutVoucherEditComponent implements OnInit {

    stockOutForm: FormGroup;
    supllierOptions: any[];
    departmentOptions: any[];
    productskuOptions: any[];
    item = {
        id: "",
        skuid: [null, Validators.required],
        quantity: [null, [Validators.required, Validators.pattern("[1-9][0-9]*[.]{0,1}[0-9]*")]],
        price: [null, [Validators.required, Validators.pattern("[1-9][0-9]*[.]{0,1}[0-9]*")]]
        //amount: ""
    };
    constructor(private _formBuilder: FormBuilder, private _stockOutService: StockOutService) {
        this.stockOutForm = this._formBuilder.group({
            departmentID: [null, [Validators.required]], supplierID: [null, Validators.required],
            items: this._formBuilder.array([])
        });
    }
    getItems(): FormArray {
        return this.stockOutForm.get("items") as FormArray;
    }
    addItem() {
        this.getItems().push(this._formBuilder.group(this.item));

    }
    removeItem(i) {
        if (confirm("确定要删除？"))
            this.getItems().removeAt(i);
    }
    ngOnInit() {
        this._stockOutService.query("SupplierOptions").subscribe((data) => {
            this.supllierOptions = data;
        });
        this._stockOutService.query("ProductSkuOptions").subscribe((data) => {
            this.productskuOptions = data;
        });
        this._stockOutService.query("DepartmentOptions").subscribe((data) => {
            this.departmentOptions = data;
        });
  }

}
