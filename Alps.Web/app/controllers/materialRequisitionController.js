var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var MaterialRequisition = (function () {
            function MaterialRequisition() {
            }
            return MaterialRequisition;
        }());
        Controllers.MaterialRequisition = MaterialRequisition;
        var MaterialRequisitionListCtrl = (function () {
            function MaterialRequisitionListCtrl(scope, http, toaster) {
                function getMaterialRequisitionList() {
                    http.get("/api/MaterialRequisition").success(function (data) {
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
                scope.getMaterialRequisitionList = getMaterialRequisitionList;
                getMaterialRequisitionList();
            }
            return MaterialRequisitionListCtrl;
        }());
        MaterialRequisitionListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.MaterialRequisitionListCtrl = MaterialRequisitionListCtrl;
        var MaterialRequisitionEditCtrl = (function () {
            function MaterialRequisitionEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getSelectList() {
                    selectListService.GetSelection("Department").success(function (data) {
                        scope.RequisitionDepartmentIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                    selectListService.GetSelection("Department").success(function (data) {
                        scope.DepartmentIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                    selectListService.GetSelection("ProductSku").success(function (data) {
                        scope.ProductSkuIDSelectList = data;
                    });
                    selectListService.GetSelection("Position").success(function (data) {
                        scope.PositionIDSelectList = data;
                    });
                    selectListService.GetSelection("ProductSkuWithCatagory").success(function (data) {
                        scope.ProductSkuWithCatagorySelectList = data;
                    });
                }
                function getMaterialRequisition(id) {
                    http.get("/api/MaterialRequisition/" + id).success(function (data) {
                        scope.item = data;
                        scope.item.CreateTime = new Date(data.CreateTime);
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveMaterialRequisition() {
                    var promise = null;
                    if (id == "0")
                        promise = http.post("/api/MaterialRequisition/", scope.item);
                    else
                        promise = http.put("/api/MaterialRequisition/" + id, scope.item);
                    promise.success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/MaterialRequisition");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function submitMaterialRequisition() {
                    //if (scope.form.$dirty) {
                    //    alert("更改未保存");
                    //    return;
                    //}
                    http.post("/api/MaterialRequisition/" + id + "/submit", scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/MaterialRequisition");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteMaterialRequisition() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/MaterialRequisition/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/MaterialRequisition");
                        }).error(function (err) {
                            toaster.error("错误", Alps.phaseErr(err));
                        });
                    }
                }
                function productSelectionChanged(item) {
                    var value = item.ProductSkuInfo;
                    if (value && value.SkuID) {
                        for (var i = 0; i < scope.ProductSkuIDSelectList.length; i++) {
                            if (scope.ProductSkuIDSelectList[i].SkuID === value.SkuID) {
                                value.Name = scope.ProductSkuIDSelectList[i].Name;
                                value.PricingMethod = scope.ProductSkuIDSelectList[i].PricingMethod;
                                reCaluAmount(item);
                                break;
                            }
                        }
                    }
                }
                function reCaluAmount(item) {
                    if (item.ProductSkuInfo.PricingMethod === 0)
                        item.Amount = item.Quantity * item.Price;
                    else
                        item.Amount = item.Weight * item.Price;
                }
                function goBack() {
                    window.history.back();
                }
                function addSubItem() {
                    if (scope.item.Items == undefined)
                        scope.item.Items = [];
                    scope.item.Items.push({ "MaterialRequisitionID": scope.item.ID });
                }
                function deleteSubItem($index) {
                    scope.item.Items.splice($index, 1);
                }
                scope.addSubItem = addSubItem;
                scope.deleteSubItem = deleteSubItem;
                scope.getMaterialRequisition = getMaterialRequisition;
                scope.saveMaterialRequisition = saveMaterialRequisition;
                scope.deleteMaterialRequisition = deleteMaterialRequisition;
                scope.submitMaterialRequisition = submitMaterialRequisition;
                scope.goBack = goBack;
                scope.productSelectionChanged = productSelectionChanged;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getSelectList();
                    if (id != '0') {
                        getMaterialRequisition(id);
                    }
                    else
                        scope.item = new MaterialRequisition();
                }
                else {
                    locationService.path("/MaterialRequisition");
                }
            }
            return MaterialRequisitionEditCtrl;
        }());
        MaterialRequisitionEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        Controllers.MaterialRequisitionEditCtrl = MaterialRequisitionEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=materialRequisitionController.js.map