var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var MaterialReceipt = (function () {
            function MaterialReceipt() {
            }
            return MaterialReceipt;
        })();
        Controllers.MaterialReceipt = MaterialReceipt;
        var MaterialReceiptListCtrl = (function () {
            function MaterialReceiptListCtrl(scope, http, toaster) {
                function getMaterialReceiptList() {
                    http.get("/api/MaterialReceipt").success(function (data) {
                        scope.items = data;
                        for (var i = 0; i < scope.items.length; i++) {
                            scope.items[i].CreateTime = new Date(data[i].CreateTime);
                        }
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getMaterialReceiptList = getMaterialReceiptList;
                getMaterialReceiptList();
            }
            MaterialReceiptListCtrl.$inject = ["$scope", "$http", "toaster"];
            return MaterialReceiptListCtrl;
        })();
        Controllers.MaterialReceiptListCtrl = MaterialReceiptListCtrl;
        var MaterialReceiptEditCtrl = (function () {
            function MaterialReceiptEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getSelectList() {
                    selectListService.GetSelection("Department").success(function (data) {
                        scope.SourceDepartmentIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                    selectListService.GetSelection("Department").success(function (data) {
                        scope.DepartmentIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function getMaterialReceipt(id) {
                    http.get("/api/MaterialReceipt/" + id).success(function (data) {
                        scope.item = data;
                        scope.item.CreateTime = new Date(data.CreateTime);
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveMaterialReceipt() {
                    var promise = null;
                    if (id == "0")
                        promise = http.post("/api/MaterialReceipt/", scope.item);
                    else
                        promise = http.put("/api/MaterialReceipt/" + id, scope.item);
                    promise.success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/MaterialReceipt");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function submitMaterialReceipt() {
                    if (scope.form.$dirty) {
                        alert("更改未保存");
                        return;
                    }
                    http.post("/api/MaterialReceipt/" + id + "/submit", {}).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/MaterialReceipt");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteMaterialReceipt() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/MaterialReceipt/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/MaterialReceipt");
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
                    scope.item.Items.push({ "MaterialReceiptID": scope.item.ID });
                }
                function deleteSubItem($index) {
                    scope.item.Items.splice($index, 1);
                }
                scope.addSubItem = addSubItem;
                scope.deleteSubItem = deleteSubItem;
                scope.getMaterialReceipt = getMaterialReceipt;
                scope.saveMaterialReceipt = saveMaterialReceipt;
                scope.deleteMaterialReceipt = deleteMaterialReceipt;
                scope.submitMaterialReceipt = submitMaterialReceipt;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getSelectList();
                    if (id != '0') {
                        getMaterialReceipt(id);
                    }
                    else
                        scope.item = new MaterialReceipt();
                }
                else {
                    locationService.path("/MaterialReceipt");
                }
            }
            MaterialReceiptEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
            return MaterialReceiptEditCtrl;
        })();
        Controllers.MaterialReceiptEditCtrl = MaterialReceiptEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=materialReceipt.js.map