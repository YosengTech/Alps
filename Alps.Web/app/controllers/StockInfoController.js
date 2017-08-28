var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var StockInfoViewModel = (function () {
            function StockInfoViewModel() {
            }
            return StockInfoViewModel;
        }());
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
            return StockInfoListCtrl;
        }());
        StockInfoListCtrl.$inject = ["$scope", "$http", "toaster", "SelectListService"];
        Controllers.StockInfoListCtrl = StockInfoListCtrl;
        //export interface IStockInfoViewModelCreateScope{
        //	item:StockInfoViewModel;
        //	createStockInfoViewModel():void;
        //	goBack():void;
        //}
        //export class StockInfoViewModelCreateCtrl{
        //	public static $inject=["$scope","$http","toaster","$location"];
        //	constructor(scope:IStockInfoViewModelCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
        //		function createStockInfoViewModel(){
        //			http.post("/api/StockInfoViewModel",scope.item).success(function(data){
        //				toaster.success("提示","创建成功");
        //				locationService.path("/StockInfoViewModel");
        //			}).error(function(err){
        //				var errMsg="";
        //                if (err.ModelState) {
        //                    errMsg = "<ul>";
        //                    for (var p in err.ModelState) {
        //                        errMsg = errMsg + "<li>" + err.ModelState[p][0] + "</li>";
        //                    }
        //                    errMsg = errMsg + "</ul>";
        //                }
        //                if (errMsg == "") {
        //                    errMsg = err.Message;
        //                }
        //                toaster.pop("error", "错误", errMsg, 3000, "trustedHtml");
        //			});
        //		};
        //		function goBack() {
        //            window.history.back();
        //        }
        //        scope.createStockInfoViewModel = createStockInfoViewModel;
        //		scope.goBack = goBack;
        //	}
        //}
        //export interface IStockInfoViewModelEditScope{
        //	id:string;
        //	item:StockInfoViewModel;
        //	getStockInfoViewModel(string):void;
        //	saveStockInfoViewModel():void;
        //    deleteStockInfoViewModel(): void;
        //	goBack():void;
        //}
        //export class StockInfoViewModelEditCtrl{
        //	public static $inject=["$scope","$http","toaster","$location","$routeParams","$window"];
        //	constructor(scope:IStockInfoViewModelEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService){
        //		function getStockInfoViewModel(id){
        //			http.get("/api/StockInfoViewModel/"+id).success(function(data:any){
        //				scope.item=<StockInfoViewModel>data;
        //				toaster.success("提示","载入成功");
        //			}).error(function(data){
        //				toaster.error("错误",data.Message);
        //			});
        //		};
        //		function saveStockInfoViewModel(){
        //			http.put("/api/StockInfoViewModel/"+id,scope.item).success(function(data){
        //				toaster.success("提示","保存成功");
        //				locationService.path("/StockInfoViewModel");
        //			}).error(function(err){
        //				var errMsg="";
        //                if (err.ModelState) {
        //                    errMsg = "<ul>";
        //                    for (var p in err.ModelState) {
        //                        errMsg = errMsg + "<li>" + err.ModelState[p][0] + "</li>";
        //                    }
        //                    errMsg = errMsg + "</ul>";
        //                }
        //                if (errMsg == "") {
        //                    errMsg = err.Message;
        //                }
        //                toaster.pop("error", "错误", errMsg, 3000, "trustedHtml");
        //			});
        //		}
        //		function deleteStockInfoViewModel() {
        //		    if (confirm("确认要删除?")) {
        //				http.delete("/api/StockInfoViewModel/" + id).success(function (data) {
        //					toaster.success("提示", "删除成功");
        //					locationService.path("/StockInfoViewModel");
        //				}).error(function (err) {
        //					toaster.error("错误", err.Message);
        //				});
        //			}
        //        }
        //		function goBack() {
        //            window.history.back();
        //        }
        //        scope.getStockInfoViewModel = getStockInfoViewModel;
        //		scope.saveStockInfoViewModel = saveStockInfoViewModel;
        //		scope.deleteStockInfoViewModel = deleteStockInfoViewModel;
        //		scope.goBack=goBack;
        //		var id="";
        //		if(routeParams["id"]){
        //			id=routeParams["id"];
        //			getStockInfoViewModel(id);
        //		}
        //		else{
        //			locationService.path("/StockInfoViewModel");
        //		}
        //	}
        //}
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=StockInfoController.js.map