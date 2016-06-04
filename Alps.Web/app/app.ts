/// <reference path="../scripts/_all.ts" />
module Alps {
    'use strict';
    export interface IRootScope {
        msg: string;
        gridOptions: uiGrid.IGridOptions;
        list(): void;
        add(): void;
        del(row): void;
        gridApi: uiGrid.IGridApi;
        ds: any;
        initialDatabase(): void;
    }
    export class ModalCtrl {

    }
    export class RootCtrl {
        public static $inject = ["$scope", "$rootScope", "toaster", "$animate", "$document", "$http"];
        constructor(scope: IRootScope, rootScope, toaster, animate: ng.animate.IAnimateService, document: ng.IDocumentService, http: ng.IHttpService) {
            document.bind("keypress", function (event) {
                if (event.keyCode == 13) {
                    event.keyCode = 9;
                    
                    //var el =document.next(event.srcElement);
                    //if (el.type != 'hidden')
                    //    el.focus();
                    //else
                    //    while (el.type == 'hidden')
                    //        el = getNextElement(el);
                    //el.focus();
                }
            });
            scope.initialDatabase = function () {
                http.post("/Api/SystemMgr/InitialDatabase", {}).success(function (data) {
                    toaster.success("提示", "完成初始化");
                }).error(function (data) {
                    toaster.error("提示", data);
                });
            }
            //scope.ds =[{ "ID": 1, "name": "Amei" }, { "ID": 2, "name": "Winsan" }];
            //var gridOption: uiGrid.IGridOptions = <uiGrid.IGridOptions>{};
            //scope.gridOptions = gridOption;
            //gridOption.data = scope.ds;
            //gridOption.rowEditWaitInterval = -1;
            //gridOption.enableRowSelection = true;
            //gridOption.columnDefs = [{ name: "ID", displayName: "ID", enableCellEdit: false }, { aggregationType: 0, name: "name", displayName: "姓名", enableCellEdit: true }
            //    , { name: "action", displayName: "操作", field: "ID", enableCellEdit: false, cellTemplate: '<input type="button" value="remove" ng-click="grid.appScope.del(row)" />' }];


            //scope.gridOptions.onRegisterApi = function (gridapi: uiGrid.IGridApi) {
            //    scope.gridApi = gridapi;
            //};
            //scope.msg = JSON.stringify(gridOption.data);
            //scope.list = function () {
            //    var kkk = "";
            //    scope.gridApi.rowEdit.getDirtyRows().forEach(function (item) {
            //        kkk = kkk + item.entity.ID + "__" + item.entity.name;

            //    });
            //    scope.msg = kkk;

            //}

            //scope.add = function () {
            //    scope.gridOptions.data.push({ "ID": scope.gridOptions.data.length + 1, "name": "Yan" });
            //    animate.enabled(true);
            //    toaster.pop('success', "title", "text");
            //    toaster.warning("FF", "FFSD");
            //}
            //scope.del = function (row) {
            //    scope.msg = scope.msg + animate.enabled().toString();
            //    var index = scope.gridOptions.data.indexOf(row.entity);
            //    scope.gridOptions.data.splice(index, 1);
            //}
            http.get("/api/unit").success(function (data) {
                toaster.success("提示", "完成初始化");
            });
        }
    }
    //export interface IChildScope extends ng.IScope {
    //    tip: string;
    //}
    //export class ChildCtrl {
    //    public static $inject = ["$scope", "$routeParams","$http"];
    //    constructor(scope: IChildScope, routeParams: ng.route.IRouteParamsService, http: ng.IHttpService) {
    //        scope.tip = "初始化中....";
    //        http.get("/api/unit").success(function (data) {
    //            scope.tip = "完成初始化";
    //        });

    //    }
    //}
    //export class HeaderCtrl {
    //    public static $inject = ["$scope"];
    //    constructor(scope: ng.IScope) {

    //    }
    //}
    //export class NavCtrl {
    //    public static $inject = ["$scope"];
    //    constructor(scope: ng.IScope) {

    //    }
    //}
    export class SelectList {
        id: string;
        name: string;
        constructor(id: string, name: string) {
            this.id = id;
            this.name = name;
        }
    }


    export class AlpsApp {
        static getApp(): ng.IModule {
            return angular.module("Alps");
        }
    }
    export function getApp() {
        return angular.module("Alps");
    }
    var app = angular.module("Alps.Controllers", []);
    app.controller("RootCtrl", RootCtrl);//.controller("ChildCtrl", ChildCtrl).controller("HeaderCtrl", HeaderCtrl).controller("NavCtrl", NavCtrl);
    app.filter('displayName', function () {
        return function (id, map, idField, valueField) {
            if (typeof map !== undefined) {
                if (idField === undefined)
                    idField = "ID";
                if (valueField === undefined)
                    valueField = "Name";
                for (var i = 0; i < map.length; i++) {
                    if (map[i][idField] == id) {
                        return map[i][valueField];
                    }
                }
            }
            return id;
        }
    });
    app.filter('warehouseVoucherStateFilter', function () {
        return function (input) {
            switch (input) {
                case 0:
                    return '未确认';
                    break;
                case 1:
                    return '已确认';
                    break;
            }
        };
    });
    RegisterControllers(app);
    //app.controller("CatagoryEditCtrl", Alps.Controllers.CatagoryEditCtrl);
    //app.controller("CatagoryCtrl", Alps.Controllers.CatagoryListCtrl);
    //app.controller("CatagoryCreateCtrl", Alps.Controllers.CatagoryCreateCtrl);
    //app.controller("UnitListCtrl", Alps.Controllers.UnitListCtrl);
    //app.controller("UnitEditCtrl", Alps.Controllers.UnitEditCtrl);
    //app.controller("UnitCreateCtrl", Alps.Controllers.UnitCreateCtrl);
    //app.controller("WarehouseVoucherCreateCtrl", Alps.Controllers.WarehouseVoucherCreateCtrl);
    //app.controller("WarehouseVoucherEditCtrl", Alps.Controllers.WarehouseVoucherEditCtrl);
    //app.controller("StockInfoListCtrl", Alps.Controllers.StockInfoListCtrl);
    var app = angular.module("Alps", ["ngRoute", "Alps.directives", "Alps.Controllers", "angular-loading-bar", 'ngAnimate', 'toaster', 'smart-table', "xeditable"]);
    app.run(["editableOptions", function (editableOptions) {
        editableOptions.theme = "bs3";
        editableOptions.activate = "select";
    }]);
    function RegisterControllers(app: ng.IModule) {
        for (var p in Alps.Controllers) {
            if (p.substring(p.length - 4) == "Ctrl" && typeof (Alps.Controllers[p]) == "function") {
                app.controller(p, Alps.Controllers[p]);
            }
        }
    }

    export function phaseErr(err: any): string {
        var msg = "";
        if (err.ModelState) {
            if (err.ModelState) {
                msg = "<ul>";
                for (var p in err.ModelState) {
                    msg = msg + "<li>" + err.ModelState[p][0] + "</li>";
                }
                msg = msg + "</ul>";
            }
            if (msg == "") {
                msg = err.Message;
            }
            return msg;
        }
        if (err.InnerException) {
            msg = err.InnerException.ExceptionMessage;
        }
        if (err.ExceptionMessage)
            msg = err.ExceptionMessage;


        return msg;
    }
    ///路由配置
    function configRoute(routeProvider: ng.route.IRouteProvider, locationProvider: ng.ILocationProvider) {
        function setRoute(routeName: string) {

            var urlPath = "/" + routeName;
            var controllerName = routeName + "Ctrl";
            routeProvider.when(urlPath, { templateUrl: urlPath });
            return routeProvider;
        }
        routeProvider.when("/", { templateUrl: "/home/dashboard", controller: "ChildCtrl" });
        routeProvider.when("/home/test/:id", { templateUrl: "/Home/Test" }).otherwise({ redirectTo: "/" });
        routeProvider.when("/ProductStock", {
            templateUrl: "/ProductStock", controller: "ProductStockListModelListCtrl"
        });
        //.when("/Catagory", { redirectTo: "/Catagory/Index" })
        //.when("/Catagory/Index", { templateUrl: "/catagory", controller: "CatagoryListCtrl" })
        //.when("/Catagory/Create", { templateUrl: "/catagory/Create", controller: "CatagoryCreateCtrl" })
        //.when("/Catagory/Edit", { templateUrl: "/catagory/Edit", controller: "CatagoryEditCtrl" })
        //.when("/Catagory/Edit/:id", { templateUrl: "/catagory/Edit", controller: "CatagoryEditCtrl" })
        //.when("/WarehouseVouchers", { templateUrl: "/WarehouseVouchers", controller: "WarehouseVouchersCtrl" })
        //.when("/WarehouseVouchers/Index", { templateUrl: "/WarehouseVouchers", controller: "WarehouseVouchersCtrl" })
        //.when("/Unit", { redirectTo: "/Unit/Index" })
        //.when("/Unit/Index", { templateUrl: "/Unit", controller: "UnitListCtrl" })
        //.when("/Unit/Create", { templateUrl: "/Unit/Create", controller: "UnitCreateCtrl" })
        //.when("/Unit/Edit/:id", { templateUrl: "/Unit/Edit", controller: "UnitEditCtrl" })
        //.when("/WarehouseVoucher", { templateUrl: "/WarehouseVoucher", controller: "WarehouseVoucherListCtrl" })
        //.when("/WarehouseVoucher/Index", { templateUrl: "/WarehouseVoucher", controller: "WarehouseVoucherListCtrl" })
        //.when("/WarehouseVoucher/Create", { templateUrl: "/WarehouseVoucher/Create", controller: "WarehouseVoucherCreateCtrl" })
        //.when("/WarehouseVoucher/Edit/:id", { templateUrl: "/WarehouseVoucher/Edit", controller: "WarehouseVoucherEditCtrl" })
        //.when("/Material", { templateUrl: "/Material", controller: "MaterialListCtrl" })
        //.when("/Material/Index", { templateUrl: "/Material", controller: "MaterialListCtrl" })
        //.when("/Material/Create", { templateUrl: "/Material/Create", controller: "MaterialCreateCtrl" })
        //.when("/Material/Edit/:id", { templateUrl: "/Material/Edit", controller: "MaterialEditCtrl" })
        //.when("/StockInfo", { templateUrl: "/StockInfo", controller: "StockInfoListCtrl" })
        //.when("/StockInfo/Index", { templateUrl: "/StockInfo", controller: "StockInfoListCtrl" })
        //.when("/TradeAccount/Index", { templateUrl: "/TradeAccount", controller: "TradeAccountListCtrl" })
        //.when("/TradeAccount", { templateUrl: "/TradeAccount", controller: "TradeAccountListCtrl" })
        //.when("/TradeAccount/Edit/:id", { templateUrl: "/TradeAccount/Edit", controller: "TradeAccountEditCtrl" })

        for (var p in Alps.Controllers) {
            if (p.substring(p.length - 8) == "ListCtrl" && typeof (Alps.Controllers[p]) == "function") {
                var path = p.substring(0, p.length - 8);
                routeProvider.when("/" + path, { templateUrl: "/template/" + path, controller: p }).when("/" + path + "/Index", { templateUrl: "/template/" + path, controller: p });
            }
            if (p.substring(p.length - 8) == "EditCtrl" && typeof (Alps.Controllers[p]) == "function") {
                var path = p.substring(0, p.length - 8);
                routeProvider.when("/" + path + "/Edit/:id", { templateUrl: "/template/" + path + "/Edit", controller: p });
                routeProvider.when("/" + path + "/Edit/", { templateUrl: "/template/" + path + "/Edit", controller: p });
            }
            if (p.substring(p.length - 10) == "CreateCtrl" && typeof (Alps.Controllers[p]) == "function") {
                var path = p.substring(0, p.length - 10);
                routeProvider.when("/" + path + "/Create", { templateUrl: "/template/" + path + "/Create", controller: p });
            }
        }
        //locationProvider.html5Mode(true);
    }
    app.config(["$routeProvider", "$locationProvider", configRoute]);
    //function configAnimate(animate: ng.animate.IAnimateService) {
    //    animate.enabled(true);
    //}
    //app.config(["$animate", configAnimate]);
    
}