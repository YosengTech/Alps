var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Position = (function () {
            function Position() {
            }
            return Position;
        }());
        Controllers.Position = Position;
        var PositionListCtrl = (function () {
            function PositionListCtrl(scope, http, toaster) {
                function getPositionList() {
                    http.get("/api/Position").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getPositionList = getPositionList;
                getPositionList();
            }
            return PositionListCtrl;
        }());
        PositionListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.PositionListCtrl = PositionListCtrl;
        var PositionCreateCtrl = (function () {
            function PositionCreateCtrl(scope, http, toaster, locationService) {
                function createPosition() {
                    http.post("/api/Position", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Position");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createPosition = createPosition;
                scope.goBack = goBack;
            }
            return PositionCreateCtrl;
        }());
        PositionCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.PositionCreateCtrl = PositionCreateCtrl;
        var PositionEditCtrl = (function () {
            function PositionEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getSelectList() {
                }
                function getPosition(id) {
                    http.get("/api/Position/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function savePosition() {
                    var promise = null;
                    if (id == "0")
                        promise = http.post("/api/Position/", scope.item);
                    else
                        promise = http.put("/api/Position/" + id, scope.item);
                    promise.success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Position");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deletePosition() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Position/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Position");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getPosition = getPosition;
                scope.savePosition = savePosition;
                scope.deletePosition = deletePosition;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getSelectList();
                    if (id != '0') {
                        getPosition(id);
                    }
                    else
                        scope.item = new Position();
                }
                else {
                    locationService.path("/Position");
                }
            }
            return PositionEditCtrl;
        }());
        PositionEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        Controllers.PositionEditCtrl = PositionEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=positionController.js.map