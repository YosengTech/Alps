/// <reference path="../scripts/_all.ts" />
var Alps;
(function (Alps) {
    'use strict';
    var RootCtrl = (function () {
        function RootCtrl(scope, rootScope, toaster, animate) {
            var gridOption = {};
            gridOption.rowEditWaitInterval = -1;
            gridOption.columnDefs = [{ name: "ID", displayName: "ID", enableCellEdit: false }, { aggregationType: 0, name: "name", displayName: "姓名", enableCellEdit: true }, { name: "action", displayName: "操作", field: "ID", enableCellEdit: false, cellTemplate: '<input type="button" value="remove" ng-click="grid.appScope.del(row)" />' }];
            gridOption.data = [{ "ID": 1, "name": "Amei" }, { "ID": 2, "name": "Winsan" }];
            gridOption.enableRowSelection = true;
            scope.gridOptions = gridOption;
            scope.gridOptions.onRegisterApi = function (gridapi) {
                scope.gridApi = gridapi;
            };
            scope.msg = JSON.stringify(gridOption.data);
            scope.list = function () {
                var kkk = "";
                scope.gridApi.rowEdit.getDirtyRows().forEach(function (item) {
                    kkk = kkk + item.entity.ID + "__" + item.entity.name;
                });
                scope.msg = kkk;
            };
            scope.add = function () {
                scope.gridOptions.data.push({ "ID": scope.gridOptions.data.length + 1, "name": "Yan" });
                animate.enabled(true);
                toaster.pop('success', "title", "text");
                toaster.warning("FF", "FFSD");
            };
            scope.del = function (row) {
                scope.msg = scope.msg + animate.enabled().toString();
                var index = scope.gridOptions.data.indexOf(row.entity);
                scope.gridOptions.data.splice(index, 1);
            };
        }
        RootCtrl.$inject = ["$scope", "$rootScope", "toaster", "$animate"];
        return RootCtrl;
    })();
    Alps.RootCtrl = RootCtrl;
    var ChildCtrl = (function () {
        function ChildCtrl(scope, routeParams) {
            scope.tip = routeParams["id"];
        }
        ChildCtrl.$inject = ["$scope", "$routeParams"];
        return ChildCtrl;
    })();
    Alps.ChildCtrl = ChildCtrl;
    var HeaderCtrl = (function () {
        function HeaderCtrl(scope) {
        }
        HeaderCtrl.$inject = ["$scope"];
        return HeaderCtrl;
    })();
    Alps.HeaderCtrl = HeaderCtrl;
    var NavCtrl = (function () {
        function NavCtrl(scope) {
        }
        NavCtrl.$inject = ["$scope"];
        return NavCtrl;
    })();
    Alps.NavCtrl = NavCtrl;
    var SelectList = (function () {
        function SelectList(id, name) {
            this.id = id;
            this.name = name;
        }
        return SelectList;
    })();
    Alps.SelectList = SelectList;
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
    var AlpsApp = (function () {
        function AlpsApp() {
        }
        AlpsApp.getApp = function () {
            return angular.module("Alps");
        };
        return AlpsApp;
    })();
    Alps.AlpsApp = AlpsApp;
    function getApp() {
        return angular.module("Alps");
    }
    Alps.getApp = getApp;
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
    function RegisterControllers(app) {
        for (var p in Alps.Controllers) {
            if (p.substring(p.length - 4) == "Ctrl" && typeof (Alps.Controllers[p]) == "function") {
                app.controller(p, Alps.Controllers[p]);
            }
        }
    }
    ///路由配置
    function configRoute(routeProvider) {
        function setRoute(routeName) {
            var urlPath = "/" + routeName;
            var controllerName = routeName + "Ctrl";
            routeProvider.when(urlPath, { templateUrl: urlPath });
            return routeProvider;
        }
        routeProvider.when("/", { templateUrl: "/home/dashboard" });
        //setRoute("Home/Test/:id")
        routeProvider.when("/home/test/:id", { templateUrl: "/Home/Test" }).when("/Catagory", { redirectTo: "/Catagory/Index" }).when("/Catagory/Index", { templateUrl: "/catagory", controller: "CatagoryListCtrl" }).when("/Catagory/Create", { templateUrl: "/catagory/Create", controller: "CatagoryCreateCtrl" }).when("/Catagory/Edit", { templateUrl: "/catagory/Edit", controller: "CatagoryEditCtrl" }).when("/Catagory/Edit/:id", { templateUrl: "/catagory/Edit", controller: "CatagoryEditCtrl" }).when("/Catagory/Delete/:id", { templateUrl: "/catagory/Delete", controller: "CatagoryDeleteCtrl" }).when("/WarehouseVouchers", { templateUrl: "/WarehouseVouchers", controller: "WarehouseVouchersCtrl" }).when("/WarehouseVouchers/Index", { templateUrl: "/WarehouseVouchers", controller: "WarehouseVouchersCtrl" }).when("/Unit", { redirectTo: "/Unit/Index" }).when("/Unit/Index", { templateUrl: "/Unit", controller: "UnitListCtrl" }).when("/Unit/Create", { templateUrl: "/Unit/Create", controller: "UnitCreateCtrl" }).when("/Unit/Edit/:id", { templateUrl: "/Unit/Edit", controller: "UnitEditCtrl" }).when("/WarehouseVoucher", { templateUrl: "/WarehouseVoucher", controller: "WarehouseVoucherListCtrl" }).when("/WarehouseVoucher/Index", { templateUrl: "/WarehouseVoucher", controller: "WarehouseVoucherListCtrl" }).when("/WarehouseVoucher/Create", { templateUrl: "/WarehouseVoucher/Create", controller: "WarehouseVoucherCreateCtrl" }).when("/WarehouseVoucher/Edit/:id", { templateUrl: "/WarehouseVoucher/Edit", controller: "WarehouseVoucherEditCtrl" }).when("/Material", { templateUrl: "/Material", controller: "MaterialListCtrl" }).when("/Material/Index", { templateUrl: "/Material", controller: "MaterialListCtrl" }).when("/Material/Create", { templateUrl: "/Material/Create", controller: "MaterialCreateCtrl" }).when("/Material/Edit/:id", { templateUrl: "/Material/Edit", controller: "MaterialEditCtrl" }).when("/StockInfo", { templateUrl: "/StockInfo", controller: "StockInfoListCtrl" }).when("/StockInfo/Index", { templateUrl: "/StockInfo", controller: "StockInfoListCtrl" }).otherwise({ redirectTo: "/" });
        setRoute("Home/About");
        //setRoute("Home/Catagories");
    }
    app.config(["$routeProvider", configRoute]);
})(Alps || (Alps = {}));
//# sourceMappingURL=app.js.map