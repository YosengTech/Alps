module Alps.Controllers
{
    'use strict';
	export class Product{
		ID:string
		Name:string
		FullName:string
		ShortDiscription:string
		FullDiscription:string
		PackingQuantity:number
		weight:number
        Deleted: boolean
        PricingMethod:string
	}
	
	export interface IProductListScope{
		items:Product[];
		getProductList():void;

	}
	export class ProductListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IProductListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getProductList(){
				http.get("/api/Product").success(function(data:any[]){
					scope.items=<Product[]>data;
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getProductList = getProductList;
            getProductList();


            //$scope.collapseAll = function () {
            //    $scope.$broadcast('angular-ui-tree:collapse-all');
            //};

            //$scope.expandAll = function () {
            //    $scope.$broadcast('angular-ui-tree:expand-all');
            //};
		}
	}
	export interface IProductCreateScope{
		item:Product;
		createProduct():void;
		goBack():void;
	}
	export class ProductCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IProductCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createProduct(){
				http.post("/api/Product",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/Product");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createProduct = createProduct;
			scope.goBack = goBack;
		}
	}
	export interface IProductEditScope{
		id:string;
		item:Product;
		getProduct(string):void;
		saveProduct():void;
        deleteProduct(): void;
        goBack(): void;
        convertToInt(string): number;
        BaseUnitIDSelectList: any[];
        PricingMethodSelectList: any[];
        CatagoryIDSelectList: any[];
	}
	export class ProductEditCtrl{
        public static $inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window","SelectListService"];
        constructor(scope: IProductEditScope, http: ng.IHttpService, toaster: ngToaster.IToasterService, locationService: ng.ILocationService, routeParams: ng.route.IRouteParamsService, window: ng.IWindowService, selectListService:Alps.Services.SelectListService){
			function getProduct(id){
                http.get("/api/Product/"+id).success(function(data:any){
                    scope.item = <Product>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
            function saveProduct() {
                var promise = null;
                if (id == "0")
                    promise = http.post("/api/Product/", scope.item);
                else
                    promise = http.put("/api/Product/" + id, scope.item);
                promise.success(function (data) {
                    toaster.success("提示", "保存成功");
                    locationService.path("/Product");
                }).error(function (err) {
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                });
				
			}
			function deleteProduct() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/Product/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/Product");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getProduct = getProduct;
			scope.saveProduct = saveProduct;
			scope.deleteProduct = deleteProduct;
            scope.goBack = goBack;
            scope.convertToInt = function (id) {
                return parseInt(id);
            };
            selectListService.GetSelection("Unit").success(function (data) {
                scope.BaseUnitIDSelectList = <any[]>data;
            });
            selectListService.GetSelection("PricingMethod").success(function (data) {
                scope.PricingMethodSelectList = <any[]>data;
            });
            selectListService.GetSelection("Catagory").success(function (data) {
                scope.CatagoryIDSelectList = <any[]>data;
            });
            
			var id="";
			if(routeParams["id"]){
                id = routeParams["id"];
                if (id != '0') {
                    getProduct(id);
                }
			}
			else{
				locationService.path("/Product");
			}
		}
	}

}

