import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from "rxjs/Rx";
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";

@Injectable()
export class UserService {
    readonly tokenSignal: string = "Token";
    readonly tokenExpireTimeSignal: string = "Token_Expire";
    readonly roleSignal:string= "Role";
    constructor(private _http: HttpClient, private router: Router) {
        this.loginState = (new Observable<boolean>(
            observer => { UserService.loginStateObserver = observer; observer.next(this.loginStatus()); }));
    } 
    getUserInfo() {
        return this.authGet("/api/token/getuserinfo");
    }
    getrole()
    {
        return sessionStorage.getItem(this.roleSignal);
    }
    static loginStateObserver: Observer<boolean>;
    loginState:  Observable<boolean>;
    login(username: string, password: string) {
        return new Observable(observer =>
            this._http.post<any>("/api/token/gettoken", { name: username, password: password }).subscribe(
                (json) => {
                    if (json.State == 1) {
                        sessionStorage.setItem(this.tokenSignal, json.Data.accessToken);
                        sessionStorage.setItem(this.tokenExpireTimeSignal, JSON.parse(atob(json.Data.accessToken.split('.')[1])).exp + "000");
                        sessionStorage.setItem(this.roleSignal, JSON.parse(atob(json.Data.accessToken.split('.')[1])).role);
                        UserService.loginStateObserver.next(true);
                        observer.next(true);
                    }
                    else
                        observer.next(false);
                })
        )
    }
    logout() {
        sessionStorage.removeItem(this.tokenSignal);
        sessionStorage.removeItem(this.tokenExpireTimeSignal);
        sessionStorage.removeItem(this.roleSignal);
        UserService.loginStateObserver.next(false);
    }
    loginStatus() {
        var logined = sessionStorage.getItem(this.tokenSignal) != null && Date.now() < parseInt(sessionStorage.getItem(this.tokenExpireTimeSignal));
        if (logined)
            return logined;
        else
        {
            this.logout();
            return logined;
        }
    }
    private getAuthHeader(): HttpHeaders {
        let token = sessionStorage.getItem(this.tokenSignal);
        if (token == null) {
            this.router.navigate(["/user/login"]);
        }
        var headers = new HttpHeaders();
        headers = headers.append("Authorization", "Bearer " + token);
        return headers;
    }
    checkAndRedirect() {
        let token = sessionStorage.getItem(this.tokenSignal);
        if (token == null) {
            this.router.navigate(["/user/login"]);
            return false;
        }
        else
            return true;
    }
    authGet(url: string) {
        let headers = this.getAuthHeader();
        return this._http.get<any>(url, { headers: headers });//.catch((err) => {console.info(err);return Observable.throw(err);    });

    }
    authPost(url: string, body: any) {
        let headers = this.getAuthHeader();
        return this._http.post(url, body, { headers: headers });//.catch((err) => {console.info(err); return Observable.throw(err);     });
    }
    register(username: string, password: string, realname: string) {
        return this._http.post<any>("api/token/register", { Username: username, Password: password,RealName:realname });
    }

}


@Injectable()
export class JWTInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((err) => {
               // console.info(err);
                if (err instanceof HttpErrorResponse) {
                    if (err.status == 401) {
                        this.router.navigate(['/user/login'], { queryParams: { resetStatus: true } });
                    }
                    if (err.status == 504)
                        this.router.navigate(['/user/neterror'], { queryParams: { msg: "网络连接错误" } });
                    if (err.status == 403)
                        this.router.navigate(['/user/neterror'], { queryParams: { msg: "无此权限" } });
                }
                return Observable.of(err);
                // Do stuff
            });
    }
}
