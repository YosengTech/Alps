var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Department = (function () {
            function Department() {
            }
            return Department;
        }());
        Controllers.Department = Department;
        var DepartmentListCtrl = (function () {
            function DepartmentListCtrl(scope, http, toaster) {
                function getDepartmentList() {
                    http.get("/api/Department").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
                ;
                scope.getDepartmentList = getDepartmentList;
                getDepartmentList();
            }
            return DepartmentListCtrl;
        }());
        DepartmentListCtrl.$inject = ["$scope", "$http", "toaster"];
        Controllers.DepartmentListCtrl = DepartmentListCtrl;
        var DepartmentCreateCtrl = (function () {
            function DepartmentCreateCtrl(scope, http, toaster, locationService) {
                function createDepartment() {
                    http.post("/api/Department", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Department");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createDepartment = createDepartment;
                scope.goBack = goBack;
            }
            return DepartmentCreateCtrl;
        }());
        DepartmentCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
        Controllers.DepartmentCreateCtrl = DepartmentCreateCtrl;
        var DepartmentEditCtrl = (function () {
            function DepartmentEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getSelectList() {
                }
                function getDepartment(id) {
                    http.get("/api/Department/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveDepartment() {
                    var promise = null;
                    if (id == "0")
                        promise = http.post("/api/Department/", scope.item);
                    else
                        promise = http.put("/api/Department/" + id, scope.item);
                    promise.success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Department");
                    }).error(function (err) {
                        toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                    });
                }
                function deleteDepartment() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Department/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Department");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getDepartment = getDepartment;
                scope.saveDepartment = saveDepartment;
                scope.deleteDepartment = deleteDepartment;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getSelectList();
                    if (id != '0') {
                        getDepartment(id);
                    }
                    else
                        scope.item = new Department();
                }
                else {
                    locationService.path("/Department");
                }
            }
            return DepartmentEditCtrl;
        }());
        DepartmentEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        Controllers.DepartmentEditCtrl = DepartmentEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=departmentController.js.map