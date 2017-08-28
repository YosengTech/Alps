import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observer, Observable } from "rxjs/Rx";
import { NotificationsService } from "angular2-notifications";

import { ReflectiveInjector } from '@angular/core';
import { HttpModule } from "@angular/http";
import { AlpsLoadingBarService } from '../component/component.module';


@Injectable()
export class BaseCrudService<T> {
    //IsSubmit: Observable<boolean>;
    private observer: Observer<boolean>;

    constructor(protected _http: Http, protected notifier: NotificationsService, protected loadingBarService: AlpsLoadingBarService, protected _baseUrl: string) {

    }
    query(action: string) {
        this.loadingBarStart();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, body: { id: 1314 } });
        return this._http.get("/api/query/" + action, options).map(res => res.json()).catch(err => this.handleError(err))
            .do(() => this.loadingBarComplete());
    }
    action(action: string, param?: any) {
        this.loadingBarStart();
        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._baseUrl + "/" + action, body, options).map(res =>
        {
            res.json();
        }).catch(err => this.handleError(err))
            .do(() => this.loadingBarComplete());
    }
    getlist() {
        this.loadingBarStart();
        return this._http.get(this._baseUrl).map(response => response.json()).catch((err: any) =>
            this.handleError(err)).do(() => this.loadingBarComplete());
    }
    get(id: string) {
        this.loadingBarStart();
        return this._http.get(this._baseUrl + "/" + id).map(res => res.json()).catch((err) => this.handleError(err))
            .do(() => this.loadingBarComplete());
    }
    createAndUpdate(entity) {
        if (!entity.hasOwnProperty("id"))
            throw Error("不存在标识");
        if (entity.id && entity.id !== "" && entity.id !== "00000000-0000-0000-0000-000000000000") {
            return this.update(entity, entity.id);
        }
        else
            return this.create(entity);
    }
    create(entity) {
        this.loadingBarStart();
        if (!entity.id || entity.id === "")
            entity.id = "00000000-0000-0000-0000-000000000000";
        let body = JSON.stringify(entity);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._baseUrl, body, options).map(res => res.json()).catch((err) => this.handleError(err))
            .do(() => { this.loadingBarComplete(); this.notifier.info("提示", "新建成功") });
    }
    update(entity: T, id: string) {
        this.loadingBarStart();
        let body = JSON.stringify(entity);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._baseUrl + "/" + id, body, options).map(res => res.json()).catch((err) => this.handleError(err))
            .do(() => { this.loadingBarComplete(); this.notifier.info("提示", "成功更新") });
    }
    delete(id: string) {
        this.loadingBarStart();
        return this._http.delete(this._baseUrl + "/" + id).catch((err) => this.handleError(err))
            .do(() => { this.loadingBarComplete(); this.notifier.info("提示", "成功删除") });
    }
    protected handleError(error) {
        //console.info('与服务器交互失败！');
        this.loadingBarComplete();
        this.notifier.error("出错了", '与服务器交互失败！' + error);
        return Observable.throw(error || '与服务器交互失败！');
    }
    protected loadingBarStart() {
        this.loadingBarService.start();
    }
    protected loadingBarComplete() {
        this.loadingBarService.complete();
    }
}
