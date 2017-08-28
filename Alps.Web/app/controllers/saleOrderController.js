var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var SaleOrder = (function () {
            function SaleOrder() {
            }
            return SaleOrder;
        }());
        Controllers.SaleOrder = SaleOrder;
        var SaleOrderListCtrl = (function () {
            function SaleOrderListCtrl(scope, http, toaster) {
                function getSaleOrderList() {
                    http.get("/api/SaleOrder").success(function (data) {
                        scope.items = data;
                        for (var i = 0; i < scope.items.length; i++) {
                            scope.items[i].OrderTime = new Date(data[i].OrderTime);
                        }
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getSaleOrderList = getSaleOrderList;
                getSaleOrderList();
            }
            return SaleOrderListCtrl;
        }());
        SaleOrderListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.SaleOrderListCtrl = SaleOrderListCtrl;
        var SaleOrderCreateCtrl = (function () {
            function SaleOrderCreateCtrl(scope, http, toaster, locationService) {
                function getCustomerIDSelectList() {
                    http.get("/api/TradeAccount").success(function (data) {
                        scope.CustomerIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                function createSaleOrder() {
                    http.post("/api/SaleOrder", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/SaleOrder");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createSaleOrder = createSaleOrder;
                scope.goBack = goBack;
                getCustomerIDSelectList();
            }
            return SaleOrderCreateCtrl;
        }());
        SaleOrderCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.SaleOrderCreateCtrl = SaleOrderCreateCtrl;
        var SaleOrderEditCtrl = (function () {
            function SaleOrderEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getCustomerIDSelectList() {
                    http.get("/api/TradeAccount").success(function (data) {
                        scope.CustomerIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function getSaleOrder(id) {
                    http.get("/api/SaleOrder/" + id).success(function (data) {
                        scope.item = data;
                        scope.item.OrderTime = new Date(data.OrderTime);
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function getCommodityIDSelectList() {
                    http.get("/api/Commodity").success(function (data) {
                        scope.CommodityIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function saveSaleOrder() {
                    http.put("/api/SaleOrder/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/SaleOrder");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function submitSaleOrder() {
                    if (scope.form.$dirty) {
                        alert("更改未保存");
                        return;
                    }
                    http.post("/api/SaleOrder/" + id + "/submit", {}).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/SaleOrder");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteSaleOrder() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/SaleOrder/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/SaleOrder");
                        }).error(function (err) {
                            toaster.error("错误", Alps.phaseErr(err));
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                function addSubItem() {
                    scope.item.Items.push({ "SaleOrderID": scope.item.ID });
                }
                function deleteSubItem($index) {
                    scope.item.Items.splice($index, 1);
                }
                function getGoodsIDSelectList() {
                    http.get("/api/Material").success(function (data) {
                        scope.GoodsIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                scope.addSubItem = addSubItem;
                scope.deleteSubItem = deleteSubItem;
                scope.getSaleOrder = getSaleOrder;
                scope.saveSaleOrder = saveSaleOrder;
                scope.deleteSaleOrder = deleteSaleOrder;
                scope.submitSaleOrder = submitSaleOrder;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getCustomerIDSelectList();
                    getGoodsIDSelectList();
                    getCommodityIDSelectList();
                    scope.UnitIDSelectList = [1, 2];
                    selectListService.GetSelectList("Unit").success(function (data) {
                        scope.UnitIDSelectList = data;
                    });
                    ;
                    scope.UnitIDSelectList = [2, 2];
                    getSaleOrder(id);
                }
                else {
                    locationService.path("/SaleOrder");
                }
            }
            return SaleOrderEditCtrl;
        }());
        SaleOrderEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        Controllers.SaleOrderEditCtrl = SaleOrderEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=saleOrderController.js.map