var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Unit = (function () {
            function Unit() {
            }
            return Unit;
        })();
        Controllers.Unit = Unit;
        var UnitListCtrl = (function () {
            function UnitListCtrl(scope, http, toaster) {
                function getUnitList() {
                    http.get("/api/Unit").success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                scope.getUnitList = getUnitList;
                getUnitList();
            }
            UnitListCtrl.$inject = ["$scope", "$http", "toaster"];
            return UnitListCtrl;
        })();
        Controllers.UnitListCtrl = UnitListCtrl;
        var UnitCreateCtrl = (function () {
            function UnitCreateCtrl(scope, http, toaster, locationService) {
                function createUnit() {
                    http.post("/api/Unit", scope.item).success(function (data) {
                        toaster.success("提示", "创建成功");
                        locationService.path("/Unit");
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                ;
                function goBack() {
                    window.history.back();
                }
                scope.createUnit = createUnit;
                scope.goBack = goBack;
            }
            UnitCreateCtrl.$inject = ["$scope", "$http", "toaster", "$location"];
            return UnitCreateCtrl;
        })();
        Controllers.UnitCreateCtrl = UnitCreateCtrl;
        var UnitEditCtrl = (function () {
            function UnitEditCtrl(scope, http, toaster, locationService, routeParams, window) {
                function getUnit(id) {
                    http.get("/api/Unit/" + id).success(function (data) {
                        scope.item = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                function saveUnit() {
                    http.put("/api/Unit/" + id, scope.item).success(function (data) {
                        toaster.success("提示", "保存成功");
                        locationService.path("/Unit");
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
                function deleteUnit() {
                    if (confirm("确认要删除?")) {
                        http.delete("/api/Unit/" + id).success(function (data) {
                            toaster.success("提示", "删除成功");
                            locationService.path("/Unit");
                        }).error(function (err) {
                            toaster.error("错误", err.Message);
                        });
                    }
                }
                function goBack() {
                    window.history.back();
                }
                scope.getUnit = getUnit;
                scope.saveUnit = saveUnit;
                scope.deleteUnit = deleteUnit;
                scope.goBack = goBack;
                var id = "";
                if (routeParams["id"]) {
                    id = routeParams["id"];
                    getUnit(id);
                }
                else {
                    locationService.path("/Unit");
                }
            }
            UnitEditCtrl.$inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window"];
            return UnitEditCtrl;
        })();
        Controllers.UnitEditCtrl = UnitEditCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
/*
<div class="page page-form-validation clearfix">


    <ol class="breadcrumb breadcrumb-small">
        <li>Forms</li>
        <li class="active"><a href="#/Unit">Unit</a></li>
    </ol>
    <div class="page-wrap">
        <div class="row">
        
<p>
    <a  class="btn btn-default btn-sm" href="#/Unit/Create"><span class="glyphicon glyphicon-plus"></span>&nbsp;新建</a>
</p>
<table class="table">
    <tr>
        <th>
            @Html.DisplayNameFor(model => model.Name)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.Group)
        </th>
        <th></th>
    </tr>

    <tr ng-repeat="item in items">
        <td>
            {{item.Name}}
        </td>
        <td>
            {{item.Group}}
        </td>
        <td>
         <a class="btn btn-default btn-sm" href="#/Unit/Edit/{{item.ID}}"><span class="glyphicon glyphicon-pencil"></span>&nbsp;编辑</a>
         <a class="btn btn-default btn-sm" href="#/Unit/Delete/{{item.ID}}"><span class="glyphicon glyphicon-trash"></span>&nbsp;删除</a>
        </td>
    </tr>

</table>
</div>
    </div>

</div>
*/
//# sourceMappingURL=unit.js.map