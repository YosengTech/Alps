/// <reference path="../scripts/_all.ts" />
var Alps;
(function (Alps) {
    'use strict';
    var RootCtrl = (function () {
        function RootCtrl(scope) {
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
            };
            scope.del = function (row) {
                var index = scope.gridOptions.data.indexOf(row.entity);
                scope.gridOptions.data.splice(index, 1);
            };
        }
        RootCtrl.$inject = ["$scope"];
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
    var CatagoryCtrl = (function () {
        function CatagoryCtrl(scope) {
            this.vmScope = scope;
            this.getcatagories();
        }
        CatagoryCtrl.prototype.getcatagories = function () {
            var self = this;
            $.get("/api/catagories", function (data) {
                self.vmScope.items = data;
            });
        };
        CatagoryCtrl.$inject = ["$scope"];
        return CatagoryCtrl;
    })();
    Alps.CatagoryCtrl = CatagoryCtrl;
    var CatagoryEditCtrl = (function () {
        function CatagoryEditCtrl(scope, routeParams) {
            this.vmScope = scope;
            this.getcatagory(routeParams.ID);
        }
        CatagoryEditCtrl.prototype.getcatagory = function (id) {
            var self = this;
            $.get("/api/catagories/" + id, function (data) {
                self.vmScope.item = data;
            });
        };
        CatagoryEditCtrl.$inject = ["$scope", "$routeParams"];
        return CatagoryEditCtrl;
    })();
    Alps.CatagoryEditCtrl = CatagoryEditCtrl;
    angular.module("Alps.Controllers", []).controller("WarehouseVouchersCtrl", Alps.Controllers.WarehouseVouchersCtrl);
    var app = angular.module("Alps", ["ngRoute", "Alps.directives", "ui.grid", "ui.grid.edit", "ui.grid.rowEdit", "ui.grid.selection", "Alps.Controllers"]);
    app.controller("RootCtrl", RootCtrl).controller("ChildCtrl", ChildCtrl).controller("HeaderCtrl", HeaderCtrl).controller("NavCtrl", NavCtrl);
    app.controller("CatagoryCtrl", CatagoryCtrl);
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
        routeProvider.when("/home/test/:id", { templateUrl: "/Home/Test" }).when("/Catagory", { templateUrl: "/catagory" }).when("/Catagory/Index", { templateUrl: "/catagory" }).when("/Catagory/Create", { templateUrl: "/catagory/Create" }).when("/Catagory/Edit", { templateUrl: "/catagory/Edit" }).when("/Catagory/Edit/:id", { templateUrl: "/catagory/Edit" }).when("/WarehouseVouchers", { templateUrl: "/WarehouseVouchers", controller: "WarehouseVouchersCtrl" }).when("/WarehouseVouchers/Index", { templateUrl: "/WarehouseVouchers", controller: "WarehouseVouchersCtrl" }).otherwise({ redirectTo: "/" });
        setRoute("Home/About");
        //setRoute("Home/Catagories");
    }
    app.config(["$routeProvider", configRoute]);
})(Alps || (Alps = {}));
//# sourceMappingURL=app.js.map