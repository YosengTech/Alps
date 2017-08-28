var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Supplier = (function () {
            function Supplier() {
            }
            return Supplier;
        }());
        Controllers.Supplier = Supplier;
        var SupplierListCtrl = (function () {
            function SupplierListCtrl(scope, http, toaster) {
                function getSupplierList() {
                    http.get("/api/Supplier").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getSupplierList = getSupplierList;
                getSupplierList();
            }
            return SupplierListCtrl;
        }());
        SupplierListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.SupplierListCtrl = SupplierListCtrl;
        var SupplierCreateCtrl = (function () {
            function SupplierCreateCtrl(scope, http, toaster, locationService) {
                function createSupplier() {
                    http.post("/api/Supplier", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Supplier");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createSupplier = createSupplier;
                scope.goBack = goBack;
            }
            return SupplierCreateCtrl;
        }());
        SupplierCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.SupplierCreateCtrl = SupplierCreateCtrl;
        var SupplierEditCtrl = (function () {
            function SupplierEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getSelectList() {
                }
                function getSupplier(id) {
                    http.get("/api/Supplier/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveSupplier() {
                    var promise = null;
                    if (id == "0")
                        promise = http.post("/api/Supplier/", scope.item);
                    else
                        promise = http.put("/api/Supplier/" + id, scope.item);
                    promise.success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Supplier");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteSupplier() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Supplier/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Supplier");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getSupplier = getSupplier;
                scope.saveSupplier = saveSupplier;
                scope.deleteSupplier = deleteSupplier;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getSelectList();
                    if (id != '0') {
                        getSupplier(id);
                    }
                    else
                        scope.item = new Supplier();
                }
                else {
                    locationService.path("/Supplier");
                }
            }
            return SupplierEditCtrl;
        }());
        SupplierEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        Controllers.SupplierEditCtrl = SupplierEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=supplierController.js.map