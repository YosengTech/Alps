var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var ProductStockListModel = (function () {
            function ProductStockListModel() {
            }
            return ProductStockListModel;
        }());
        Controllers.ProductStockListModel = ProductStockListModel;
        var ProductStockListModelListCtrl = (function () {
            function ProductStockListModelListCtrl(scope, http, toaster) {
                function getProductStockListModelList(pageIndex) {
                    http.get("/api/ProductStock?pageIndex=" + pageIndex).success(function (data) {
                        scope.items = data.data;
                        scope.totalCount = data.totalcount;
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.pageSize = 10;
                scope.getProductStockListModelList = getProductStockListModelList;
                getProductStockListModelList(1);
            }
            return ProductStockListModelListCtrl;
        }());
        ProductStockListModelListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.ProductStockListModelListCtrl = ProductStockListModelListCtrl;
        var ProductStockListModelCreateCtrl = (function () {
            function ProductStockListModelCreateCtrl(scope, http, toaster, locationService) {
                function createProductStockListModel() {
                    http.post("/api/ProductStockListModel", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/ProductStockListModel");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createProductStockListModel = createProductStockListModel;
                scope.goBack = goBack;
            }
            return ProductStockListModelCreateCtrl;
        }());
        ProductStockListModelCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.ProductStockListModelCreateCtrl = ProductStockListModelCreateCtrl;
        var ProductStockListModelEditCtrl = (function () {
            function ProductStockListModelEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getProductStockListModel(id) {
                    http.get("/api/ProductStockListModel/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveProductStockListModel() {
                    http.put("/api/ProductStockListModel/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/ProductStockListModel");
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
                function deleteProductStockListModel() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/ProductStockListModel/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/ProductStockListModel");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getProductStockListModel = getProductStockListModel;
                scope.saveProductStockListModel = saveProductStockListModel;
                scope.deleteProductStockListModel = deleteProductStockListModel;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getProductStockListModel(id);
                }
                else {
                    locationService.path("/ProductStockListModel");
                }
            }
            return ProductStockListModelEditCtrl;
        }());
        ProductStockListModelEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window"];
        Controllers.ProductStockListModelEditCtrl = ProductStockListModelEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=productStockController.js.map