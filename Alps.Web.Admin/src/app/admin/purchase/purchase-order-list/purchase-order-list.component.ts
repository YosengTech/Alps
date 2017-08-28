import { Component, OnInit } from '@angular/core';
import { TableSetting } from '../../component/component.module';
import { PurchaseService} from '../services/purchase.service';
@Component({
  selector: 'purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent implements OnInit {

    tableSettings: TableSetting;
    tableSource: any[];
    constructor(private _purchaseService: PurchaseService ) {
        var settings = new TableSetting("/admin/purchase");
        settings.addColumn("createTime", "开单时间", 'datetime').addColumn("creater", "开单人").addColumn("supplier", "供应商")
            .addColumn("confirmer", "提交人").addColumn("confirmTime", "提交时间","datetime").addColumn("totalQuantity", "总数量").addColumn("state", "订单状态")
            .addDefaultAddAction().addDefaultEditAction().addDefaultDeleteAction();
        this.tableSettings = settings;
        
    }

    ngOnInit() {
        this._purchaseService.getlist().subscribe(data => { this.tableSource = data;  });
  }

}
