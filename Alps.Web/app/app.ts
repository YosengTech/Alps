/// <reference path="../scripts/_all.ts" />
module Alps {
    'use strict';
    export interface IRootScope {
        list(): void;
        initialDatabase(): void;
        testMsg: string;
    }
    export class RootCtrl {
        public static $inject = ["$scope", "$rootScope", "toaster", "$animate", "$document", "$http", "$window"];
        constructor(scope: IRootScope, rootScope, toaster, animate: ng.animate.IAnimateService, document: ng.IDocumentService, http: ng.IHttpService, window: ng.IWindowService) {
            scope.initialDatabase = function () {
                http.post("/Api/SystemMgr/InitialDatabase", {}).success(function (data) {
                    toaster.success("提示", "完成初始化");
                    window.location.reload();
                }).error(function (data) {
                    toaster.error("提示", Alps.phaseErr(data), 3000, "trustedHtml");
                });
            }
            scope.testMsg = "Hello Winsan!";

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

    //注册控制器
    function RegisterControllers(app: ng.IModule) {
        for (var p in Alps.Controllers) {
            if (p.substring(p.length - 4) == "Ctrl" && typeof (Alps.Controllers[p]) == "function") {
                app.controller(p, Alps.Controllers[p]);
            }
        }
    }
    function RegisterDirectives(app: ng.IModule) {
        for (var p in Alps.Directives) {
            if (p.substring(p.length - 9) == "Directive" && typeof (Alps.Directives[p]) == "function") {
                app.directive(p.substring(0,p.length-9), Alps.Directives[p].Factory());
            }
        }
    }
    var directiveModule = angular.module("Alps.Directives");
    RegisterDirectives(directiveModule);

    var app = angular.module("Alps.Controllers", []);
    app.controller("RootCtrl", RootCtrl);
    RegisterControllers(app);

    //注册过滤器,在appFilter实现


    var app = angular.module("Alps", ["ngRoute", "Alps.Directives", "Alps.Controllers", "Alps.Filters", "Alps.Services", "angular-loading-bar", 'ngAnimate', 'toaster',"ui.bootstrap"]);
    //app.run(["editableOptions", function (editableOptions) {
    //    editableOptions.theme = "bs3";
    //    editableOptions.activate = "select";
    //}]);

    export function phaseErr(err: any): string {
        var msg = "";
        msg = "<ul>";
        if (err.ModelState) {
            if (err.ModelState) {

                for (var p in err.ModelState) {
                    msg = msg + "<li>" + err.ModelState[p][0] + "</li>";
                }

            }
            if (msg == "") {
                msg = msg + "<li>" + err.Message; + "</li>";
            }
            return msg;
        }
        if (err.ExceptionMessage)
            msg = msg + "<li>" + err.ExceptionMessage + "</li>";
        var e = err;
        while (e.InnerException) {
            msg = msg + "<li>" + e.InnerException.ExceptionMessage + "</li>";
            e = e.InnerException;
        }
        if (msg == "<ul>")
            msg = msg + "<li>" + err + "</li>";
        msg = msg + "</ul>";
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
        routeProvider.when("/", { templateUrl: "/template/home/dashboard", controller: "DashboardCtrl" });
        routeProvider.when("/ChangedLog", { templateUrl: "/template/home/changedlog" });
        routeProvider.when("/home/test/:id", { templateUrl: "/Home/Test" }).otherwise({ redirectTo: "/" });
        routeProvider.when("/ProductStock", {
            templateUrl: "/ProductStock", controller: "ProductStockListModelListCtrl"
        });
       
        for (var p in Alps.Controllers) {
            if (p.substring(p.length - 8) == "ListCtrl" && typeof (Alps.Controllers[p]) == "function") {
                var path = p.substring(0, p.length - 8);
                routeProvider.when("/" + path, { templateUrl: "/template/" + path, controller: p }).when("/" + path + "/Index", { templateUrl: "/template/" + path, controller: p });
                continue;
            }
            if (p.substring(p.length - 8) == "EditCtrl" && typeof (Alps.Controllers[p]) == "function") {
                var path = p.substring(0, p.length - 8);
                routeProvider.when("/" + path + "/Edit/:id", { templateUrl: "/template/" + path + "/Edit", controller: p });
                routeProvider.when("/" + path + "/Edit/", { templateUrl: "/template/" + path + "/Edit", controller: p });
                continue;
            }
            if (p.substring(p.length - 10) == "CreateCtrl" && typeof (Alps.Controllers[p]) == "function") {
                var path = p.substring(0, p.length - 10);
                routeProvider.when("/" + path + "/Create", { templateUrl: "/template/" + path + "/Create", controller: p });
                continue;
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