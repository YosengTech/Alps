module Alps.Controllers
{
    'use strict';
	export class Supplier{
		ID:string
		Name:string
	}
	
	export interface ISupplierListScope{
		items:Supplier[];
		getSupplierList():void;

	}
	export class SupplierListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:ISupplierListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getSupplierList(){
				http.get("/api/Supplier").success(function(data:any[]){
					scope.items=<Supplier[]>data;
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getSupplierList = getSupplierList;
            getSupplierList();
		}
	}
	export interface ISupplierCreateScope{
		item:Supplier;
		createSupplier():void;
		goBack():void;
	}
	export class SupplierCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:ISupplierCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createSupplier(){
				http.post("/api/Supplier",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/Supplier");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createSupplier = createSupplier;
			scope.goBack = goBack;
		}
	}
	export interface ISupplierEditScope{
		id:string;
		item:Supplier;
		getSupplier(string):void;
		saveSupplier():void;
        deleteSupplier(): void;
		goBack():void;
	}
	export class SupplierEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window","SelectListService"];
		constructor(scope:ISupplierEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService,selectListService:Alps.Services.SelectListService){

			function getSelectList(){
			}
			function getSupplier(id){
				http.get("/api/Supplier/"+id).success(function(data:any){
					scope.item=<Supplier>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveSupplier(){
				var promise = null;
                if (id == "0")
                    promise = http.post("/api/Supplier/", scope.item);
                else
                    promise = http.put("/api/Supplier/" + id, scope.item);
                promise.success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/Supplier");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			}
			function deleteSupplier() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/Supplier/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/Supplier");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getSupplier = getSupplier;
			scope.saveSupplier = saveSupplier;
			scope.deleteSupplier = deleteSupplier;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getSelectList();
				if (id != '0') {
                    getSupplier(id);
                }
				else
					scope.item=new Supplier();
				
			}
			else{
				locationService.path("/Supplier");
			}
		}
	}

}

