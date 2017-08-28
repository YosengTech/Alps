var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var ProductSku = (function () {
            function ProductSku() {
            }
            return ProductSku;
        }());
        Controllers.ProductSku = ProductSku;
        var ProductSkuListCtrl = (function () {
            function ProductSkuListCtrl(scope, http, toaster) {
                scope.pageSize = 10;
                scope.currentPage = 1;
                function getProductSkuList(index) {
                    http.get("/api/ProductSku?$orderby=PricingMethod&$top=" + scope.pageSize + "&$skip=" + scope.pageSize * (scope.currentPage - 1) + "&$inlinecount=allpages", { data: { "kk": "Winsan" } }).success(function (data) {
                        scope.items = data.Items;
                        scope.totalCount = data.Count;
                        for (var i = 0; i < scope.items.length; i++) {
                            scope.items[i].CreatedTime = new Date(data[i].CreatedTime);
                            scope.items[i].ModifiedTime = new Date(data[i].ModifiedTime);
                        }
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getProductSkuList = getProductSkuList;
                getProductSkuList(scope.currentPage);
            }
            return ProductSkuListCtrl;
        }());
        ProductSkuListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.ProductSkuListCtrl = ProductSkuListCtrl;
        var ProductSkuCreateCtrl = (function () {
            function ProductSkuCreateCtrl(scope, http, toaster, locationService) {
                function getProductIDSelectList() {
                    http.get("/api/Product").success(function (data) {
                        scope.ProductIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                function createProductSku() {
                    http.post("/api/ProductSku", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/ProductSku");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createProductSku = createProductSku;
                scope.goBack = goBack;
                getProductIDSelectList();
            }
            return ProductSkuCreateCtrl;
        }());
        ProductSkuCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.ProductSkuCreateCtrl = ProductSkuCreateCtrl;
        var ProductSkuEditCtrl = (function () {
            function ProductSkuEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getSelectList() {
                    selectListService.GetSelection("Product").success(function (data) {
                        scope.ProductIDSelectList = data;
                    });
                    selectListService.GetSelection("PricingMethod").success(function (data) {
                        scope.PricingMethodSelectList = data;
                    });
                }
                function getProductSku(id) {
                    http.get("/api/ProductSku/" + id).success(function (data) {
                        scope.item = data;
                        scope.item.CreatedTime = new Date(data.CreatedTime);
                        scope.item.ModifiedTime = new Date(data.ModifiedTime);
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveProductSku() {
                    var promise = null;
                    if (id == "0")
                        promise = http.post("/api/ProductSku/", scope.item);
                    else
                        promise = http.put("/api/ProductSku/" + id, scope.item);
                    promise.success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/ProductSku");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteProductSku() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/ProductSku/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/ProductSku");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getProductSku = getProductSku;
                scope.saveProductSku = saveProductSku;
                scope.deleteProductSku = deleteProductSku;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getSelectList();
                    if (id != '0') {
                        getProductSku(id);
                    }
                    else
                        scope.item = new ProductSku();
                }
                else {
                    locationService.path("/ProductSku");
                }
            }
            return ProductSkuEditCtrl;
        }());
        ProductSkuEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        Controllers.ProductSkuEditCtrl = ProductSkuEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=productSkuController.js.map