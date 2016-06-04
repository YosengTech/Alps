var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Commodity = (function () {
            function Commodity() {
            }
            return Commodity;
        })();
        Controllers.Commodity = Commodity;
        var CommodityListCtrl = (function () {
            function CommodityListCtrl(scope, http, toaster) {
                function getCommodityList() {
                    http.get("/api/Commodity").success(function (data) {
                        scope.items = data;
                        for (var i = 0; i < scope.items.length; i++) {
                            scope.items[i].DateOfDelivery = new Date(data[i].DateOfDelivery);
                        }
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getCommodityList = getCommodityList;
                getCommodityList();
            }
            CommodityListCtrl.$inject = ["$scope", "$http", "toaster"];
            return CommodityListCtrl;
        })();
        Controllers.CommodityListCtrl = CommodityListCtrl;
        var CommodityCreateCtrl = (function () {
            function CommodityCreateCtrl(scope, http, toaster, locationService) {
                function createCommodity() {
                    http.post("/api/Commodity", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Commodity");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createCommodity = createCommodity;
                scope.goBack = goBack;
            }
            CommodityCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
            return CommodityCreateCtrl;
        })();
        Controllers.CommodityCreateCtrl = CommodityCreateCtrl;
        var CommodityEditCtrl = (function () {
            function CommodityEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getCommodity(id) {
                    http.get("/api/Commodity/" + id).success(function (data) {
                        scope.item = data;
                        scope.item.DateOfDelivery = new Date(data.DateOfDelivery);
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveCommodity() {
                    http.put("/api/Commodity/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Commodity");
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
                function deleteCommodity() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Commodity/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Commodity");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getCommodity = getCommodity;
                scope.saveCommodity = saveCommodity;
                scope.deleteCommodity = deleteCommodity;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getCommodity(id);
                }
                else {
                    locationService.path("/Commodity");
                }
            }
            CommodityEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window"];
            return CommodityEditCtrl;
        })();
        Controllers.CommodityEditCtrl = CommodityEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=commodityController.js.map