import { Component, OnInit } from '@angular/core';
import { TableSetting } from '../../component/component.module';
import { StockInService} from '../service/stock-in.service';
//import { StockInVoucherListDto } from '../../model/stockinvouchermodels';
@Component({
  selector: 'stock-in-voucher-list',
  templateUrl: './stock-in-voucher-list.component.html',
  styleUrls: ['./stock-in-voucher-list.component.css']
})
export class StockInVoucherListComponent implements OnInit {

    tableSettings: TableSetting;
    source: any[];
    constructor(private _stockInService: StockInService) {
        var settings = new TableSetting("");
        settings.addColumn("createTime", "创建时间", "datetime").addColumn("source", "来源").addColumn("department", "入库部门")
            .addColumn("totalAuxiliaryQuantity", "总辅助数量", ).addColumn("totalQuantity", "总数量").addColumn("totalAmount","总金额").addColumn("confirmer", "提交人")
            .addColumn("confirmTime", "提交时间",'datetime').addColumn("status","状态").addHeaderLink("/admin/stock/stockin", "ion-plus").addRowAction("/admin/stock/stockin", "ion-edit");
        this.tableSettings = settings;
    }

    ngOnInit() {
        this._stockInService.getlist().subscribe(data => this.source = data);
  }

}
