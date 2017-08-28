import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductListDto } from '../../model/productModels';
import { TableSetting } from '../../component/component.module';
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    constructor(private _productService: ProductService) {
        var settings = new TableSetting("/admin/product");
        settings.addColumn("name", "品名").addColumn("fullName", "全称").addColumn("shortDescription", "简介")
            .addColumn("fullDescription", "描述").addDefaultAddAction().addDefaultEditAction();
        this.tableSettings = settings;
    }

    tableSettings: TableSetting;  
  tableSource: ProductListDto[];
  ngOnInit() {
      this._productService.getlist().subscribe((data) => {
          this.tableSource=data;
      })

  }
  initDatabase() {
      this._productService.query("InitDatabase").subscribe();
  }

} 

