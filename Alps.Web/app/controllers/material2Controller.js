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
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
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
        var MaterialEditCtrl = (function () {
            function MaterialEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getCatagoryIDSelectList() {
                    http.get("/api/Catagory").success(function (data) {
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
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function submitMaterial() {
                    if (scope.form.$dirty) {
                        alert("更改未保存");
                        return;
                    }
                    http.post("/api/Material/" + id + "/submit", {}).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Material");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteMaterial() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Material/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Material");
                        }).error(function (err) {
                            toaster.error("错误", Alps.phaseErr(err));
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                function addSubItem() {
                    scope.item.Items.push({ "MaterialID": scope.item.ID });
                }
                function deleteSubItem($index) {
                    scope.item.Items.splice($index, 1);
                }
                scope.addSubItem = addSubItem;
                scope.deleteSubItem = deleteSubItem;
                scope.getMaterial = getMaterial;
                scope.saveMaterial = saveMaterial;
                scope.deleteMaterial = deleteMaterial;
                scope.submitMaterial = submitMaterial;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getCatagoryIDSelectList();
                    if (id != '0') {
                        getMaterial(id);
                    }
                    else
                        scope.item = new Material();
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
//# sourceMappingURL=material2Controller.js.map