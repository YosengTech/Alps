var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var StockInfoViewModel = (function () {
            function StockInfoViewModel() {
            }
            return StockInfoViewModel;
        })();
        Controllers.StockInfoViewModel = StockInfoViewModel;
        var StockInfoListCtrl = (function () {
            function StockInfoListCtrl(scope, http, toaster, selectListService) {
                function getStockInfoViewModelList(id) {
                    http.get("/api/StockInfo/" + id).success(function (data) {
                        scope.items = data;
                        toaster.success("提示", "载入成功");
                    }).error(function (data) {
                        toaster.error("错误", data.Message);
                    });
                }
                ;
                scope.getStockInfoViewModelList = getStockInfoViewModelList;
                selectListService.GetSelection("Catagory").success(function (data) {
                    scope.CatagorySelectList = data;
                    if (scope.CatagorySelectList.length > 0) {
                        getStockInfoViewModelList(scope.CatagorySelectList[0].ID);
                    }
                });
            }
            StockInfoListCtrl.$inject = ["$scope", "$http", "toaster", "SelectListService"];
            return StockInfoListCtrl;
        })();
        Controllers.StockInfoListCtrl = StockInfoListCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=StockInfoController.js.map