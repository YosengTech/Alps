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
    }
    export class RootCtrl {
        public static $inject = ["$scope"];
        constructor(scope: IRootScope) {
            var gridOption: uiGrid.IGridOptions = <uiGrid.IGridOptions>{};
            gridOption.rowEditWaitInterval = -1;
            gridOption.columnDefs = [{ name: "ID", displayName: "ID", enableCellEdit: false }, { aggregationType: 0, name: "name", displayName: "姓名", enableCellEdit: true }
                , { name: "action", displayName: "操作",field:"ID",enableCellEdit:false, cellTemplate: '<input type="button" value="remove" ng-click="grid.appScope.del(row)" />'}];
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
                scope.gridOptions.data.push({ "ID": scope.gridOptions.data.length + 1, "name":"Yan" });

            }
            scope.del = function (row) {
                var index=scope.gridOptions.data.indexOf(row.entity);
                scope.gridOptions.data.splice(index, 1);  

            }
        }
    }
    export interface IChildScope extends ng.IScope{
        tip: string;
    }
    export class ChildCtrl {
        public static $inject = ["$scope","$routeParams"];
        constructor(scope: IChildScope,routeParams:ng.route.IRouteParamsService) {
            scope.tip = routeParams["id"];
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
    export class CatagoryCtrl {
        public static $inject = ["$scope"];
        vmScope: any;
        constructor(scope: any) {
            
            this.vmScope = scope;
            this.getcatagories();
        }

        getcatagories() {
            var self = this;
            $.get("/api/catagories", function (data) {
                self.vmScope.items = data;
            });
        }
    }
    export class CatagoryEditCtrl {
        public static $inject = ["$scope","$routeParams"];
        vmScope: any;
        
        constructor(scope: any,routeParams:any) {
            this.vmScope = scope;
            this.getcatagory(routeParams.ID);
            
        }

        getcatagory(id:any) {
            var self = this;
            $.get("/api/catagories/"+id, function (data) {
                self.vmScope.item = data;
            });
        }
    }
    angular.module("Alps.Controllers",[]).controller("WarehouseVouchersCtrl", Alps.Controllers.WarehouseVouchersCtrl);
    var app = angular.module("Alps", ["ngRoute", "Alps.directives", "ui.grid", "ui.grid.edit", "ui.grid.rowEdit", "ui.grid.selection","Alps.Controllers"]);
    app.controller("RootCtrl", RootCtrl).controller("ChildCtrl", ChildCtrl).controller("HeaderCtrl", HeaderCtrl).controller("NavCtrl", NavCtrl);
    app.controller("CatagoryCtrl", CatagoryCtrl);
    
    
    ///路由配置
    function configRoute(routeProvider: ng.route.IRouteProvider) {
        function setRoute(routeName: string) {

            var urlPath = "/" + routeName;
            var controllerName = routeName + "Ctrl";
            routeProvider.when(urlPath, { templateUrl:urlPath });
            return routeProvider;
        }
        routeProvider.when("/", { templateUrl: "/home/dashboard" });
        //setRoute("Home/Test/:id")
        routeProvider.when("/home/test/:id", { templateUrl: "/Home/Test" })
            .when("/Catagory", { templateUrl: "/catagory" })
            .when("/Catagory/Index", { templateUrl: "/catagory" })
            .when("/Catagory/Create", { templateUrl: "/catagory/Create" })
            .when("/Catagory/Edit", { templateUrl: "/catagory/Edit" })
            .when("/Catagory/Edit/:id", { templateUrl: "/catagory/Edit" })
            .when("/WarehouseVouchers", { templateUrl: "/WarehouseVouchers", controller:"WarehouseVouchersCtrl"})
            .when("/WarehouseVouchers/Index", { templateUrl: "/WarehouseVouchers", controller: "WarehouseVouchersCtrl" })
            .otherwise({ redirectTo: "/" });
        setRoute("Home/About");
        //setRoute("Home/Catagories");
    }
    app.config(["$routeProvider", configRoute]);
}