var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var StockInfoViewModel = (function () {
            function StockInfoViewModel() {
            }
            return StockInfoViewModel;
        })();
        Controllers.StockInfoViewModel = StockInfoViewModel;
        var StockInfoListCtrl = (function () {
            function StockInfoListCtrl(scope, http, toaster) {
                function getStockInfoViewModelList() {
                    http.get("/api/StockInfo").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                scope.getStockInfoViewModelList = getStockInfoViewModelList;
                getStockInfoViewModelList();
            }
            StockInfoListCtrl.$inject = ["$scope", "$http", "toaster"];
            return StockInfoListCtrl;
        })();
        Controllers.StockInfoListCtrl = StockInfoListCtrl;
        var StockInfoViewModelCreateCtrl = (function () {
            function StockInfoViewModelCreateCtrl(scope, http, toaster, locationService) {
                function createStockInfoViewModel() {
                    http.post("/api/StockInfoViewModel", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/StockInfoViewModel");
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
                scope.createStockInfoViewModel = createStockInfoViewModel;
                scope.goBack = goBack;
            }
            StockInfoViewModelCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
            return StockInfoViewModelCreateCtrl;
        })();
        Controllers.StockInfoViewModelCreateCtrl = StockInfoViewModelCreateCtrl;
        var StockInfoViewModelEditCtrl = (function () {
            function StockInfoViewModelEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getStockInfoViewModel(id) {
                    http.get("/api/StockInfoViewModel/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveStockInfoViewModel() {
                    http.put("/api/StockInfoViewModel/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/StockInfoViewModel");
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
                function deleteStockInfoViewModel() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/StockInfoViewModel/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/StockInfoViewModel");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getStockInfoViewModel = getStockInfoViewModel;
                scope.saveStockInfoViewModel = saveStockInfoViewModel;
                scope.deleteStockInfoViewModel = deleteStockInfoViewModel;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getStockInfoViewModel(id);
                }
                else {
                    locationService.path("/StockInfoViewModel");
                }
            }
            StockInfoViewModelEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window"];
            return StockInfoViewModelEditCtrl;
        })();
        Controllers.StockInfoViewModelEditCtrl = StockInfoViewModelEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=StockInfo.js.map