module Alps.Controllers
{
    'use strict';
	export class ProductSKU{
		ID:string
		ProductID:string
		StockQuantity:number
		Price:number
		Attributes:string
		AttributeName:string
		CreatedTime:Date
		ModifiedTime:Date
		PackingQuantity:number
		Weight:number
	}
	
	export interface IProductSKUListScope{
		items:ProductSKU[];
		getProductSKUList():void;

	}
	export class ProductSKUListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IProductSKUListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getProductSKUList(){
				http.get("/api/ProductSKU").success(function(data:any[]){
					scope.items=<ProductSKU[]>data;
					for (var i = 0; i < scope.items.length; i++) {
						scope.items[i].CreatedTime=new Date(data[i].CreatedTime);
						scope.items[i].ModifiedTime=new Date(data[i].ModifiedTime);
	                }
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getProductSKUList = getProductSKUList;
            getProductSKUList();
		}
	}
	export interface IProductSKUCreateScope{
		item:ProductSKU;
		createProductSKU():void;
		ProductIDSelectList:any[];
		goBack():void;
	}
	export class ProductSKUCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IProductSKUCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function getProductIDSelectList(){
				http.get("/api/Product").success(function(data){
					scope.ProductIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			}
			function createProductSKU(){
				http.post("/api/ProductSKU",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/ProductSKU");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createProductSKU = createProductSKU;
			scope.goBack = goBack;
				getProductIDSelectList();
		}
	}
	export interface IProductSKUEditScope{
		id:string;
		item:ProductSKU;
		getProductSKU(string):void;
		saveProductSKU():void;
        deleteProductSKU(): void;
		ProductIDSelectList:any[];
		goBack():void;
	}
	export class ProductSKUEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window"];
		constructor(scope:IProductSKUEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService){
			function getProductIDSelectList(){
				http.get("/api/Product").success(function(data){
					scope.ProductIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			}
			function getProductSKU(id){
				http.get("/api/ProductSKU/"+id).success(function(data:any){
					scope.item=<ProductSKU>data;
					scope.item.CreatedTime=new Date(data.CreatedTime);
					scope.item.ModifiedTime=new Date(data.ModifiedTime);
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveProductSKU(){
				http.put("/api/ProductSKU/"+id,scope.item).success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/ProductSKU");
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
			function deleteProductSKU() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/ProductSKU/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/ProductSKU");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getProductSKU = getProductSKU;
			scope.saveProductSKU = saveProductSKU;
			scope.deleteProductSKU = deleteProductSKU;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getProductIDSelectList();
				getProductSKU(id);
			}
			else{
				locationService.path("/ProductSKU");
			}
		}
	}

}

