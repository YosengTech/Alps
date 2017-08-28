var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var TradeAccount = (function () {
            function TradeAccount() {
            }
            return TradeAccount;
        }());
        Controllers.TradeAccount = TradeAccount;
        var TradeAccountListCtrl = (function () {
            function TradeAccountListCtrl(scope, http, toaster) {
                function getTradeAccountList() {
                    http.get("/api/TradeAccount").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                scope.getTradeAccountList = getTradeAccountList;
                getTradeAccountList();
            }
            return TradeAccountListCtrl;
        }());
        TradeAccountListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.TradeAccountListCtrl = TradeAccountListCtrl;
        var TradeAccountCreateCtrl = (function () {
            function TradeAccountCreateCtrl(scope, http, toaster, locationService) {
                function createTradeAccount() {
                    http.post("/api/TradeAccount", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/TradeAccount");
                    }).error(function (err) {
                        var errMsg = "";
                        if (err.ModelState) {
                            errMsg = "<ul>";
                            for (var p in err.ModelState) {
                                errMsg = errMsg + "<li>" + err.ModelState[p][0] + "</li>";
                            }
                            errMsg = errMsg + "</ul>";
                        }
                        if (errMsg == "") {
                            errMsg = err.Message;
                        }
                        toaster.pop("error", "错误", errMsg, 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createTradeAccount = createTradeAccount;
                scope.goBack = goBack;
            }
            return TradeAccountCreateCtrl;
        }());
        TradeAccountCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.TradeAccountCreateCtrl = TradeAccountCreateCtrl;
        var TradeAccountEditCtrl = (function () {
            function TradeAccountEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getTradeAccount(id) {
                    http.get("/api/TradeAccount/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveTradeAccount() {
                    http.put("/api/TradeAccount/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/TradeAccount");
                    }).error(function (err) {
                        var errMsg = "";
                        if (err.ModelState) {
                            errMsg = "<ul>";
                            for (var p in err.ModelState) {
                                errMsg = errMsg + "<li>" + err.ModelState[p][0] + "</li>";
                            }
                            errMsg = errMsg + "</ul>";
                        }
                        if (errMsg == "") {
                            errMsg = err.Message;
                        }
                        toaster.pop("error", "错误", errMsg, 3000, "trustedHtml");
                    });
                }
                function deleteTradeAccount() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/TradeAccount/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/TradeAccount");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getTradeAccount = getTradeAccount;
                scope.saveTradeAccount = saveTradeAccount;
                scope.deleteTradeAccount = deleteTradeAccount;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getTradeAccount(id);
                }
                else {
                    locationService.path("/TradeAccount");
                }
            }
            return TradeAccountEditCtrl;
        }());
        TradeAccountEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window"];
        Controllers.TradeAccountEditCtrl = TradeAccountEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=tradeAccountController.js.map