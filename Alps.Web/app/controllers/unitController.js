var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Unit = (function () {
            function Unit() {
            }
            return Unit;
        }());
        Controllers.Unit = Unit;
        var UnitListCtrl = (function () {
            function UnitListCtrl(scope, http, toaster) {
                function getUnitList() {
                    http.get("/api/Unit").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getUnitList = getUnitList;
                getUnitList();
            }
            return UnitListCtrl;
        }());
        UnitListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.UnitListCtrl = UnitListCtrl;
        var UnitCreateCtrl = (function () {
            function UnitCreateCtrl(scope, http, toaster, locationService) {
                function createUnit() {
                    http.post("/api/Unit", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Unit");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createUnit = createUnit;
                scope.goBack = goBack;
            }
            return UnitCreateCtrl;
        }());
        UnitCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.UnitCreateCtrl = UnitCreateCtrl;
        var UnitEditCtrl = (function () {
            function UnitEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getUnit(id) {
                    http.get("/api/Unit/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveUnit() {
                    http.put("/api/Unit/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Unit");
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
                function deleteUnit() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Unit/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Unit");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getUnit = getUnit;
                scope.saveUnit = saveUnit;
                scope.deleteUnit = deleteUnit;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getUnit(id);
                }
                else {
                    locationService.path("/Unit");
                }
            }
            return UnitEditCtrl;
        }());
        UnitEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window"];
        Controllers.UnitEditCtrl = UnitEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=unitController.js.map