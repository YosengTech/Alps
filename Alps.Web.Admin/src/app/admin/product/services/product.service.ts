import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../service/base-crud.service';
import { Http } from "@angular/http";
import { NotificationsService } from "angular2-notifications";
import { AlpsLoadingBarService } from '../../component/component.module';
@Injectable()
export class ProductService extends BaseCrudService<any>{

    constructor(http: Http, notifer: NotificationsService, loadingBar: AlpsLoadingBarService) {
        super(http, notifer, loadingBar, "/api/products");
        //super("api/product");
    }

}
