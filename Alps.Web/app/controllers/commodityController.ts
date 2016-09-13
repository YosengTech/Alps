module Alps.Controllers
{
    'use strict';
	export class Commodity{
		ID:string
		Name:string
		Description:string
		StockQuantity:number
        ListPrice:number
		MaterialID:string
		IsFutures:boolean
		DateOfDelivery:Date
	}
	
	export interface ICommodityListScope{
		items:Commodity[];
		getCommodityList():void;

	}
	export class CommodityListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:ICommodityListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getCommodityList(){
				http.get("/api/Commodity").success(function(data:any[]){
					scope.items=<Commodity[]>data;
					for (var i = 0; i < scope.items.length; i++) {
						scope.items[i].DateOfDelivery=new Date(data[i].DateOfDelivery);
	                }
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getCommodityList = getCommodityList;
            getCommodityList();
		}
	}
	export interface ICommodityCreateScope{
		item:Commodity;
		createCommodity():void;
		goBack():void;
	}
	export class CommodityCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:ICommodityCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createCommodity(){
				http.post("/api/Commodity",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/Commodity");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createCommodity = createCommodity;
			scope.goBack = goBack;
		}
	}
	export interface ICommodityEditScope{
		id:string;
		item:Commodity;
		getCommodity(string):void;
		saveCommodity():void;
        deleteCommodity(): void;
		goBack():void;
	}
	export class CommodityEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window"];
		constructor(scope:ICommodityEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService){
			function getCommodity(id){
				http.get("/api/Commodity/"+id).success(function(data:any){
					scope.item=<Commodity>data;
					scope.item.DateOfDelivery=new Date(data.DateOfDelivery);
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveCommodity(){
				http.put("/api/Commodity/"+id,scope.item).success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/Commodity");
				}).error(function(err){
					var errMsg="";
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
			function deleteCommodity() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/Commodity/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/Commodity");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getCommodity = getCommodity;
			scope.saveCommodity = saveCommodity;
			scope.deleteCommodity = deleteCommodity;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getCommodity(id);
			}
			else{
				locationService.path("/Commodity");
			}
		}
	}

}

