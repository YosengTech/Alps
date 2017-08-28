import { Component, OnInit } from '@angular/core';
import { ProductskuService } from '../services/productsku.service';
import { TableSetting } from '../../component/component.module';
@Component({
    selector: 'productsku-list',
    templateUrl: './productsku-list.component.html',
    styleUrls: ['./productsku-list.component.css']
})
export class ProductskuListComponent implements OnInit {

    tableSettings: TableSetting;
    tableSource: any[];
    constructor(private _productskuService: ProductskuService) {
        var settings = new TableSetting("/admin/product/sku");
        settings.addColumn("name", "Sku名").addColumn("fullName","全名").addColumn("productName", "产品名").addColumn("description", "简介")
            .addColumn("auxiliaryQuantity", "辅助数量").addColumn("quantity", "数量").addColumn("price", "价格")
            .addColumn("createdTime", "创建时间",'date').addColumn("modifiedTime", "修改时间",'date')
            .addRowAction("/admin/product/skuedit/", "ion-edit").addDefaultDeleteAction().addHeaderLink("/admin/product/skuedit", "ion-plus");
        this.tableSettings = settings;
    }
    productOptions: any[];
    selectedProductID: any;
    ngOnInit() {
        this._productskuService.query("ProductOptions").subscribe(data => {
            this.productOptions = data;
        });
        
    }
    onProductIDChanged()
    {
        this._productskuService.getListByProduct(this.selectedProductID).subscribe(data => {
            this.tableSource = data;
        });
    }

}
