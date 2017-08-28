import { Component, OnInit } from '@angular/core';
import { ProductskuService } from '../services/productsku.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductskuEditDto } from "../../model/ProductModels";
@Component({
    selector: 'productsku-edit',
    templateUrl: './productsku-edit.component.html',
    styleUrls: ['./productsku-edit.component.css']
})
export class ProductskuEditComponent implements OnInit {

    constructor(private _productskuService: ProductskuService, private _activatedRoute: ActivatedRoute, private _router:Router, private _formBuilder: FormBuilder) {
        //this.productsku = new ProductskuEditDto();
        this.mainform = this._formBuilder.group({
            id: "",
            name: ["", [Validators.required]], productID: ["", [Validators.required]], description: "", auxiliaryQuantity: "0", quantity: "0", price: ["", [Validators.required, Validators.pattern("[0-9]+")]]
        });

    }
    mainform: FormGroup;
    //productsku: ProductskuEditDto;
    productOptions: any[];
    ngOnInit() {
        var id = this._activatedRoute.snapshot.params["id"];
        if (id) {
            this._productskuService.get(id).subscribe(data => {
                this.mainform.setValue(data);
            });
        }
        this._productskuService.query("ProductOptions").subscribe(data => this.productOptions = data);

    }
    onSubmit(form: FormGroup) {
        if (form.valid) {
            this._productskuService.createAndUpdate(form.value).subscribe();
        }
        else
            alert("验证失败");
    }
    back() {
        this._router.navigate(["/admin/product/skulist"]);
    }

}
