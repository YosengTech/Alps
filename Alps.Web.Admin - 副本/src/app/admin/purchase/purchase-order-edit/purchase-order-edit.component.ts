import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseOrderEditModel } from '../../model/PurchaseOrderModels';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from "rxjs/Rx";

import 'style-loader!./smartTables.scss';
@Component({
    selector: 'alps-purchase-order-edit',
    templateUrl: './purchase-order-edit.component.html',
    styleUrls: ['./purchase-order-edit.component.css']
})
export class PurchaseOrderEditComponent implements OnInit,OnDestroy {

    purchaseOrder: PurchaseOrderEditModel;
    private sub: Subscription;
    private tableSettings: Object ;
    private source: LocalDataSource;
    constructor(private _purchaseService: PurchaseService, private _activatedRouter: ActivatedRoute) {
        this.purchaseOrder = <PurchaseOrderEditModel>{};
        this.tableSettings = {
            actions: { position: 'left', columnTitle:'操作' },
            //add: { addButtonContent: '新增', createButtonContent: '创建', cancelButtonContent: "取消" },
            //edit: { editButtonContent: '修改', saveButtonContent: '保存', cancelButtonContent: "取消" },
            //delete: { deleteButtonContent: '删除'},
            add: {
                addButtonContent: '<i class="ion-ios-plus-outline"></i>',
                createButtonContent: '<i class="ion-checkmark"></i>',
                cancelButtonContent: '<i class="ion-close"></i>',
            },
            edit: {
                editButtonContent: '<i class="ion-edit"></i>',
                saveButtonContent: '<i class="ion-checkmark"></i>',
                cancelButtonContent: '<i class="ion-close"></i>',
            },
            delete: {
                deleteButtonContent: '<i class="ion-trash-a"></i>',
                confirmDelete: true
            },
            columns: {
                skuid: { title: "品名" }, quantity: { title: "数量" },  price: { title: '单价' }, amount: { title: '金额' }
            }
        };
    }

    ngOnInit() {
        var purchaseOrderID = this._activatedRouter.snapshot.params["id"];
        if (purchaseOrderID) {
            this.sub = this._purchaseService.getPurchaseOrder(purchaseOrderID).subscribe((data) => {
                this.purchaseOrder = <PurchaseOrderEditModel>data;
                this.source = new LocalDataSource(this.purchaseOrder.items);
            });
        }
        else {
            this.purchaseOrder = new PurchaseOrderEditModel();
            this.source = new LocalDataSource(this.purchaseOrder.items);

        }
    }
    ngOnDestroy() {
    if(this.sub)
        this.sub.unsubscribe();
    }

}
