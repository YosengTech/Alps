import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';
import { LocalDataSource } from 'ng2-smart-table';
import { PurchaseOrderListModel } from '../../model/PurchaseOrderModels';
import { Router } from '@angular/router';

@Component({
    selector: 'alps-purchase-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {

    settings = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
            add: true,
            edit: true,
            delete: true,
        },
        add: {
            addButtonContent: '<i class="ion-ios-plus-outline"></i>',
            createButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="ion-edit"></i>',
            saveButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmSave: true
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
            confirmDelete: true
        },
        columns: {
            id: {
                title: 'ID',
                type: 'string',
                filter:false
            },
            totalQuantity: { title: '数量', type: 'number' },
            creater: { title: '创建人', type: 'string' },
            supplier:{title:'供应商',type:'string'}
            //},
            //firstName: {
            //    title: 'First Name',
            //    type: 'string'
            //},
            //lastName: {
            //    title: 'Last Name',
            //    type: 'string'
            //},
            //username: {
            //    title: 'Username',
            //    type: 'string'
            //},
            //email: {
            //    title: 'E-mail',
            //    type: 'string'
            //},
            //age: {
            //    title: 'Age',
            //    type: 'number'
            //}
        }

    };
    tableSettings = {
        columns: [{ id: "id", title: "ID" }, { id: "supplier", title: "供应商" }, { id: "creater", title: "经办人" }, {id:"totalQuantity",title:"数量"}],
        actions:{baseUrl:"//admin//purchase"}
        //columns: { id: { title: "ID" }, supplier:{ title: "供应商" }, creater:{ title: "经办人" }}
    };
    public items: PurchaseOrderListModel[];
    source: LocalDataSource = new LocalDataSource();
    //    purchaseOrderList: PurchaseOrder[];
    constructor(private _purchaseService: PurchaseService, private router: Router) {
        this._purchaseService.getPurchaseOrders().subscribe((data) => {
            this.source.load(data);
            this.items = <PurchaseOrderListModel[]>data;
            
        });
    }
    edit(event): void {
        this.router.navigate(["/"]);

    }
    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

}
