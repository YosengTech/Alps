module Alps.Controllers
{
    'use strict';
	export class ProductStockListModel{
		ID:string
		ProductName:string
		Quantity:number
		Weight:number
		PositionName:string
		OwnerName:string
        ProductNumber: string
	}
	
	export interface IProductStockListModelListScope{
		items:ProductStockListModel[];
        getProductStockListModelList(pageIndex): void;
        totalCount: number;
        currentPage: number;
        pageSize: number;
	}
	export class ProductStockListModelListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IProductStockListModelListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getProductStockListModelList(pageIndex){
				http.get("/api/ProductStock?pageIndex="+pageIndex).success(function(data:any){
                    scope.items = <ProductStockListModel[]>data.data;
                    scope.totalCount = data.totalcount;
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
            };
            scope.pageSize = 10;
            scope.getProductStockListModelList = getProductStockListModelList;
            getProductStockListModelList(1);
		}
	}
	export interface IProductStockListModelCreateScope{
		item:ProductStockListModel;
		createProductStockListModel():void;
		goBack():void;
	}
	export class ProductStockListModelCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IProductStockListModelCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createProductStockListModel(){
				http.post("/api/ProductStockListModel",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/ProductStockListModel");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createProductStockListModel = createProductStockListModel;
			scope.goBack = goBack;
		}
	}
	export interface IProductStockListModelEditScope{
		id:string;
		item:ProductStockListModel;
		getProductStockListModel(string):void;
		saveProductStockListModel():void;
        deleteProductStockListModel(): void;
		goBack():void;
	}
	export class ProductStockListModelEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window"];
		constructor(scope:IProductStockListModelEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService){
			function getProductStockListModel(id){
				http.get("/api/ProductStockListModel/"+id).success(function(data:any){
					scope.item=<ProductStockListModel>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveProductStockListModel(){
				http.put("/api/ProductStockListModel/"+id,scope.item).success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/ProductStockListModel");
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
			function deleteProductStockListModel() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/ProductStockListModel/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/ProductStockListModel");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getProductStockListModel = getProductStockListModel;
			scope.saveProductStockListModel = saveProductStockListModel;
			scope.deleteProductStockListModel = deleteProductStockListModel;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getProductStockListModel(id);
			}
			else{
				locationService.path("/ProductStockListModel");
			}
		}
	}
}

