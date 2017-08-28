import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../service/base-crud.service';
import { NotificationsService } from "angular2-notifications";
import { AlpsLoadingBarService } from '../../component/component.module';
import { Http } from "@angular/http";
@Injectable()
export class ProductskuService extends BaseCrudService<any> {

    constructor(http: Http, notifer: NotificationsService, loadingBar: AlpsLoadingBarService) {
        super(http, notifer, loadingBar, "/api/productskus");
    }
    getListByProduct(productID: string) {
        this.loadingBarStart();
        return this._http.get(this._baseUrl + "/GetListByProduct/" + productID).map(res => res.json()).catch(err => this.handleError(err))
            .do(() => this.loadingBarComplete());
    }
}
