var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var PurchaseOrder = (function () {
            function PurchaseOrder() {
            }
            return PurchaseOrder;
        })();
        Controllers.PurchaseOrder = PurchaseOrder;
        var PurchaseOrderListCtrl = (function () {
            function PurchaseOrderListCtrl(scope, http, toaster) {
                function getPurchaseOrderList() {
                    http.get("/api/PurchaseOrder").success(function (data) {
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
                scope.getPurchaseOrderList = getPurchaseOrderList;
                getPurchaseOrderList();
            }
            PurchaseOrderListCtrl.$inject = ["$scope", "$http", "toaster"];
            return PurchaseOrderListCtrl;
        })();
        Controllers.PurchaseOrderListCtrl = PurchaseOrderListCtrl;
        var PurchaseOrderEditCtrl = (function () {
            function PurchaseOrderEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getPurchaseOrder(id) {
                    http.get("/api/PurchaseOrder/" + id).success(function (data) {
                        scope.item = data;
                        scope.item.OrderTime = new Date(data.OrderTime);
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function savePurchaseOrder() {
                    http.put("/api/PurchaseOrder/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/PurchaseOrder");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function submitPurchaseOrder() {
                    if (scope.form.$dirty) {
                        alert("更改未保存");
                        return;
                    }
                    http.post("/api/PurchaseOrder/" + id + "/submit", {}).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/PurchaseOrder");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deletePurchaseOrder() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/PurchaseOrder/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/PurchaseOrder");
                        }).error(function (err) {
                            toaster.error("错误", Alps.phaseErr(err));
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                function addSubItem() {
                    if (scope.item.Items == undefined)
                        scope.item.Items = [];
                    scope.item.Items.push({ "PurchaseOrderID": scope.item.ID });
                }
                function deleteSubItem($index) {
                    scope.item.Items.splice($index, 1);
                }
                scope.addSubItem = addSubItem;
                scope.deleteSubItem = deleteSubItem;
                scope.getPurchaseOrder = getPurchaseOrder;
                scope.savePurchaseOrder = savePurchaseOrder;
                scope.deletePurchaseOrder = deletePurchaseOrder;
                scope.submitPurchaseOrder = submitPurchaseOrder;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    if (id != '0') {
                        getPurchaseOrder(id);
                    }
                    else
                        scope.item = new PurchaseOrder();
                }
                else {
                    locationService.path("/PurchaseOrder");
                }
            }
            PurchaseOrderEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window"];
            return PurchaseOrderEditCtrl;
        })();
        Controllers.PurchaseOrderEditCtrl = PurchaseOrderEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=purchaseOrderCntroller.js.map