var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Catagory = (function () {
            function Catagory() {
            }
            return Catagory;
        }());
        Controllers.Catagory = Catagory;
        var CatagoryListCtrl = (function () {
            function CatagoryListCtrl(scope, http, toaster, routeParams) {
                function getCatagoryList() {
                    http.get("/api/Catagory").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", Alps.phaseErr(data));
                    });
                }
                ;
                function GetCatagoriesByParentID(id) {
                    http.get("/action/catagory/GetCatagoriesByParentID/" + id).success(function (data) {
                        scope.items = data;
                        scope.currentParentID = id;
                        toaster.success("提示", "载入成功");
                    }).error(function (errData) {
                        toaster.error("错误", Alps.phaseErr(errData));
                    });
                }
                //scope.getCatagoryList = getCatagoryList;
                GetCatagoriesByParentID(null);
                scope.GetCatagoriesByParentID = GetCatagoriesByParentID;
                scope.remove = function (scope) {
                    scope.remove();
                };
                scope.toggle = function (scope) {
                    scope.toggle();
                };
                scope.newSubItem = function (scope) {
                    var nodeData = scope.$modelValue;
                    if (nodeData.nodes == undefined)
                        nodeData.nodes = [];
                    nodeData.nodes.push({
                        id: nodeData.id * 10 + nodeData.nodes.length,
                        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                        nodes: []
                    });
                };
            }
            return CatagoryListCtrl;
        }());
        CatagoryListCtrl.$inject = ["$scope", "$http", "toaster", "$routeParams"];
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
            return CatagoryCreateCtrl;
        }());
        CatagoryCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location", "SelectListService"];
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
            return CatagoryEditCtrl;
        }());
        CatagoryEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        Controllers.CatagoryEditCtrl = CatagoryEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=catagoryController.js.map