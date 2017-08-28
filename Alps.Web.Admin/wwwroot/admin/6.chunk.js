webpackJsonpac__name_([6],{

/***/ 1038:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1039:
/***/ (function(module, exports) {

module.exports = "<p>\n  catagory-edit works!\n</p>\n"

/***/ }),

/***/ 1040:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1041:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <!--<ba-card title=\"类别选择\">\r\n    <alps-selector [options]=\"productOptions\" [(ngModel)]=\"selectedProductID\" (ngModelChange)=\"onProductIDChanged()\"></alps-selector>\r\n  </ba-card>-->\n  <ba-card>\r\n      <a  routerLink=\"/admin/product/catagorylist/\" style=\"color:#fff;\">所有</a>&gt;&gt;\r\n    <span *ngFor=\"let path of catagoryPath\">\r\n      <a routerLink=\"/admin/product/catagorylist/{{path.id}}\" style=\"color:#fff;\">{{path.name}}</a>&gt;&gt;\r\n    </span>\n  </ba-card>\r\n  <ba-card title=\"物品列表\">\n  <table class=\"table  table-hover\">\n  <thead>\n    <tr>\r\n      <th>名称</th>\r\n      <th><a routerLink=\"/admin/product/catagoryedit\" class=\"table-action-add\" ><i class=\"ion ion-plus\"></i></a></th>\r\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of tableSource\">\r\n      <td>{{row.name}}</td>\r\n      <td><a routerLink=\"/admin/product/catagorylist/{{row.id}}\" [queryParams]=\"{parentID:{{row.id}}}\" class=\"table-action-edit\"><i class=\"ion ion-navicon\"></i></a></td>\r\n    </tr>\n  </tbody>\n  </table>\n\r\n    <!--<alps-list-table [settings]=\"tableSettings\" [source]=\"tableSource\"></alps-list-table>-->\r\n  </ba-card>\r\n</div>"

/***/ }),

/***/ 1042:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1043:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <ba-card>\r\n    <form [formGroup]=\"myform\" (ngSubmit)=\"onSubmit(myform)\">\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">品名</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"请输入品名\" class=\"form-control\" formControlName=\"name\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">全称</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"请输入全称\" class=\"form-control\" formControlName=\"fullName\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">简介</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"请输入简介\" class=\"form-control\" formControlName=\"shortDescription\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">描述</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"请输入描述\" class=\"form-control\" formControlName=\"fullDescription\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">已删除</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"已删除\" class=\"form-control\" formControlName=\"deprecated\" type=\"checkbox\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">启用辅助数量</label>\r\n        <div class=\"col-md-11\">\r\n          <input class=\"form-control\" formControlName=\"enableAuxiliaryQuantity\" type=\"checkbox\" />\r\n        </div>\r\n      </div>\r\n      <button class=\"btn\" type=\"submit\">保存</button>\r\n      <!--<div class=\"form-group\">\r\n        <label for=\"name\">简介</label>\r\n        <div class=\"col-md-11\">\r\n          <input id=\"shortDescription\" name=\"shortDescription\" placeholder=\"请输入简介\" class=\"form-control\" [(ngModel)]=\"product.shortDescription\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">描述</label>\r\n        <div class=\"col-md-11\">\r\n          <input id=\"fullDescription\" name=\"fullDescription\" placeholder=\"请输入描述\" class=\"form-control\" [(ngModel)]=\"product.fullDescription\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">已删除</label>\r\n        <div class=\"col-md-11\">\r\n          <input id=\"Deprecated\" name=\"Deprecated\" placeholder=\"已删除\" class=\"form-control\" [(ngModel)]=\"product.Deprecated\" type=\"checkbox\" />\r\n        </div>\r\n      </div>-->\r\n    </form>\r\n  </ba-card>\r\n  <hr />\r\n  {{myform.value|json}}\r\n</div>"

/***/ }),

/***/ 1044:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1045:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <ba-card title=\"物品列表\">\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"initDatabase()\">初始化数据库</button>\r\n  </ba-card>\r\n</div>\n\n<div class=\"widgets\">\n<ba-card title=\"物品列表\">\n<alps-list-table [settings]=\"tableSettings\" [source]=\"tableSource\" ></alps-list-table>\n</ba-card>\n</div>"

/***/ }),

/***/ 1046:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1047:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <ba-card>\r\n    <form [formGroup]=\"mainform\" (ngSubmit)=\"onSubmit(mainform)\">\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">品名</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"请输入品名\" class=\"form-control\" formControlName=\"name\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">所属产品</label>\r\n        <div class=\"col-md-11\">\r\n          <alps-selector formControlName=\"productID\" [options]=\"productOptions\"></alps-selector>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">简介</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"请输入简介\" class=\"form-control\" formControlName=\"description\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">辅助数量</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"辅助数量\" class=\"form-control\" formControlName=\"auxiliaryQuantity\" />\r\n\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">数量</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"数量\" class=\"form-control\" formControlName=\"quantity\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"name\">定价</label>\r\n        <div class=\"col-md-11\">\r\n          <input placeholder=\"定价\" class=\"form-control\" formControlName=\"price\" />\r\n\r\n        </div>\n        </div>\r\n    </form>\r\n  </ba-card>\n  <ba-card class=\"form-action-group\">\n    <button class=\"btn btn-default \" type=\"button\" (click)=\"onSubmit(mainform)\">保存</button>&nbsp;&nbsp;&nbsp;<button class=\"btn btn-default \" (click)=\"back()\" type=\"button\">返回</button>\n  </ba-card>\r\n  <hr />\r\n  {{mainform.value|json}}\r\n</div>"

/***/ }),

/***/ 1048:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1049:
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <ba-card title=\"类别选择\">\n  <alps-selector [options]=\"productOptions\" [(ngModel)]=\"selectedProductID\" (ngModelChange)=\"onProductIDChanged()\" ></alps-selector>\r\n  </ba-card>\r\n  <ba-card title=\"物品列表\">\r\n    <alps-list-table [settings]=\"tableSettings\" [source]=\"tableSource\"></alps-list-table>\r\n  </ba-card>\r\n</div>"

/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_routing_module__ = __webpack_require__(926);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__product_list_product_list_component__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_component_module__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__theme_nga_module__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__product_edit_product_edit_component__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__productsku_list_productsku_list_component__ = __webpack_require__(849);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__productsku_edit_productsku_edit_component__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_product_service__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_productsku_service__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__catagory_edit_catagory_edit_component__ = __webpack_require__(844);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__catagory_list_catagory_list_component__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_catagory_service__ = __webpack_require__(850);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductModule", function() { return ProductModule; });















var ProductModule = (function () {
    function ProductModule() {
    }
    return ProductModule;
}());
ProductModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__product_routing_module__["a" /* ProductRoutingModule */], __WEBPACK_IMPORTED_MODULE_5__component_component_module__["a" /* AlpsComponentModule */], __WEBPACK_IMPORTED_MODULE_6__theme_nga_module__["a" /* NgaModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__product_list_product_list_component__["a" /* ProductListComponent */], __WEBPACK_IMPORTED_MODULE_7__product_edit_product_edit_component__["a" /* ProductEditComponent */], __WEBPACK_IMPORTED_MODULE_8__productsku_list_productsku_list_component__["a" /* ProductskuListComponent */], __WEBPACK_IMPORTED_MODULE_9__productsku_edit_productsku_edit_component__["a" /* ProductskuEditComponent */], __WEBPACK_IMPORTED_MODULE_12__catagory_edit_catagory_edit_component__["a" /* CatagoryEditComponent */], __WEBPACK_IMPORTED_MODULE_13__catagory_list_catagory_list_component__["a" /* CatagoryListComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_10__services_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_11__services_productsku_service__["a" /* ProductskuService */], __WEBPACK_IMPORTED_MODULE_14__services_catagory_service__["a" /* CatagoryService */]]
    })
], ProductModule);



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

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductService; });





var ProductService = (function (_super) {
    __extends(ProductService, _super);
    function ProductService(http, notifer, loadingBar) {
        return _super.call(this, http, notifer, loadingBar, "/api/products") || this;
        //super("api/product");
    }
    return ProductService;
}(__WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__["a" /* BaseCrudService */]));
ProductService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__["b" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_4__component_component_module__["b" /* AlpsLoadingBarService */]])
], ProductService);



/***/ }),

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_component_module__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(98);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductskuService; });





var ProductskuService = (function (_super) {
    __extends(ProductskuService, _super);
    function ProductskuService(http, notifer, loadingBar) {
        return _super.call(this, http, notifer, loadingBar, "/api/productskus") || this;
    }
    ProductskuService.prototype.getListByProduct = function (productID) {
        var _this = this;
        this.loadingBarStart();
        return this._http.get(this._baseUrl + "/GetListByProduct/" + productID).map(function (res) { return res.json(); }).catch(function (err) { return _this.handleError(err); })
            .do(function () { return _this.loadingBarComplete(); });
    };
    return ProductskuService;
}(__WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__["a" /* BaseCrudService */]));
ProductskuService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2_angular2_notifications__["b" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_3__component_component_module__["b" /* AlpsLoadingBarService */]])
], ProductskuService);



/***/ }),

/***/ 844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CatagoryEditComponent; });

var CatagoryEditComponent = (function () {
    function CatagoryEditComponent() {
    }
    CatagoryEditComponent.prototype.ngOnInit = function () {
    };
    return CatagoryEditComponent;
}());
CatagoryEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'catagory-edit',
        template: __webpack_require__(1039),
        styles: [__webpack_require__(1038)]
    }),
    __metadata("design:paramtypes", [])
], CatagoryEditComponent);



/***/ }),

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_component_module__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_catagory_service__ = __webpack_require__(850);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CatagoryListComponent; });




var CatagoryListComponent = (function () {
    function CatagoryListComponent(_catagoryService, _activatedRoute) {
        this._catagoryService = _catagoryService;
        this._activatedRoute = _activatedRoute;
        var settings = new __WEBPACK_IMPORTED_MODULE_1__component_component_module__["c" /* TableSetting */]("/admin/product");
        settings.addColumn("name", "品名").addColumn("fullName", "全称").addColumn("shortDescription", "简介")
            .addColumn("fullDescription", "描述").addDefaultAddAction().addDefaultEditAction()
            .addRowAction("/admin/product/catagorylist", "ion-navicon");
        this.tableSettings = settings;
    }
    CatagoryListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._activatedRoute.params.subscribe(function (params) {
            console.info(_this._activatedRoute.snapshot.queryParams);
            var id = params["id"];
            if (!id) {
                id = "";
            }
            _this._catagoryService.GetListByParentID(id).subscribe(function (data) {
                _this.catagoryPath = data.path;
                _this.tableSource = data.data;
            });
        });
    };
    return CatagoryListComponent;
}());
CatagoryListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'catagory-list',
        template: __webpack_require__(1041),
        styles: [__webpack_require__(1040)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_catagory_service__["a" /* CatagoryService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]])
], CatagoryListComponent);



/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_product_service__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_ProductModels__ = __webpack_require__(925);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductEditComponent; });





var ProductEditComponent = (function () {
    function ProductEditComponent(_productService, _activatedRoute, formBuilder) {
        this._productService = _productService;
        this._activatedRoute = _activatedRoute;
        this.formBuilder = formBuilder;
        this.myform = this.formBuilder.group({
            id: [], name: [], fullName: [], shortDescription: [], fullDescription: [], deprecated: [], enableAuxiliaryQuantity: []
        });
    }
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._activatedRoute.snapshot.params["id"];
        if (id) {
            this._productService.get(id).subscribe(function (data) {
                _this.myform.setValue(data);
            });
        }
        else
            this.myform.setValue(new __WEBPACK_IMPORTED_MODULE_3__model_ProductModels__["a" /* ProductEditDto */]());
    };
    ProductEditComponent.prototype.onSubmit = function (form) {
        if (form.valid)
            alert(JSON.stringify(form.value));
    };
    return ProductEditComponent;
}());
ProductEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'product-edit',
        template: __webpack_require__(1043),
        styles: [__webpack_require__(1042)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"]])
], ProductEditComponent);



/***/ }),

/***/ 847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_product_service__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductListComponent; });



var ProductListComponent = (function () {
    function ProductListComponent(_productService) {
        this._productService = _productService;
        var settings = new __WEBPACK_IMPORTED_MODULE_2__component_component_module__["c" /* TableSetting */]("/admin/product");
        settings.addColumn("name", "品名").addColumn("fullName", "全称").addColumn("shortDescription", "简介")
            .addColumn("fullDescription", "描述").addDefaultAddAction().addDefaultEditAction();
        this.tableSettings = settings;
    }
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._productService.getlist().subscribe(function (data) {
            _this.tableSource = data;
        });
    };
    ProductListComponent.prototype.initDatabase = function () {
        this._productService.query("InitDatabase").subscribe();
    };
    return ProductListComponent;
}());
ProductListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'product-list',
        template: __webpack_require__(1045),
        styles: [__webpack_require__(1044)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_product_service__["a" /* ProductService */]])
], ProductListComponent);



/***/ }),

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_productsku_service__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductskuEditComponent; });




var ProductskuEditComponent = (function () {
    function ProductskuEditComponent(_productskuService, _activatedRoute, _router, _formBuilder) {
        this._productskuService = _productskuService;
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._formBuilder = _formBuilder;
        //this.productsku = new ProductskuEditDto();
        this.mainform = this._formBuilder.group({
            id: "",
            name: ["", [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required]], productID: ["", [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required]], description: "", auxiliaryQuantity: "0", quantity: "0", price: ["", [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern("[0-9]+")]]
        });
    }
    ProductskuEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._activatedRoute.snapshot.params["id"];
        if (id) {
            this._productskuService.get(id).subscribe(function (data) {
                _this.mainform.setValue(data);
            });
        }
        this._productskuService.query("ProductOptions").subscribe(function (data) { return _this.productOptions = data; });
    };
    ProductskuEditComponent.prototype.onSubmit = function (form) {
        if (form.valid) {
            this._productskuService.createAndUpdate(form.value).subscribe();
        }
        else
            alert("验证失败");
    };
    ProductskuEditComponent.prototype.back = function () {
        this._router.navigate(["/admin/product/skulist"]);
    };
    return ProductskuEditComponent;
}());
ProductskuEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'productsku-edit',
        template: __webpack_require__(1047),
        styles: [__webpack_require__(1046)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_productsku_service__["a" /* ProductskuService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]])
], ProductskuEditComponent);



/***/ }),

/***/ 849:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_productsku_service__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductskuListComponent; });



var ProductskuListComponent = (function () {
    function ProductskuListComponent(_productskuService) {
        this._productskuService = _productskuService;
        var settings = new __WEBPACK_IMPORTED_MODULE_2__component_component_module__["c" /* TableSetting */]("/admin/product/sku");
        settings.addColumn("name", "Sku名").addColumn("fullName", "全名").addColumn("productName", "产品名").addColumn("description", "简介")
            .addColumn("auxiliaryQuantity", "辅助数量").addColumn("quantity", "数量").addColumn("price", "价格")
            .addColumn("createdTime", "创建时间", 'date').addColumn("modifiedTime", "修改时间", 'date')
            .addRowAction("/admin/product/skuedit/", "ion-edit").addDefaultDeleteAction().addHeaderLink("/admin/product/skuedit", "ion-plus");
        this.tableSettings = settings;
    }
    ProductskuListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._productskuService.query("ProductOptions").subscribe(function (data) {
            _this.productOptions = data;
        });
    };
    ProductskuListComponent.prototype.onProductIDChanged = function () {
        var _this = this;
        this._productskuService.getListByProduct(this.selectedProductID).subscribe(function (data) {
            _this.tableSource = data;
        });
    };
    return ProductskuListComponent;
}());
ProductskuListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'productsku-list',
        template: __webpack_require__(1049),
        styles: [__webpack_require__(1048)]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_productsku_service__["a" /* ProductskuService */]])
], ProductskuListComponent);



/***/ }),

/***/ 850:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_component_module__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CatagoryService; });





var CatagoryService = (function (_super) {
    __extends(CatagoryService, _super);
    function CatagoryService(http, notifer, loadingBar) {
        return _super.call(this, http, notifer, loadingBar, "/api/catagories") || this;
        //super("api/product");
    }
    CatagoryService.prototype.GetListByParentID = function (id) {
        var _this = this;
        this.loadingBarStart();
        return this._http.get(this._baseUrl + "/GetListByParentID/" + id).map(function (res) { return res.json(); }).catch(function (err) { return _this.handleError(err); })
            .do(function () { return _this.loadingBarComplete(); });
    };
    return CatagoryService;
}(__WEBPACK_IMPORTED_MODULE_1__service_base_crud_service__["a" /* BaseCrudService */]));
CatagoryService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__["b" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_4__component_component_module__["b" /* AlpsLoadingBarService */]])
], CatagoryService);



/***/ }),

/***/ 925:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CatagoryListDto */
/* unused harmony export ProductListDto */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductEditDto; });
/* unused harmony export ProductskuListDto */
/* unused harmony export ProductskuEditDto */
//module Alps.Web.Models {
var CatagoryListDto = (function () {
    function CatagoryListDto() {
        // NAME
        this.name = null;
        // ID
        this.id = "00000000-0000-0000-0000-000000000000";
    }
    return CatagoryListDto;
}());

var ProductListDto = (function () {
    function ProductListDto() {
        // ID
        this.id = "00000000-0000-0000-0000-000000000000";
        // NAME
        this.name = null;
        // FULLNAME
        this.fullName = null;
        // SHORTDESCRIPTION
        this.shortDescription = null;
        // FULLDESCRIPTION
        this.fullDescription = null;
        // DEPRECATED
        this.deprecated = false;
        // ENABLEAUXILIARYQUANTITY
        this.enableAuxiliaryQuantity = false;
    }
    return ProductListDto;
}());

var ProductEditDto = (function () {
    function ProductEditDto() {
        // ID
        this.id = "00000000-0000-0000-0000-000000000000";
        // NAME
        this.name = null;
        // FULLNAME
        this.fullName = null;
        // SHORTDESCRIPTION
        this.shortDescription = null;
        // FULLDESCRIPTION
        this.fullDescription = null;
        // DEPRECATED
        this.deprecated = false;
        // ENABLEAUXILIARYQUANTITY
        this.enableAuxiliaryQuantity = false;
    }
    return ProductEditDto;
}());

var ProductskuListDto = (function () {
    function ProductskuListDto() {
        // ID
        this.id = "00000000-0000-0000-0000-000000000000";
        // NAME
        this.name = null;
        // PRODUCTNAME
        this.productName = null;
        // DESCRIPTION
        this.description = null;
        // AUXILIARYQUANTITY
        this.auxiliaryQuantity = 0;
        // QUANTITY
        this.quantity = 0;
        // PRICE
        this.price = 0;
        // CREATEDTIME
        this.createdTime = new Date(0);
        // MODIFIEDTIME
        this.modifiedTime = new Date(0);
    }
    return ProductskuListDto;
}());

var ProductskuEditDto = (function () {
    function ProductskuEditDto() {
        // ID
        this.id = null;
        // NAME
        this.name = null;
        // PRODUCTID
        this.productID = "00000000-0000-0000-0000-000000000000";
        // DESCRIPTION
        this.description = null;
        // AUXILIARYQUANTITY
        this.auxiliaryQuantity = 0;
        // QUANTITY
        this.quantity = 0;
        // PRICE
        this.price = 0;
    }
    return ProductskuEditDto;
}());

//} 


/***/ }),

/***/ 926:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_list_product_list_component__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_edit_product_edit_component__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__productsku_list_productsku_list_component__ = __webpack_require__(849);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__productsku_edit_productsku_edit_component__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__catagory_list_catagory_list_component__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__catagory_edit_catagory_edit_component__ = __webpack_require__(844);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductRoutingModule; });








var routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_2__product_list_product_list_component__["a" /* ProductListComponent */] },
    { path: 'edit', component: __WEBPACK_IMPORTED_MODULE_3__product_edit_product_edit_component__["a" /* ProductEditComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_3__product_edit_product_edit_component__["a" /* ProductEditComponent */] },
    { path: 'skulist', component: __WEBPACK_IMPORTED_MODULE_4__productsku_list_productsku_list_component__["a" /* ProductskuListComponent */] },
    { path: 'skuedit', component: __WEBPACK_IMPORTED_MODULE_5__productsku_edit_productsku_edit_component__["a" /* ProductskuEditComponent */] },
    { path: 'skuedit/:id', component: __WEBPACK_IMPORTED_MODULE_5__productsku_edit_productsku_edit_component__["a" /* ProductskuEditComponent */] },
    { path: 'catagorylist/:id', component: __WEBPACK_IMPORTED_MODULE_6__catagory_list_catagory_list_component__["a" /* CatagoryListComponent */] },
    { path: 'catagorylist', redirectTo: 'catagorylist/', pathMatch: 'full' },
    { path: 'catagorydit', component: __WEBPACK_IMPORTED_MODULE_7__catagory_edit_catagory_edit_component__["a" /* CatagoryEditComponent */] },
    { path: 'catagoryedit/:id', component: __WEBPACK_IMPORTED_MODULE_7__catagory_edit_catagory_edit_component__["a" /* CatagoryEditComponent */] }
];
var ProductRoutingModule = (function () {
    function ProductRoutingModule() {
    }
    return ProductRoutingModule;
}());
ProductRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
    })
], ProductRoutingModule);



/***/ })

});
//# sourceMappingURL=6.chunk.js.map