/// <reference path="../app.ts" />
/// <reference path="../../scripts/_all.ts" />
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
                    }).error(function (data) {
                        //toaster.error("错误", data.Message);
                        toaster.error("错误", Alps.phaseErr(data));
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
        var WarehouseVoucherCreateCtrl = (function () {
            function WarehouseVoucherCreateCtrl(scope, http, toaster, locationService) {
                function getSourceIDSelectList() {
                    http.get("/api/TradeAccount").success(function (data) {
                        scope.SourceIDSelectList = data;
                    }).error(function (err) {
                        toaster.error(Alps.phaseErr(err));
                    });
                }
                function getDestinationIDSelectList() {
                    http.get("/api/TradeAccount").success(function (data) {
                        scope.DestinationIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function createWarehouseVoucher() {
                    http.post("/api/WarehouseVoucher", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/WarehouseVoucher");
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
                scope.createWarehouseVoucher = createWarehouseVoucher;
                scope.goBack = goBack;
                getSourceIDSelectList();
                getDestinationIDSelectList();
            }
            WarehouseVoucherCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
            return WarehouseVoucherCreateCtrl;
        })();
        Controllers.WarehouseVoucherCreateCtrl = WarehouseVoucherCreateCtrl;
        var WarehouseVoucherEditCtrl = (function () {
            function WarehouseVoucherEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getSourceIDSelectList() {
                    http.get("/api/TradeAccount").success(function (data) {
                        scope.SourceIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function getDestinationIDSelectList() {
                    http.get("/api/TradeAccount").success(function (data) {
                        scope.DestinationIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function getMaterialIDSelectList() {
                    http.get("/api/Material").success(function (data) {
                        scope.MaterialIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function getPositionIDSelectList() {
                    http.get("/api/Position").success(function (data) {
                        scope.PositionIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function getWarehouseVoucher(id) {
                    http.get("/api/WarehouseVoucher/" + id).success(function (data) {
                        scope.item = data;
                        scope.item.CreateTime = new Date(data.CreateTime);
                        if (scope.item.Items === null) {
                            scope.item.Items = [];
                        }
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveWarehouseVoucher() {
                    http.put("/api/WarehouseVoucher/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/WarehouseVoucher");
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
                function submitWarehouseVoucher() {
                    if (scope.form.$dirty) {
                        alert("更改未保存");
                        return;
                    }
                    http.post("/api/WarehouseVoucher/" + id + "/submit", {}).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/WarehouseVoucher");
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
                            errMsg = err.ExceptionMessage;
                        }
                        toaster.pop("error", "错误", errMsg, 3000, "trustedHtml");
                    });
                }
                function deleteWarehouseVoucher() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/WarehouseVoucher/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/WarehouseVoucher");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                function addSubItem() {
                    scope.item.Items.push({ "WarehouseVoucherID": scope.item.ID });
                }
                function deleteSubItem($index) {
                    scope.item.Items.splice($index, 1);
                }
                scope.addSubItem = addSubItem;
                scope.deleteSubItem = deleteSubItem;
                scope.getWarehouseVoucher = getWarehouseVoucher;
                scope.saveWarehouseVoucher = saveWarehouseVoucher;
                scope.deleteWarehouseVoucher = deleteWarehouseVoucher;
                scope.goBack = goBack;
                scope.submitWarehouseVoucher = submitWarehouseVoucher;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getSourceIDSelectList();
                    getDestinationIDSelectList();
                    getMaterialIDSelectList();
                    getPositionIDSelectList();
                    if (id != '0') {
                        getWarehouseVoucher(id);
                    }
                    else {
                        scope.item = new WarehouseVoucher();
                        scope.item.Creater = "FF";
                        scope.item.CreateTime = new Date();
                        scope.item.Items = [];
                    }
                }
                else {
                    locationService.path("/WarehouseVoucher");
                }
            }
            WarehouseVoucherEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window"];
            return WarehouseVoucherEditCtrl;
        })();
        Controllers.WarehouseVoucherEditCtrl = WarehouseVoucherEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=warehouseVoucherController.js.map