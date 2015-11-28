﻿/// <reference path="../scripts/_all.ts" />
module Alps {
    'use strict';
    export interface IRootScope {
        msg: string;
        gridOptions: uiGrid.IGridOptions;
        list(): void;
        add(): void;
        del(row): void;
        gridApi: uiGrid.IGridApi;
    }
    export class RootCtrl {
        public static $inject = ["$scope", "$rootScope", "toaster", "$animate"];
        constructor(scope: IRootScope, rootScope, toaster, animate: ng.animate.IAnimateService) {
            
            var gridOption: uiGrid.IGridOptions = <uiGrid.IGridOptions>{};
            gridOption.rowEditWaitInterval = -1;
            gridOption.columnDefs = [{ name: "ID", displayName: "ID", enableCellEdit: false }, { aggregationType: 0, name: "name", displayName: "姓名", enableCellEdit: true }
                , { name: "action", displayName: "操作", field: "ID", enableCellEdit: false, cellTemplate: '<input type="button" value="remove" ng-click="grid.appScope.del(row)" />' }];
            gridOption.data = [{ "ID": 1, "name": "Amei" }, { "ID": 2, "name": "Winsan" }];
            gridOption.enableRowSelection = true;

            scope.gridOptions = gridOption;
            scope.gridOptions.onRegisterApi = function (gridapi: uiGrid.IGridApi) {
                scope.gridApi = gridapi;
            };
            scope.msg = JSON.stringify(gridOption.data);
            scope.list = function () {
                var kkk = "";
                scope.gridApi.rowEdit.getDirtyRows().forEach(function (item) {
                    kkk = kkk + item.entity.ID + "__" + item.entity.name;

                });
                scope.msg = kkk;

            }

            scope.add = function () {
                scope.gridOptions.data.push({ "ID": scope.gridOptions.data.length + 1, "name": "Yan" });
                animate.enabled(true);
                toaster.pop('success', "title", "text");
                toaster.warning("FF", "FFSD");
            }
            scope.del = function (row) {
                scope.msg = scope.msg + animate.enabled().toString();
                var index = scope.gridOptions.data.indexOf(row.entity);
                scope.gridOptions.data.splice(index, 1);
            }

        }
    }
    export interface IChildScope extends ng.IScope {
        tip: string;
    }
    export class ChildCtrl {
        public static $inject = ["$scope", "$routeParams","$http"];
        constructor(scope: IChildScope, routeParams: ng.route.IRouteParamsService, http: ng.IHttpService) {
            scope.tip = "初始化中....";
            http.get("/api/unit").success(function (data) {
                scope.tip = "完成初始化";
            });

        }
    }
    export class HeaderCtrl {
        public static $inject = ["$scope"];
        constructor(scope: ng.IScope) {

        }
    }
    export class NavCtrl {
        public static $inject = ["$scope"];
        constructor(scope: ng.IScope) {

        }
    }
    export class SelectList {
        id: string;
        name: string;
        constructor(id: string, name: string) {
            this.id = id;
            this.name = name;
        }
    }
    //export interface ICatagoryEditScope {
    //    item: any;
    //    catagorySelectList: SelectList[];
    //}
    //export class CatagoryEditCtrl {
    //    public static $inject = ["$scope", "$routeParams","$http","toaster","$location"];
    //    vmScope: any;

    //    constructor(scope: any, routeParams:ng.route.IRouteParamsService, http: ng.IHttpService,toaster,lo:ng.ILocationService) {
    //        var self;
    //        self = this;
    //        this.vmScope = scope;
    //        this.getcatagory(routeParams["id"]);
            
    //        var currentId = routeParams["id"];
    //        this.vmScope.save = function (event:Event) {
    //            event.preventDefault();
    //            http.put("/api/catagories/" + currentId, self.vmScope.item).success(function () {
    //                toaster.pop('success', "更新", "成功保存");
    //                lo.path("/Catagory");
    //            });
    //        }
    //        this.vmScope.goBack = function () {

    //        }
    //    }

    //    getcatagory(id: any) {
    //        var self = this;
    //        $.get("/api/catagories/" + id, function (data) {
    //            self.vmScope.item = data;

    //        });
    //        $.get("/api/catagories", function (data) {
    //            self.vmScope.catagorySelectList = [];
    //            self.vmScope.catagorySelectList.push(new SelectList(null, '---请选择---'));
    //            data.forEach(function (item) {
    //                self.vmScope.catagorySelectList.push(new SelectList(item.ID, item.Name));
    //            });
    //        });

    //    }
    //} 
    

    export class AlpsApp {
        static getApp(): ng.IModule {
            return angular.module("Alps");
        }
    }
    export function getApp() {
        return angular.module("Alps");
    }
    var app = angular.module("Alps.Controllers", []);
    app.controller("RootCtrl", RootCtrl).controller("ChildCtrl", ChildCtrl).controller("HeaderCtrl", HeaderCtrl).controller("NavCtrl", NavCtrl);
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
    var app = angular.module("Alps", ["ngRoute", "Alps.directives", "ui.grid", "ui.grid.edit", "ui.grid.rowEdit", "ui.grid.selection", "Alps.Controllers", "angular-loading-bar", 'ngAnimate', 'toaster', 'mgcrea.ngStrap']);

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
    function configRoute(routeProvider: ng.route.IRouteProvider) {
        function setRoute(routeName: string) {

            var urlPath = "/" + routeName;
            var controllerName = routeName + "Ctrl";
            routeProvider.when(urlPath, { templateUrl: urlPath });
            return routeProvider;
        }
        routeProvider.when("/", { templateUrl: "/home/dashboard" ,controller:"ChildCtrl"});
        routeProvider.when("/home/test/:id", { templateUrl: "/Home/Test" }).otherwise({ redirectTo: "/" });
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
                routeProvider.when("/" + path, { templateUrl: "/" + path, controller: p }).when("/" + path + "/Index", { templateUrl: "/" + path, controller: p });
            }
            if (p.substring(p.length - 8) == "EditCtrl" && typeof (Alps.Controllers[p]) == "function") {
                var path = p.substring(0, p.length - 8);
                routeProvider.when("/" + path + "/Edit/:id", { templateUrl: "/" + path + "/Edit", controller: p });
            }
            if (p.substring(p.length - 10) == "CreateCtrl" && typeof (Alps.Controllers[p]) == "function") {
                var path = p.substring(0, p.length - 10);
                routeProvider.when("/" + path + "/Create", { templateUrl: "/" + path + "/Create", controller: p });
            }
        }
        //setRoute("Home/Catagories");
    }
    app.config(["$routeProvider", configRoute]);
    //function configAnimate(animate: ng.animate.IAnimateService) {
    //    animate.enabled(true);
    //}
    //app.config(["$animate", configAnimate]);
    
}