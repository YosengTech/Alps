var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Catagory = (function () {
            function Catagory() {
            }
            return Catagory;
        })();
        Controllers.Catagory = Catagory;
        var CatagoryListCtrl = (function () {
            function CatagoryListCtrl(scope, http, toaster) {
                function getCatagoryList() {
                    http.get("/api/Catagory").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", Alps.phaseErr(data));
                    });
                }
                ;
                scope.getCatagoryList = getCatagoryList;
                getCatagoryList();
            }
            CatagoryListCtrl.$inject = ["$scope", "$http", "toaster"];
            return CatagoryListCtrl;
        })();
        Controllers.CatagoryListCtrl = CatagoryListCtrl;
        var CatagoryCreateCtrl = (function () {
            function CatagoryCreateCtrl(scope, http, toaster, locationService, selectListService) {
                function getParentIDSelectList() {
                    selectListService.GetSelection("catagory").success(function (data) {
                        scope.ParentIDSelectList = data;
                    });
                }
                function createCatagory() {
                    http.post("/api/Catagory", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Catagory");
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createCatagory = createCatagory;
                scope.goBack = goBack;
                getParentIDSelectList();
            }
            CatagoryCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location", "SelectListService"];
            return CatagoryCreateCtrl;
        })();
        Controllers.CatagoryCreateCtrl = CatagoryCreateCtrl;
        var CatagoryEditCtrl = (function () {
            function CatagoryEditCtrl(scope, http, toaster, locationService, routeParams, window, selectListService) {
                function getParentIDSelectList() {
                    selectListService.GetSelection("catagory").success(function (data) {
                        scope.ParentIDSelectList = data;
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function getCatagory(id) {
                    http.get("/api/Catagory/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveCatagory() {
                    http.put("/api/Catagory/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Catagory");
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function deleteCatagory() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Catagory/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Catagory");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getCatagory = getCatagory;
                scope.saveCatagory = saveCatagory;
                scope.deleteCatagory = deleteCatagory;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getParentIDSelectList();
                    getCatagory(id);
                }
                else {
                    locationService.path("/Catagory");
                }
            }
            CatagoryEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
            return CatagoryEditCtrl;
        })();
        Controllers.CatagoryEditCtrl = CatagoryEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=catagoryController.js.map