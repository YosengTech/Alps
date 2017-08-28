import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';
import { TableSetting } from '../../component/component.module';

@Component({
    selector: 'stock-list',
    templateUrl: './stock-list.component.html',
    styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
    tableSettings: TableSetting;
    source: any[];
    constructor(private _stockService: StockService) {
        var setting = new TableSetting("");
        setting.addColumn("name", "品名").addColumn("quantity", "数量").addColumn("auxiliaryQuantity", "辅助数量")
            .addColumn("position", "仓库");
        this.tableSettings = setting;
    }

    ngOnInit() {
        this._stockService.getlist().subscribe(data =>
        {
            this.source = data;
        })
    }

}
