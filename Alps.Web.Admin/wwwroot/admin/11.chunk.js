webpackJsonpac__name_([11],{

/***/ 1066:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1067:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <form>\r\n    <ba-card title=\"基本资料\">\r\n      <div class=\"row\">\r\n        <div class=\"form-group col-sm-3\">\r\n          <label for=\"name\">名称:</label>\n          <input type=\"text\" id=\"name\" placeholder=\"请输入供应商名称\" class=\"form-control\" name=\"name\" [(ngModel)]=\"supplier.name\"/>\r\n          <!--<alps-selector id=\"FF\" [(value)]=\"selectedItem\" [selectSource]=\"selectSource\"></alps-selector>-->\r\n        </div>\n        <div class=\"form-group col-sm-3\">\r\n          <label for=\"zone\">所属区域:</label>\r\n          <input type=\"text\" id=\"zone\" placeholder=\"请输入所属区域\" class=\"form-control\" name=\"zone\" [(ngModel)]=\"supplier.zone\" />\r\n          <!--<alps-selector id=\"FF\" [(value)]=\"selectedItem\" [selectSource]=\"selectSource\"></alps-selector>-->\r\n        </div>\n        <div class=\"form-group col-sm-3\">\r\n          <label for=\"shortname\">简称:</label>\r\n          <input type=\"text\" id=\"shortname\" placeholder=\"请输入供应商简称\" class=\"form-control\" name=\"shortname\" [(ngModel)]=\"supplier.shortname\" />\r\n          <!--<alps-selector id=\"FF\" [(value)]=\"selectedItem\" [selectSource]=\"selectSource\"></alps-selector>-->\r\n        </div>\r\n      </div>\r\n    </ba-card>\r\n   </form>\r\n</div>\r\n"

/***/ }),

/***/ 1068:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1069:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"widgets\">\r\n  <ba-card title=\"供应商\">\r\n    <alps-list-table [settings]=\"tableSettings\" [source]=\"items\"></alps-list-table>\r\n  </ba-card>\n  </div>\r\n"

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__theme_nga_module__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__supplier_routing_module__ = __webpack_require__(929);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__supplier_list_supplier_list_component__ = __webpack_require__(862);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__supplier_edit_supplier_edit_component__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_component_module__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__supplier_service__ = __webpack_require__(752);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierModule", function() { return SupplierModule; });









var SupplierModule = (function () {
    function SupplierModule() {
    }
    return SupplierModule;
}());
SupplierModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__supplier_routing_module__["a" /* SupplierRoutingModule */], __WEBPACK_IMPORTED_MODULE_7__component_component_module__["a" /* AlpsComponentModule */], __WEBPACK_IMPORTED_MODULE_2__theme_nga_module__["a" /* NgaModule */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__supplier_list_supplier_list_component__["a" /* SupplierListComponent */], __WEBPACK_IMPORTED_MODULE_6__supplier_edit_supplier_edit_component__["a" /* SupplierEditComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_8__supplier_service__["a" /* SupplierService */]]
    })
], SupplierModule);



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

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierService; });





var SupplierService = (function (_super) {
    __extends(SupplierService, _super);
    function SupplierService(_http, notifier, loadingBar) {
        return _super.call(this, _http, notifier, loadingBar, "/api/suppliers") || this;
    }
    return SupplierService;
}(__WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__["a" /* BaseCrudService */]));
SupplierService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__["b" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_4__component_component_module__["b" /* AlpsLoadingBarService */]])
], SupplierService);



/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__supplier_service__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierEditComponent; });



var SupplierEditComponent = (function () {
    function SupplierEditComponent(supplierService, _activatedRoute) {
        this.supplierService = supplierService;
        this._activatedRoute = _activatedRoute;
        this.supplier = {};
    }
    SupplierEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var supplierID = this._activatedRoute.snapshot.params["id"];
        if (supplierID) {
            this.sub = this.supplierService.get(supplierID).subscribe(function (data) {
                _this.supplier = data;
            });
        }
        else {
            //this.purchaseOrder = new PurchaseOrderForEdit();
            //this.source = new LocalDataSource(this.purchaseOrder.items);
        }
    };
    return SupplierEditComponent;
}());
SupplierEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'supplier-edit',
        template: __webpack_require__(1067),
        styles: [__webpack_require__(1066)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__supplier_service__["a" /* SupplierService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]])
], SupplierEditComponent);



/***/ }),

/***/ 862:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__supplier_service__ = __webpack_require__(752);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierListComponent; });


var SupplierListComponent = (function () {
    function SupplierListComponent(_supplierService) {
        this._supplierService = _supplierService;
        this.tableSettings = {
            columns: [{ id: "id", title: "ID" }, { id: "name", title: "姓名" }],
            actions: { baseUrl: "/admin/supplier" }
        };
    }
    SupplierListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._supplierService.getlist().subscribe(function (data) {
            _this.items = data;
        });
    };
    return SupplierListComponent;
}());
SupplierListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'supplier-list',
        template: __webpack_require__(1069),
        styles: [__webpack_require__(1068)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__supplier_service__["a" /* SupplierService */]])
], SupplierListComponent);



/***/ }),

/***/ 929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supplier_list_supplier_list_component__ = __webpack_require__(862);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__supplier_edit_supplier_edit_component__ = __webpack_require__(861);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierRoutingModule; });




var routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_2__supplier_list_supplier_list_component__["a" /* SupplierListComponent */] },
    { path: 'edit', component: __WEBPACK_IMPORTED_MODULE_3__supplier_edit_supplier_edit_component__["a" /* SupplierEditComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_3__supplier_edit_supplier_edit_component__["a" /* SupplierEditComponent */] }
];
var SupplierRoutingModule = (function () {
    function SupplierRoutingModule() {
    }
    return SupplierRoutingModule;
}());
SupplierRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
    })
], SupplierRoutingModule);



/***/ })

});
//# sourceMappingURL=11.chunk.js.map