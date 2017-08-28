var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Product = (function () {
            function Product() {
            }
            return Product;
        }());
        Controllers.Product = Product;
        var ProductListCtrl = (function () {
            function ProductListCtrl(scope, http, toaster) {
                function getProductList() {
                    http.get("/api/Product").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getProductList = getProductList;
                getProductList();
                //$scope.collapseAll = function () {
                //    $scope.$broadcast('angular-ui-tree:collapse-all');
                //};
                //$scope.expandAll = function () {
                //    $scope.$broadcast('angular-ui-tree:expand-all');
                //};
            }
            return ProductListCtrl;
        }());
        ProductListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.ProductListCtrl = ProductListCtrl;
        var ProductCreateCtrl = (function () {
            function ProductCreateCtrl(scope, http, toaster, locationService) {
                function createProduct() {
                    http.post("/api/Product", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Product");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createProduct = createProduct;
                scope.goBack = goBack;
            }
            return ProductCreateCtrl;
        }());
        ProductCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.ProductCreateCtrl = ProductCreateCtrl;
        var ProductEditCtrl = (function () {
            function ProductEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getProduct(id) {
                    http.get("/api/Product/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveProduct() {
                    var promise = null;
                    if (id == "0")
                        promise = http.post("/api/Product/", scope.item);
                    else
                        promise = http.put("/api/Product/" + id, scope.item);
                    promise.success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Product");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteProduct() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Product/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Product");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getProduct = getProduct;
                scope.saveProduct = saveProduct;
                scope.deleteProduct = deleteProduct;
                scope.goBack = goBack;
                scope.convertToInt = function (id) {
                    return parseInt(id);
                };
                selectListService.GetSelection("Unit").success(function (data) {
                    scope.BaseUnitIDSelectList = data;
                });
                selectListService.GetSelection("PricingMethod").success(function (data) {
                    scope.PricingMethodSelectList = data;
                });
                selectListService.GetSelection("Catagory").success(function (data) {
                    scope.CatagoryIDSelectList = data;
                });
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    if (id != '0') {
                        getProduct(id);
                    }
                }
                else {
                    locationService.path("/Product");
                }
            }
            return ProductEditCtrl;
        }());
        ProductEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        Controllers.ProductEditCtrl = ProductEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=productController.js.map