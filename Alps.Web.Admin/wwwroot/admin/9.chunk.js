webpackJsonpac__name_([9],{

/***/ 1056:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1057:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <form [formGroup]=\"stockInForm\" autofocus>\r\n    <ba-card title=\"基本资料\">\r\n      <div class=\"row\">\r\n        <div class=\"form-group col-sm-3\">\r\n          <label>采购部门</label>\r\n          <alps-selector [options]=\"departmentOptions\" formControlName=\"departmentID\"></alps-selector>\n          \r\n        </div>\r\n        <div class=\"form-group col-sm-3\">\r\n          <label>来源</label>\r\n          <alps-selector [options]=\"supllierOptions\" formControlName=\"sourceID\"></alps-selector>\r\n        </div>\r\n      </div>\r\n    </ba-card>\r\n    <ba-card title=\"物品明细\">\r\n      <table class=\"table  table-hover\" formArrayName=\"items\">\r\n        <tr>\r\n          <th class=\"\" width=\"10%\">品名</th>\r\n          <th width=\"10%\">辅助数量</th>\r\n          <th width=\"10%\">数量</th>\r\n          <th width=\"10%\">单价</th>\r\n          <th width=\"10%\">金额</th>\r\n          <th width=\"10%\">仓位</th>\r\n          <th width=\"10%\">序列号</th>\r\n          <th style=\"max-width:50px;padding-left:8px;\" width=\"3%\"><button class=\"btn btn-default btn-xs\" (click)=\"addItem()\" type=\"button\"><i class=\"ion-plus\"></i></button></th>\r\n        </tr>\r\n        <tr *ngFor=\"let item of stockInForm.controls.items.controls;let i=index\" [formGroupName]=\"i\">\r\n          <td>\r\n            <alps-selector [options]=\"productSkuOptions\" formControlName=\"productSkuID\"></alps-selector>\r\n          </td>\r\n          <td>\r\n            <alps-inline-edit formControlName=\"auxiliaryQuantity\"></alps-inline-edit>\r\n          </td>\r\n          <td>\r\n            <alps-inline-edit formControlName=\"quantity\"></alps-inline-edit>\r\n          </td>\r\n          <td>\r\n            <alps-inline-edit formControlName=\"price\"></alps-inline-edit>\r\n          </td>\r\n          <td>\r\n            {{item.controls.quantity.value*item.controls.price.value}}\r\n          </td>\r\n          <td>\r\n            <alps-selector [options]=\"positionOptions\" formControlName=\"positionID\"></alps-selector>\r\n          </td>\r\n          <td>\r\n            <alps-inline-edit formControlName=\"serialNumber\"></alps-inline-edit>\r\n          </td>\r\n          <td><button class=\"btn btn-default  btn-xs\" (click)=\"removeItem(i)\" type=\"button\"><i class=\"ion-trash-a\"></i></button></td>\r\n        </tr>\r\n      </table>\r\n    </ba-card>\r\n    <ba-card  class=\"form-action-group\">\r\n      <button class=\"btn btn-default\" type=\"button\" (click)=\"save()\">保存</button>&nbsp;&nbsp;&nbsp;\r\n      <button class=\"btn btn-default\" type=\"button\" (click)=\"submit()\" [disabled]=\"!hasID()\">提交</button>&nbsp;&nbsp;&nbsp;\r\n      <button class=\"btn btn-default\" type=\"button\" (click)=\"del()\"  [disabled]=\"!hasID()\">删除</button>&nbsp;&nbsp;&nbsp;\r\n      <button class=\"btn btn-default\" type=\"button\" (click)=\"back()\">返回</button>\r\n    </ba-card>\r\n  </form>\r\n  {{stockInForm.value|json}}\r\n</div>\r\n"

/***/ }),

/***/ 1058:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1059:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <ba-card title=\"入库记录\">\r\n    <alps-list-table [settings]=\"tableSettings\" [source]=\"source\"></alps-list-table>\r\n  </ba-card>\r\n</div>\r\n"

/***/ }),

/***/ 1060:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1061:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <ba-card title=\"库存清单\">\r\n    <alps-list-table [settings]=\"tableSettings\" [source]=\"source\"></alps-list-table>\r\n  </ba-card>\r\n</div>\r\n"

/***/ }),

/***/ 1062:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1063:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <form [formGroup]=\"stockOutForm\" autofocus>\r\n    <ba-card title=\"基本资料\">\r\n      <div class=\"row\">\r\n        <div class=\"form-group col-sm-3\">\r\n          <label>客户</label>\r\n          <alps-selector [options]=\"supllierOptions\" formControlName=\"supplierID\"></alps-selector>\r\n        </div>\r\n\r\n        <div class=\"form-group col-sm-3\">\r\n          <label>来源</label>\r\n          <alps-selector [options]=\"departmentOptions\" formControlName=\"departmentID\"></alps-selector>\r\n        </div>\r\n      </div>\r\n    </ba-card>\r\n    <ba-card title=\"物品明细\">\r\n      <table class=\"table  table-hover\" formArrayName=\"items\">\r\n        <tr>\r\n          <th class=\"\" width=\"10%\">物品</th>\r\n          <th width=\"10%\">数量</th>\r\n          <th width=\"10%\">单价</th>\r\n          <th width=\"10%\">金额</th>\r\n          <th style=\"max-width:50px;padding-left:8px;\" width=\"3%\"><button class=\"btn btn-default btn-xs\" (click)=\"addItem()\" type=\"button\"><i class=\"ion-plus\"></i></button></th>\r\n        </tr>\r\n        <tr *ngFor=\"let item of stockOutForm.controls.items.controls;let i=index\" [formGroupName]=\"i\">\r\n          <td>\r\n            <alps-selector [options]=\"productskuOptions\" formControlName=\"skuid\"></alps-selector>\r\n          </td>\r\n          <td>\r\n            <alps-inline-edit formControlName=\"quantity\"></alps-inline-edit>\r\n          </td>\r\n          <td>\r\n            <alps-inline-edit formControlName=\"price\"></alps-inline-edit>\r\n          </td>\r\n          <td>\r\n            {{item.controls.quantity.value*item.controls.price.value}}\r\n          </td>\r\n          <td><button class=\"btn btn-default  btn-xs\" (click)=\"removeItem(i)\" type=\"button\"><i class=\"ion-trash-a\"></i></button></td>\r\n        </tr>\r\n      </table>\n      \r\n    </ba-card>\r\n  </form>{{stockOutForm.value|json}}\r\n</div>\r\n"

/***/ }),

/***/ 1064:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1065:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <ba-card title=\"出库记录\">\r\n    <alps-list-table [settings]=\"tableSettings\" [source]=\"source\"></alps-list-table>\r\n  </ba-card>\r\n</div>\r\n"

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__theme_nga_module__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_component_module__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stock_routing_module__ = __webpack_require__(928);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__stock_list_stock_list_component__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_stock_service__ = __webpack_require__(855);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_stock_in_service__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_stock_out_service__ = __webpack_require__(854);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__stock_in_voucher_list_stock_in_voucher_list_component__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__stock_in_voucher_edit_stock_in_voucher_edit_component__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__stock_out_voucher_edit_stock_out_voucher_edit_component__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__stock_out_voucher_list_stock_out_voucher_list_component__ = __webpack_require__(860);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StockModule", function() { return StockModule; });







//import { StockInComponent } from './stock-in/stock-in.component';
//import { StockOutComponent } from './stock-out/stock-out.component';







///import { AutofocusDirective } from '../component/component.module';
var StockModule = (function () {
    function StockModule() {
    }
    return StockModule;
}());
StockModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__stock_routing_module__["a" /* StockRoutingModule */], __WEBPACK_IMPORTED_MODULE_3__component_component_module__["a" /* AlpsComponentModule */], __WEBPACK_IMPORTED_MODULE_2__theme_nga_module__["a" /* NgaModule */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["ReactiveFormsModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__stock_list_stock_list_component__["a" /* StockListComponent */], __WEBPACK_IMPORTED_MODULE_10__stock_in_voucher_list_stock_in_voucher_list_component__["a" /* StockInVoucherListComponent */], __WEBPACK_IMPORTED_MODULE_11__stock_in_voucher_edit_stock_in_voucher_edit_component__["a" /* StockInVoucherEditComponent */], __WEBPACK_IMPORTED_MODULE_12__stock_out_voucher_edit_stock_out_voucher_edit_component__["a" /* StockOutVoucherEditComponent */], __WEBPACK_IMPORTED_MODULE_13__stock_out_voucher_list_stock_out_voucher_list_component__["a" /* StockOutVoucherListComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_7__service_stock_service__["a" /* StockService */], __WEBPACK_IMPORTED_MODULE_9__service_stock_out_service__["a" /* StockOutService */], __WEBPACK_IMPORTED_MODULE_8__service_stock_in_service__["a" /* StockInService */]]
    })
], StockModule);



/***/ }),

/***/ 720:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(207);

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseCrudService; });





var BaseCrudService = (function () {
    function BaseCrudService(_http, notifier, loadingBarService, _baseUrl) {
        this._http = _http;
        this.notifier = notifier;
        this.loadingBarService = loadingBarService;
        this._baseUrl = _baseUrl;
    }
    BaseCrudService.prototype.query = function (action) {
        var _this = this;
        this.loadingBarStart();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers, body: { id: 1314 } });
        return this._http.get("/api/query/" + action, options).map(function (res) { return res.json(); }).catch(function (err) { return _this.handleError(err); })
            .do(function () { return _this.loadingBarComplete(); });
    };
    BaseCrudService.prototype.action = function (action, param) {
        var _this = this;
        this.loadingBarStart();
        var body = JSON.stringify(param);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.post(this._baseUrl + "/" + action, body, options).map(function (res) {
            res.json();
        }).catch(function (err) { return _this.handleError(err); })
            .do(function () { return _this.loadingBarComplete(); });
    };
    BaseCrudService.prototype.getlist = function () {
        var _this = this;
        this.loadingBarStart();
        return this._http.get(this._baseUrl).map(function (response) { return response.json(); }).catch(function (err) {
            return _this.handleError(err);
        }).do(function () { return _this.loadingBarComplete(); });
    };
    BaseCrudService.prototype.get = function (id) {
        var _this = this;
        this.loadingBarStart();
        return this._http.get(this._baseUrl + "/" + id).map(function (res) { return res.json(); }).catch(function (err) { return _this.handleError(err); })
            .do(function () { return _this.loadingBarComplete(); });
    };
    BaseCrudService.prototype.createAndUpdate = function (entity) {
        if (!entity.hasOwnProperty("id"))
            throw Error("不存在标识");
        if (entity.id && entity.id !== "" && entity.id !== "00000000-0000-0000-0000-000000000000") {
            return this.update(entity, entity.id);
        }
        else
            return this.create(entity);
    };
    BaseCrudService.prototype.create = function (entity) {
        var _this = this;
        this.loadingBarStart();
        if (!entity.id || entity.id === "")
            entity.id = "00000000-0000-0000-0000-000000000000";
        var body = JSON.stringify(entity);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.post(this._baseUrl, body, options).map(function (res) { return res.json(); }).catch(function (err) { return _this.handleError(err); })
            .do(function () { _this.loadingBarComplete(); _this.notifier.info("提示", "新建成功"); });
    };
    BaseCrudService.prototype.update = function (entity, id) {
        var _this = this;
        this.loadingBarStart();
        var body = JSON.stringify(entity);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.put(this._baseUrl + "/" + id, body, options).map(function (res) { return res.json(); }).catch(function (err) { return _this.handleError(err); })
            .do(function () { _this.loadingBarComplete(); _this.notifier.info("提示", "成功更新"); });
    };
    BaseCrudService.prototype.delete = function (id) {
        var _this = this;
        this.loadingBarStart();
        return this._http.delete(this._baseUrl + "/" + id).catch(function (err) { return _this.handleError(err); })
            .do(function () { _this.loadingBarComplete(); _this.notifier.info("提示", "成功删除"); });
    };
    BaseCrudService.prototype.handleError = function (error) {
        //console.info('与服务器交互失败！');
        this.loadingBarComplete();
        this.notifier.error("出错了", '与服务器交互失败！' + error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || '与服务器交互失败！');
    };
    BaseCrudService.prototype.loadingBarStart = function () {
        this.loadingBarService.start();
    };
    BaseCrudService.prototype.loadingBarComplete = function () {
        this.loadingBarService.complete();
    };
    return BaseCrudService;
}());
BaseCrudService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__["b" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_4__component_component_module__["b" /* AlpsLoadingBarService */], String])
], BaseCrudService);



/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockInService; });





var StockInService = (function (_super) {
    __extends(StockInService, _super);
    function StockInService(_http, notifier, loadingBar) {
        return _super.call(this, _http, notifier, loadingBar, "/api/StockInVouchers") || this;
    }
    return StockInService;
}(__WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__["a" /* BaseCrudService */]));
StockInService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__["b" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_4__component_component_module__["b" /* AlpsLoadingBarService */]])
], StockInService);



/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockOutService; });





var StockOutService = (function (_super) {
    __extends(StockOutService, _super);
    function StockOutService(_http, notifier, loadingBar) {
        return _super.call(this, _http, notifier, loadingBar, "/api/StockOutVouchers") || this;
    }
    return StockOutService;
}(__WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__["a" /* BaseCrudService */]));
StockOutService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__["b" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_4__component_component_module__["b" /* AlpsLoadingBarService */]])
], StockOutService);



/***/ }),

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockService; });





var StockService = (function (_super) {
    __extends(StockService, _super);
    function StockService(_http, notifier, loadingBar) {
        return _super.call(this, _http, notifier, loadingBar, "/api/stocks") || this;
    }
    return StockService;
}(__WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__["a" /* BaseCrudService */]));
StockService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__["b" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_4__component_component_module__["b" /* AlpsLoadingBarService */]])
], StockService);



/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_stock_in_service__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_config__ = __webpack_require__(907);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_notifications__ = __webpack_require__(345);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockInVoucherEditComponent; });






var StockInVoucherEditComponent = (function () {
    function StockInVoucherEditComponent(_formBuilder, _stockInService, _router, _activateRoute, notifer) {
        this._formBuilder = _formBuilder;
        this._stockInService = _stockInService;
        this._router = _router;
        this._activateRoute = _activateRoute;
        this.notifer = notifer;
        this.arrayItem = {
            id: __WEBPACK_IMPORTED_MODULE_4__admin_config__["a" /* AdminConfig */].EMPTY_GUID,
            productSkuID: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required], auxiliaryQuantity: [0, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(__WEBPACK_IMPORTED_MODULE_4__admin_config__["a" /* AdminConfig */].NUMBER_PATTERN)]], quantity: [0, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(__WEBPACK_IMPORTED_MODULE_4__admin_config__["a" /* AdminConfig */].NON_ZERO_NUMBER_PATTERN)]],
            price: ["", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(__WEBPACK_IMPORTED_MODULE_4__admin_config__["a" /* AdminConfig */].NON_ZERO_NUMBER_PATTERN)]], positionID: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required], serialNumber: ""
        };
        this.stockInForm = this._formBuilder.group({
            id: __WEBPACK_IMPORTED_MODULE_4__admin_config__["a" /* AdminConfig */].EMPTY_GUID, departmentID: [null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]], sourceID: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required], status: 0,
            items: this._formBuilder.array([])
        });
    }
    StockInVoucherEditComponent.prototype.getItems = function () {
        return this.stockInForm.get("items");
    };
    StockInVoucherEditComponent.prototype.addItem = function () {
        this.getItems().push(this._formBuilder.group(this.arrayItem));
    };
    StockInVoucherEditComponent.prototype.removeItem = function (i) {
        if (confirm("确定要删除？"))
            this.getItems().removeAt(i);
    };
    StockInVoucherEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._stockInService.query("SupplierOptions").subscribe(function (data) {
            _this.supllierOptions = data;
        });
        this._stockInService.query("ProductSkuOptions").subscribe(function (data) {
            _this.productSkuOptions = data;
        });
        this._stockInService.query("DepartmentOptions").subscribe(function (data) {
            _this.departmentOptions = data;
        });
        this._stockInService.query("PositionOptions").subscribe(function (data) {
            _this.positionOptions = data;
        });
        this._stockInService.query("TradeAccountOptions").subscribe(function (data) {
            _this.supllierOptions = data;
            _this.departmentOptions = data;
        });
        var id = this._activateRoute.snapshot.params["id"];
        if (id) {
            this._stockInService.get(id).subscribe(function (data) {
                _this.loadDto(data);
            });
        }
        //this.stockInForm.get("id").disable();
        //console.info(this.stockInForm);
    };
    StockInVoucherEditComponent.prototype.loadDto = function (data) {
        for (var i = this.getItems().length; i < data.items.length; i++)
            this.addItem();
        for (var i = this.getItems().length; i > data.items.length; i--)
            this.getItems().removeAt(i - 1);
        this.stockInForm.setValue(data);
    };
    StockInVoucherEditComponent.prototype.save = function () {
        var _this = this;
        if (this.stockInForm.valid) {
            this._stockInService.createAndUpdate(this.stockInForm.value).subscribe(function (data) {
                _this.loadDto(data);
            });
        }
        else
            this.notifer.warn("提示", "单据有错误，请检查");
    };
    StockInVoucherEditComponent.prototype.del = function () {
        this._stockInService.delete(this.stockInForm.value["id"]).subscribe();
    };
    StockInVoucherEditComponent.prototype.submit = function () {
        this._stockInService.action("Submit/" + this.stockInForm.value["id"]).subscribe();
    };
    StockInVoucherEditComponent.prototype.back = function () {
        this._router.navigate(['/admin/stock/stockinlist']);
    };
    StockInVoucherEditComponent.prototype.hasID = function () {
        return this.stockInForm && this.stockInForm.controls["id"] && this.stockInForm.controls["id"].value !== __WEBPACK_IMPORTED_MODULE_4__admin_config__["a" /* AdminConfig */].EMPTY_GUID;
    };
    return StockInVoucherEditComponent;
}());
StockInVoucherEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'stock-in-voucher-edit',
        template: __webpack_require__(1057),
        styles: [__webpack_require__(1056)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__service_stock_in_service__["a" /* StockInService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_5_angular2_notifications__["b" /* NotificationsService */]])
], StockInVoucherEditComponent);



/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_component_module__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_stock_in_service__ = __webpack_require__(751);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockInVoucherListComponent; });



//import { StockInVoucherListDto } from '../../model/stockinvouchermodels';
var StockInVoucherListComponent = (function () {
    function StockInVoucherListComponent(_stockInService) {
        this._stockInService = _stockInService;
        var settings = new __WEBPACK_IMPORTED_MODULE_1__component_component_module__["c" /* TableSetting */]("");
        settings.addColumn("createTime", "创建时间", "datetime").addColumn("source", "来源").addColumn("department", "入库部门")
            .addColumn("totalAuxiliaryQuantity", "总辅助数量").addColumn("totalQuantity", "总数量").addColumn("totalAmount", "总金额").addColumn("confirmer", "提交人")
            .addColumn("confirmTime", "提交时间", 'datetime').addColumn("status", "状态").addHeaderLink("/admin/stock/stockin", "ion-plus").addRowAction("/admin/stock/stockin", "ion-edit");
        this.tableSettings = settings;
    }
    StockInVoucherListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._stockInService.getlist().subscribe(function (data) { return _this.source = data; });
    };
    return StockInVoucherListComponent;
}());
StockInVoucherListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'stock-in-voucher-list',
        template: __webpack_require__(1059),
        styles: [__webpack_require__(1058)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__service_stock_in_service__["a" /* StockInService */]])
], StockInVoucherListComponent);



/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_stock_service__ = __webpack_require__(855);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockListComponent; });



var StockListComponent = (function () {
    function StockListComponent(_stockService) {
        this._stockService = _stockService;
        var setting = new __WEBPACK_IMPORTED_MODULE_2__component_component_module__["c" /* TableSetting */]("");
        setting.addColumn("name", "品名").addColumn("quantity", "数量").addColumn("auxiliaryQuantity", "辅助数量")
            .addColumn("position", "仓库");
        this.tableSettings = setting;
    }
    StockListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._stockService.getlist().subscribe(function (data) {
            _this.source = data;
        });
    };
    return StockListComponent;
}());
StockListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'stock-list',
        template: __webpack_require__(1061),
        styles: [__webpack_require__(1060)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_stock_service__["a" /* StockService */]])
], StockListComponent);



/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_stock_out_service__ = __webpack_require__(854);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockOutVoucherEditComponent; });



var StockOutVoucherEditComponent = (function () {
    function StockOutVoucherEditComponent(_formBuilder, _stockOutService) {
        this._formBuilder = _formBuilder;
        this._stockOutService = _stockOutService;
        this.item = {
            id: "",
            skuid: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            quantity: [null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern("[1-9][0-9]*[.]{0,1}[0-9]*")]],
            price: [null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern("[1-9][0-9]*[.]{0,1}[0-9]*")]]
            //amount: ""
        };
        this.stockOutForm = this._formBuilder.group({
            departmentID: [null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]], supplierID: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            items: this._formBuilder.array([])
        });
    }
    StockOutVoucherEditComponent.prototype.getItems = function () {
        return this.stockOutForm.get("items");
    };
    StockOutVoucherEditComponent.prototype.addItem = function () {
        this.getItems().push(this._formBuilder.group(this.item));
    };
    StockOutVoucherEditComponent.prototype.removeItem = function (i) {
        if (confirm("确定要删除？"))
            this.getItems().removeAt(i);
    };
    StockOutVoucherEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._stockOutService.query("SupplierOptions").subscribe(function (data) {
            _this.supllierOptions = data;
        });
        this._stockOutService.query("ProductSkuOptions").subscribe(function (data) {
            _this.productskuOptions = data;
        });
        this._stockOutService.query("DepartmentOptions").subscribe(function (data) {
            _this.departmentOptions = data;
        });
    };
    return StockOutVoucherEditComponent;
}());
StockOutVoucherEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'stock-out-voucher-edit',
        template: __webpack_require__(1063),
        styles: [__webpack_require__(1062)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__service_stock_out_service__["a" /* StockOutService */]])
], StockOutVoucherEditComponent);



/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockOutVoucherListComponent; });

var StockOutVoucherListComponent = (function () {
    function StockOutVoucherListComponent() {
    }
    StockOutVoucherListComponent.prototype.ngOnInit = function () {
    };
    return StockOutVoucherListComponent;
}());
StockOutVoucherListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'stock-out-voucher-list',
        template: __webpack_require__(1065),
        styles: [__webpack_require__(1064)]
    }),
    __metadata("design:paramtypes", [])
], StockOutVoucherListComponent);



/***/ }),

/***/ 907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminConfig; });
var AdminConfig = (function () {
    function AdminConfig() {
    }
    return AdminConfig;
}());

AdminConfig.NON_ZERO_NUMBER_PATTERN = "[1-9][0-9]*[.]{0,1}[0-9]*";
AdminConfig.NUMBER_PATTERN = "[0-9]*[.]{0,1}[0-9]*";
AdminConfig.EMPTY_GUID = "00000000-0000-0000-0000-000000000000";


/***/ }),

/***/ 928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stock_list_stock_list_component__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stock_in_voucher_list_stock_in_voucher_list_component__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stock_in_voucher_edit_stock_in_voucher_edit_component__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stock_out_voucher_list_stock_out_voucher_list_component__ = __webpack_require__(860);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__stock_out_voucher_edit_stock_out_voucher_edit_component__ = __webpack_require__(859);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockRoutingModule; });



//import { StockInComponent } from './stock-in/stock-in.component';
//import { StockOutComponent } from './stock-out/stock-out.component';




var routes = [
    { path: '', redirectTo: 'stocklist', pathMatch: 'full' },
    { path: 'stocklist', component: __WEBPACK_IMPORTED_MODULE_2__stock_list_stock_list_component__["a" /* StockListComponent */] },
    { path: 'stockin', component: __WEBPACK_IMPORTED_MODULE_4__stock_in_voucher_edit_stock_in_voucher_edit_component__["a" /* StockInVoucherEditComponent */] },
    { path: 'stockin/:id', component: __WEBPACK_IMPORTED_MODULE_4__stock_in_voucher_edit_stock_in_voucher_edit_component__["a" /* StockInVoucherEditComponent */] },
    { path: 'stockinlist', component: __WEBPACK_IMPORTED_MODULE_3__stock_in_voucher_list_stock_in_voucher_list_component__["a" /* StockInVoucherListComponent */] },
    { path: 'stockoutlist', component: __WEBPACK_IMPORTED_MODULE_5__stock_out_voucher_list_stock_out_voucher_list_component__["a" /* StockOutVoucherListComponent */] },
    { path: 'stockout', component: __WEBPACK_IMPORTED_MODULE_6__stock_out_voucher_edit_stock_out_voucher_edit_component__["a" /* StockOutVoucherEditComponent */] },
    { path: 'stockout/:id', component: __WEBPACK_IMPORTED_MODULE_6__stock_out_voucher_edit_stock_out_voucher_edit_component__["a" /* StockOutVoucherEditComponent */] }
];
var StockRoutingModule = (function () {
    function StockRoutingModule() {
    }
    return StockRoutingModule;
}());
StockRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
    })
], StockRoutingModule);



/***/ })

});
//# sourceMappingURL=9.chunk.js.map