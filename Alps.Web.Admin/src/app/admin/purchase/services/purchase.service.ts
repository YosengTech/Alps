import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observer, Observable } from "rxjs/Rx";
import { BaseCrudService } from "../../service/base-crud.service";
import { NotificationsService } from "angular2-notifications";
import { AlpsLoadingBarService } from '../../component/component.module';
@Injectable()
export class PurchaseService extends BaseCrudService<any>{

    loadingBarService: AlpsLoadingBarService;
    constructor(_http: Http, notifier: NotificationsService, loadingService: AlpsLoadingBarService) {
        super(_http, notifier, loadingService, "/api/purchaseorders");
        this.loadingBarService = loadingService;
        //super( "/api/purchaseorders");
    }

    getSupplierOptions()
    {
        //this.loadingBarService.start();
        return this.query("GetSupplierOptions");
        //return this._http.get(this._baseUrl + "/GetSupplierOptionsds").map(response => {
        //    console.info(response);
        //    response.json();
        //}
        //).catch((err)=>this.handleError(err)).finally(() => {
        //                this.loadingBarService.complete();
        //});
    }
    getProductskuOptions() {
        return this._http.get(this._baseUrl + "/GetProductskuOptions").map(response => response.json()).catch(this.handleError);
    }
    getUnitOptions() {
        return this._http.get(this._baseUrl + "/GetUnitOptions").map(res => res.json()).catch(this.handleError);
    }
    //private _baseURL: string = "api/purchaseOrders";
    //isSubmit: Observable<boolean>;
    //private observer: Observer<boolean>;
    //constructor(private _http: Http) {
    //    this.isSubmit = new Observable<boolean>(observer => this.observer = observer).share();
    //}
    //getSupplierOptions() {
    //    return this._http.get(this._baseURL+"/GetSupplierOptions").map(response => response.json()).catch(this.handleError);
    //}
    //getPurchaseOrders() {
    //    return this._http.get(this._baseURL).map(response => response.json()).catch(this.handleError);
    //}
    //getPurchaseOrder(id: string) {
    //    return this._http.get(this._baseURL+"/"+id).map(res => res.json()).catch(this.handleError);
    //}
    //createPurchaseOrder(purchaseOrder) {
    //    let body = JSON.stringify(purchaseOrder);
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    return this._http.post(this._baseURL, body, options)
    //        .map(res => res.json().message).catch(this.handleError);
    //}
    //updatePurchaseOrder(purchaseOrder, id: string) {
    //    var updateUrl = this._baseURL + '/' + id;
    //    var body = JSON.stringify(purchaseOrder);
    //    var headers = new Headers();
    //    headers.append('Content-Type', 'application/json');
    //    return this._http.put(updateUrl, body, {
    //        headers: headers
    //    }).map(response => response.json().message).catch(this.handleError);

    //}
    //deleteContact(id: string): Observable<string> {
    //    var deleteByIdUrl = this._baseURL + '/' + id
    //    return this._http.delete(deleteByIdUrl).map(response => response.json().message).catch(this.handleError);

    //}

    //private handleError(error) {
    //    return Observable.throw(error.json().error || 'Opps!! Server error');
    //}

}
