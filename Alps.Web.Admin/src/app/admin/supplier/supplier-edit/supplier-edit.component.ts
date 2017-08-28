import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Rx";
@Component({
  selector: 'supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {

    constructor(private supplierService: SupplierService, private _activatedRoute: ActivatedRoute) {
        this.supplier = {};
    }
    sub: Subscription;
    supplier: any;
    ngOnInit() {
        var supplierID = this._activatedRoute.snapshot.params["id"];
        if (supplierID) {

            this.sub = this.supplierService.get(supplierID).subscribe(data => {
                this.supplier = data;
            });
        }
        else {
            //this.purchaseOrder = new PurchaseOrderForEdit();
            //this.source = new LocalDataSource(this.purchaseOrder.items);

        }
        
  }

}
