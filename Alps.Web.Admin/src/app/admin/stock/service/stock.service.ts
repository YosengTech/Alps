import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../service/base-crud.service';
import { Http } from '@angular/http';
import { NotificationsService } from "angular2-notifications";
import { AlpsLoadingBarService } from '../../component/component.module';

@Injectable()
export class StockService extends BaseCrudService<any> {

    constructor(_http: Http, notifier: NotificationsService, loadingBar: AlpsLoadingBarService) {
        super(_http, notifier, loadingBar, "/api/stocks");
    }
}
