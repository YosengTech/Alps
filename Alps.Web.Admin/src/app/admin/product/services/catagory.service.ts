import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../service/base-crud.service';
import { Http } from "@angular/http";
import { NotificationsService } from "angular2-notifications";
import { AlpsLoadingBarService } from '../../component/component.module';
@Injectable()
export class CatagoryService extends BaseCrudService<any> {

    constructor(http: Http, notifer: NotificationsService, loadingBar: AlpsLoadingBarService) {
        super(http, notifer, loadingBar, "/api/catagories");
        //super("api/product");
    }
    GetListByParentID(id)
    {
        this.loadingBarStart();
        return this._http.get(this._baseUrl + "/GetListByParentID/" + id).map(res => res.json()).catch(err => this.handleError(err))
            .do(() => this.loadingBarComplete());
    }
}
