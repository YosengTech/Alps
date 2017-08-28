import { Component, OnInit } from '@angular/core';
import { SupplierService } from "../supplier.service";

@Component({
  selector: 'supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

    tableSettings = {
        columns:[{ id: "id", title: "ID" }, { id: "name", title: "姓名" }],
        actions:{baseUrl:"/admin/supplier"}
    };
    constructor(private _supplierService: SupplierService) { }
    items: any[];
    ngOnInit() {
        this._supplierService.getlist().subscribe(data => {
            this.items = data;
        });
  }

}
