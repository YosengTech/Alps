module Alps.Controllers
{
    'use strict';
	export class ProductSku{
		ID:string
		ProductID:string
		Description:string
		StockQuantity:number
		StockWeight:number
		Price:number
		Attributes:string
		AttributeName:string
		CreatedTime:Date
		ModifiedTime:Date
		PricingMethod:number
	}
	
	export interface IProductSkuListScope{
		items:ProductSku[];
		getProductSkuList():void;

	}
	export class ProductSkuListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IProductSkuListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getProductSkuList(){
				http.get("/api/ProductSku").success(function(data:any[]){
					scope.items=<ProductSku[]>data;
					for (var i = 0; i < scope.items.length; i++) {
						scope.items[i].CreatedTime=new Date(data[i].CreatedTime);
						scope.items[i].ModifiedTime=new Date(data[i].ModifiedTime);
	                }
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getProductSkuList = getProductSkuList;
            getProductSkuList();
		}
	}
	export interface IProductSkuCreateScope{
		item:ProductSku;
		createProductSku():void;
		ProductIDSelectList:any[];
		goBack():void;
	}
	export class ProductSkuCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IProductSkuCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function getProductIDSelectList(){
				http.get("/api/Product").success(function(data){
					scope.ProductIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			}
			function createProductSku(){
				http.post("/api/ProductSku",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/ProductSku");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createProductSku = createProductSku;
			scope.goBack = goBack;
				getProductIDSelectList();
		}
	}
	export interface IProductSkuEditScope{
		id:string;
		item:ProductSku;
		getProductSku(string):void;
		saveProductSku():void;
        deleteProductSku(): void;
		ProductIDSelectList:any[];
        goBack(): void;
        PricingMethodSelectList: any[];
	}
	export class ProductSkuEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window","SelectListService"];
		constructor(scope:IProductSkuEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService,selectListService:Alps.Services.SelectListService){

			function getSelectList(){
				selectListService.GetSelection("Product").success(function (data) {
						scope.ProductIDSelectList = <any[]>data;
                });
                selectListService.GetSelection("PricingMethod").success(function (data) {
                    scope.PricingMethodSelectList = <any[]>data;
                });
			}
			function getProductSku(id){
				http.get("/api/ProductSku/"+id).success(function(data:any){
					scope.item=<ProductSku>data;
					scope.item.CreatedTime=new Date(data.CreatedTime);
					scope.item.ModifiedTime=new Date(data.ModifiedTime);
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveProductSku(){
				var promise = null;
                if (id == "0")
                    promise = http.post("/api/ProductSku/", scope.item);
                else
                    promise = http.put("/api/ProductSku/" + id, scope.item);
                promise.success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/ProductSku");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			}
			function deleteProductSku() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/ProductSku/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/ProductSku");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getProductSku = getProductSku;
			scope.saveProductSku = saveProductSku;
			scope.deleteProductSku = deleteProductSku;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getSelectList();
				if (id != '0') {
                    getProductSku(id);
                }
				else
					scope.item=new ProductSku();
				
			}
			else{
				locationService.path("/ProductSku");
			}
		}
	}

}

