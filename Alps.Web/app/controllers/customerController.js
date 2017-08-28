var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Customer = (function () {
            function Customer() {
            }
            return Customer;
        }());
        Controllers.Customer = Customer;
        var CustomerListCtrl = (function () {
            function CustomerListCtrl(scope, http, toaster) {
                function getCustomerList() {
                    http.get("/api/Customer").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getCustomerList = getCustomerList;
                getCustomerList();
            }
            return CustomerListCtrl;
        }());
        CustomerListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.CustomerListCtrl = CustomerListCtrl;
        var CustomerCreateCtrl = (function () {
            function CustomerCreateCtrl(scope, http, toaster, locationService) {
                function createCustomer() {
                    http.post("/api/Customer", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Customer");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createCustomer = createCustomer;
                scope.goBack = goBack;
            }
            return CustomerCreateCtrl;
        }());
        CustomerCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.CustomerCreateCtrl = CustomerCreateCtrl;
        var CustomerEditCtrl = (function () {
            function CustomerEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getSelectList() {
                }
                function getCustomer(id) {
                    http.get("/api/Customer/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveCustomer() {
                    var promise = null;
                    if (id == "0")
                        promise = http.post("/api/Customer/", scope.item);
                    else
                        promise = http.put("/api/Customer/" + id, scope.item);
                    promise.success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Customer");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteCustomer() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Customer/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Customer");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getCustomer = getCustomer;
                scope.saveCustomer = saveCustomer;
                scope.deleteCustomer = deleteCustomer;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getSelectList();
                    if (id != '0') {
                        getCustomer(id);
                    }
                    else
                        scope.item = new Customer();
                }
                else {
                    locationService.path("/Customer");
                }
            }
            return CustomerEditCtrl;
        }());
        CustomerEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        Controllers.CustomerEditCtrl = CustomerEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=customerController.js.map