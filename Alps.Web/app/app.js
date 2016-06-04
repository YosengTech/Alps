/// <reference path="../scripts/_all.ts" />
var Alps;
(function (Alps) {
    'use strict';
    var ModalCtrl = (function () {
        function ModalCtrl() {
        }
        return ModalCtrl;
    })();
    Alps.ModalCtrl = ModalCtrl;
    var RootCtrl = (function () {
        function RootCtrl(scope, rootScope, toaster, animate, document, http) {
            document.bind("keypress", function (event) {
                if (event.keyCode == 13) {
                    event.keyCode = 9;
                }
            });
            scope.initialDatabase = function () {
                http.post("/Api/SystemMgr/InitialDatabase", {}).success(function (data) {
                    toaster.success("提示", "完成初始化");
                }).error(function (data) {
                    toaster.error("提示", data);
                });
            };
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
        RootCtrl.$inject = ["$scope", "$rootScope", "toaster", "$animate", "$document", "$http"];
        return RootCtrl;
    })();
    Alps.RootCtrl = RootCtrl;
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
    var SelectList = (function () {
        function SelectList(id, name) {
            this.id = id;
            this.name = name;
        }
        return SelectList;
    })();
    Alps.SelectList = SelectList;
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
    app.controller("RootCtrl", RootCtrl); //.controller("ChildCtrl", ChildCtrl).controller("HeaderCtrl", HeaderCtrl).controller("NavCtrl", NavCtrl);
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
        };
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
    function RegisterControllers(app) {
        for (var p in Alps.Controllers) {
            if (p.substring(p.length - 4) == "Ctrl" && typeof (Alps.Controllers[p]) == "function") {
                app.controller(p, Alps.Controllers[p]);
            }
        }
    }
    function phaseErr(err) {
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
    Alps.phaseErr = phaseErr;
    ///路由配置
    function configRoute(routeProvider, locationProvider) {
        function setRoute(routeName) {
            var urlPath = "/" + routeName;
            var controllerName = routeName + "Ctrl";
            routeProvider.when(urlPath, { templateUrl: urlPath });
            return routeProvider;
        }
        routeProvider.when("/", { templateUrl: "/home/dashboard", controller: "ChildCtrl" });
        routeProvider.when("/home/test/:id", { templateUrl: "/Home/Test" }).otherwise({ redirectTo: "/" });
        routeProvider.when("/ProductStock", {
            templateUrl: "/ProductStock",
            controller: "ProductStockListModelListCtrl"
        });
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
})(Alps || (Alps = {}));
//# sourceMappingURL=app.js.map