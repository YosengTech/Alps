module Alps.Controllers
{
    'use strict';
	export class Customer{
		ID:string
		Name:string
	}
	
	export interface ICustomerListScope{
		items:Customer[];
		getCustomerList():void;

	}
	export class CustomerListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:ICustomerListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getCustomerList(){
				http.get("/api/Customer").success(function(data:any[]){
					scope.items=<Customer[]>data;
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getCustomerList = getCustomerList;
            getCustomerList();
		}
	}
	export interface ICustomerCreateScope{
		item:Customer;
		createCustomer():void;
		goBack():void;
	}
	export class CustomerCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:ICustomerCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createCustomer(){
				http.post("/api/Customer",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/Customer");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createCustomer = createCustomer;
			scope.goBack = goBack;
		}
	}
	export interface ICustomerEditScope{
		id:string;
		item:Customer;
		getCustomer(string):void;
		saveCustomer():void;
        deleteCustomer(): void;
		goBack():void;
	}
	export class CustomerEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window","SelectListService"];
		constructor(scope:ICustomerEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService,selectListService:Alps.Services.SelectListService){

			function getSelectList(){
			}
			function getCustomer(id){
				http.get("/api/Customer/"+id).success(function(data:any){
					scope.item=<Customer>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveCustomer(){
				var promise = null;
                if (id == "0")
                    promise = http.post("/api/Customer/", scope.item);
                else
                    promise = http.put("/api/Customer/" + id, scope.item);
                promise.success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/Customer");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			}
			function deleteCustomer() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/Customer/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/Customer");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getCustomer = getCustomer;
			scope.saveCustomer = saveCustomer;
			scope.deleteCustomer = deleteCustomer;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getSelectList();
				if (id != '0') {
                    getCustomer(id);
                }
				else
					scope.item=new Customer();
				
			}
			else{
				locationService.path("/Customer");
			}
		}
	}

}

