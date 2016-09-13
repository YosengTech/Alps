var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var WarehouseVoucher = (function () {
            function WarehouseVoucher() {
            }
            return WarehouseVoucher;
        })();
        Controllers.WarehouseVoucher = WarehouseVoucher;
        var WarehouseVoucherListCtrl = (function () {
            function WarehouseVoucherListCtrl(scope, http, toaster) {
                function getWarehouseVoucherList() {
                    http.get("/api/WarehouseVoucher").success(function (data) {
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
                scope.getWarehouseVoucherList = getWarehouseVoucherList;
                getWarehouseVoucherList();
            }
            WarehouseVoucherListCtrl.$inject = ["$scope", "$http", "toaster"];
            return WarehouseVoucherListCtrl;
        })();
        Controllers.WarehouseVoucherListCtrl = WarehouseVoucherListCtrl;
        var WarehouseVoucherEditCtrl = (function () {
            function WarehouseVoucherEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getWarehouseVoucher(id) {
                    http.get("/api/WarehouseVoucher/" + id).success(function (data) {
                        scope.item = data;
                        scope.item.CreateTime = new Date(data.CreateTime);
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveWarehouseVoucher() {
                    var promise = null;
                    if (id == "0")
                        promise = http.post("/api/WarehouseVoucher/", scope.item);
                    else
                        promise = http.put("/api/WarehouseVoucher/" + id, scope.item);
                    promise.success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/WarehouseVoucher");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function submitWarehouseVoucher() {
                    //if (scope.form.$dirty) {
                    //    alert("更改未保存");
                    //    return;
                    //}
                    http.post("/api/WarehouseVoucher/" + id + "/submit", scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/WarehouseVoucher");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteWarehouseVoucher() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/WarehouseVoucher/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/WarehouseVoucher");
                        }).error(function (err) {
                            toaster.error("错误", Alps.phaseErr(err));
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                function addSubItem() {
                    //uibModal.open({ templateUrl: "/template/home/SelectListModal", backdrop: false, controller: "SelectListModalCtrl", resolve: { selectList: function () { return scope.ProductSkuWithCatagorySelectList; } } })
                    //    .result.then(function (item) {
                    //    if (scope.item.Items == undefined)
                    //        scope.item.Items = [];
                    var newItem = {
                        "WarehouseVoucherID": scope.item.ID
                    };
                    if (scope.item.Items == undefined)
                        scope.item.Items = [];
                    scope.item.Items.push(newItem);
                    //modifySku(newItem);
                    //productSelectionChanged(newItem);
                    //});
                }
                //function modifySku(item) {
                //    uibModal.open({ templateUrl: "/template/home/SelectListModal", backdrop: true, controller: "SelectListModalCtrl", resolve: { selectList: function () { return scope.ProductSkuWithCatagorySelectList; }, selectedItem: function () { return item.ProductSkuInfo.SkuID; } } })
                //        .result.then(function (result) {
                //        item.ProductSkuInfo.SkuID = result.ID;
                //        productSelectionChanged(item);
                //    });
                //}
                function deleteSubItem($index) {
                    scope.item.Items.splice($index, 1);
                }
                function addSubItemByProductNumber(e) {
                    var keycode = window.event ? e.keyCode : e.which;
                    if (keycode == 13) {
                        e.preventDefault();
                        var codeHasExisting = false;
                        for (var p in scope.item.Items) {
                            if (scope.item.Items[p].ProductNumber == scope.inputProductNumber) {
                                codeHasExisting = true;
                                break;
                            }
                        }
                        if (codeHasExisting) {
                            toaster.error("此编号已经录入");
                            return;
                        }
                        ;
                        http.get("/api/stockinfo/" + scope.inputProductNumber).success(function (data) {
                            addSubItem();
                            var subItem = scope.item.Items[scope.item.Items.length - 1];
                            subItem.MaterialID = data.MaterialID;
                            subItem.PackingQuantity = data.PackingQuantity;
                            subItem.Quantity = data.Quantity;
                            subItem.ProductNumber = data.ProductNumber;
                            subItem.PositionID = data.PositionID;
                            scope.inputProductNumber = "";
                        }).error(function (err) {
                            toaster.error("库存中无此产品号");
                        });
                    }
                }
                function getPricingMethodSelectList() {
                    http.get("/product/getPricingMethodSelectList").success(function (data) {
                        scope.PricingMethodSelectList = data;
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
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
                //function selectNewProductSku(sku) {
                //    uibModal.open({ templateUrl: "/template/home/SelectListModal", controller: "SelectListModalCtrl", resolve: { selectList: function () { return scope.ProductSkuIDSelectList; } } })
                //        .result.then(function (item) { alert(item.name); });
                //}
                scope.pn_KeyUp = addSubItemByProductNumber;
                scope.addSubItem = addSubItem;
                scope.deleteSubItem = deleteSubItem;
                scope.getWarehouseVoucher = getWarehouseVoucher;
                scope.saveWarehouseVoucher = saveWarehouseVoucher;
                scope.deleteWarehouseVoucher = deleteWarehouseVoucher;
                scope.submitWarehouseVoucher = submitWarehouseVoucher;
                scope.goBack = goBack;
                scope.productSelectionChanged = productSelectionChanged;
                scope.reCaluAmount = reCaluAmount;
                scope.itemsGridOptions = {};
                //scope.modifySku = modifySku;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getPricingMethodSelectList();
                    //selectListService.GetSelection("Material").success(function (data) {
                    //    scope.MaterialIDSelectList = <any[]>data;
                    //});
                    selectListService.GetSelection("Position").success(function (data) {
                        scope.PositionIDSelectList = data;
                    });
                    selectListService.GetSelection("Product").success(function (data) {
                        scope.ProductIDSelectList = data;
                    });
                    selectListService.GetSelection("ProductSku").success(function (data) {
                        scope.ProductSkuIDSelectList = data;
                    });
                    selectListService.GetSelection("Supplier").success(function (data) {
                        scope.SupplierIDSelectList = data;
                    });
                    selectListService.GetSelection("Department").success(function (data) {
                        scope.DepartmentIDSelectList = data;
                    });
                    selectListService.GetSelection("ProductSkuWithCatagory").success(function (data) {
                        scope.ProductSkuWithCatagorySelectList = data;
                    });
                    if (id != '0') {
                        getWarehouseVoucher(id);
                    }
                    else
                        scope.item = new WarehouseVoucher();
                }
                else {
                    locationService.path("/WarehouseVoucher");
                }
            }
            WarehouseVoucherEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"]; //, "$uibModal"];
            return WarehouseVoucherEditCtrl;
        })();
        Controllers.WarehouseVoucherEditCtrl = WarehouseVoucherEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=warehouseVoucherController.js.map