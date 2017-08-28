import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductEditDto } from '../../model/ProductModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    myform: FormGroup;
    constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
        this.myform = this.formBuilder.group({
            id: [], name: [], fullName: [], shortDescription: [], fullDescription: [], deprecated: [],enableAuxiliaryQuantity:[]
        });

    }
    ngOnInit() {
        var id = this._activatedRoute.snapshot.params["id"];
        if (id) {
            this._productService.get(id).subscribe((data) => {
                this.myform.setValue(data);
            }
            );
        }
        else
            this.myform.setValue(new ProductEditDto());
    }
    onSubmit(form: FormGroup) {
        if (form.valid)
            alert(JSON.stringify(form.value));
    }
}
