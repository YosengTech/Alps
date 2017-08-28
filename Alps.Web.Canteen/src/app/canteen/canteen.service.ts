import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
@Injectable()
export class CanteenService {

    constructor(private _http: HttpClient, private _userService: UserService) {
    }
    getDinners()
    {
        return this._http.get<any>("api/canteen/getdinners");
    }
    getDiners()
    {
        return this._userService.authGet("api/canteen/getdiners");
        //return this._http.get<any>("api/canteen/getdiners");
    }
    getDiner(id:string)
    {
        return this._userService.authGet("api/canteen/getdiner/"+id)
    }
    updateDiner(diner)
    {
        return this._userService.authPost("api/canteen/updatediner", diner);
    }
    blukupdateDiner(diners)
    {
        return this._userService.authPost("api/canteen/blukupdatediner", diners);
    }
    book(dinerID, dinnerID, dinnerDate, unBook: boolean = false)
    {
        return this._userService.authPost("api/canteen/book", { dinerID: dinerID, dinnerID: dinnerID, dinnerDate: dinnerDate, unBook: unBook });
    }
    getbookrecord(dinerID)
    {
        return this._userService.authGet("api/canteen/getbookrecord/" + dinerID);
    }
    getbookinfo()
    {
        return this._http.get<any>("api/canteen/getbookinfo");
    }
    takeDinner(date: Date, dinnerID: string, cardNumber: string) {
        return this._userService.authPost("api/canteen/takedinner", { TakeDate: date, DinnerID: dinnerID, CardNumber: cardNumber });
    }
    getTakeRecord() {
        return this._userService.authGet("api/canteen/gettakerecords");
    }
    deletetakerecord(id)
    {
        return this._userService.authPost("api/canteen/deletetakerecord/" + id, {});
    }
    getBindDiners() {
        return this._userService.authGet("api/canteen/getbinddiners");
    } 
    getBindDiner(id:string) {
        return this._userService.authGet("api/canteen/getbinddiner/"+id);
    } 
    updateBindDiner( bindName: string, bindIDNumber: string) {
        return this._userService.authPost("api/canteen/bindDiner", { BindName: bindName, BindIDNumber: bindIDNumber});
    }
    getBookableDiners() {
        return this._userService.authGet("api/canteen/getbookablediners");
    }
    unbindDiner(id)
    {
        return this._userService.authPost("api/canteen/unbindDiner/"+id, { });
    }
    gettakeinfo(cn:string,dn:string)
    {
        return this._userService.authPost("api/canteen/gettakeinfo", {CardNumber:cn,DinerName:dn});
    }
}
