var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Material = (function () {
            function Material() {
            }
            return Material;
        })();
        Controllers.Material = Material;
        var MaterialListCtrl = (function () {
            function MaterialListCtrl(scope, http, toaster) {
                function getMaterialList() {
                    http.get("/api/Material").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", Alps.phaseErr(data));
                    });
                }
                ;
                scope.getMaterialList = getMaterialList;
                getMaterialList();
            }
            MaterialListCtrl.$inject = ["$scope", "$http", "toaster"];
            return MaterialListCtrl;
        })();
        Controllers.MaterialListCtrl = MaterialListCtrl;
        var MaterialCreateCtrl = (function () {
            function MaterialCreateCtrl(scope, http, toaster, locationService) {
                function getCatagoryIDSelectList() {
                    http.get("/api/Catagory").success(function (data) {
                        scope.CatagoryIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function createMaterial() {
                    http.post("/api/Material", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Material");
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
                scope.createMaterial = createMaterial;
                scope.goBack = goBack;
                getCatagoryIDSelectList();
            }
            MaterialCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
            return MaterialCreateCtrl;
        })();
        Controllers.MaterialCreateCtrl = MaterialCreateCtrl;
        var MaterialEditCtrl = (function () {
            function MaterialEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getCatagoryIDSelectList() {
                    http.get("/selectlist/getcatagory").success(function (data) {
                        scope.CatagoryIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function getMaterial(id) {
                    http.get("/api/Material/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveMaterial() {
                    http.put("/api/Material/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Material");
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
                function deleteMaterial() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Material/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Material");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getMaterial = getMaterial;
                scope.saveMaterial = saveMaterial;
                scope.deleteMaterial = deleteMaterial;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getCatagoryIDSelectList();
                    getMaterial(id);
                }
                else {
                    locationService.path("/Material");
                }
            }
            MaterialEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window"];
            return MaterialEditCtrl;
        })();
        Controllers.MaterialEditCtrl = MaterialEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=MaterialController.js.map