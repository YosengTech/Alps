import { Component, OnInit } from '@angular/core';
import { TableSetting } from '../../component/component.module';
import { CatagoryService } from '../services/catagory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'catagory-list',
  templateUrl: './catagory-list.component.html',
  styleUrls: ['./catagory-list.component.css']
})
export class CatagoryListComponent implements OnInit {
    tableSettings: TableSetting;
    tableSource: any[];
    catagoryPath: any[];
    constructor(private _catagoryService: CatagoryService,private _activatedRoute: ActivatedRoute) {
        var settings = new TableSetting("/admin/product");
        settings.addColumn("name", "品名").addColumn("fullName", "全称").addColumn("shortDescription", "简介") 
            .addColumn("fullDescription", "描述").addDefaultAddAction().addDefaultEditAction()
            .addRowAction("/admin/product/catagorylist", "ion-navicon");
        this.tableSettings = settings;
    }
    ngOnInit() {
        this._activatedRoute.params.subscribe((params) => {
            console.info(this._activatedRoute.snapshot.queryParams);
            var id = params["id"];
            if (!id) {
                id = "";
            }
            this._catagoryService.GetListByParentID(id).subscribe((data) => {
                this.catagoryPath = data.path;
                this.tableSource = data.data;
            }
            );
        });
    }

}
