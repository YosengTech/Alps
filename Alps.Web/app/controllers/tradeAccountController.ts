

module Alps.Controllers
{
    'use strict';
	export class TradeAccount{
		ID:string
		Name:string
		BankAccount:string
		InventoryManagement:boolean
	}
	
	export interface ITradeAccountListScope{
		items:TradeAccount[];
		getTradeAccountList():void;

	}
	export class TradeAccountListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:ITradeAccountListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getTradeAccountList(){
				http.get("/api/TradeAccount").success(function(data:any[]){
					scope.items=<TradeAccount[]>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
            scope.getTradeAccountList = getTradeAccountList;
            getTradeAccountList();
		}
	}
	export interface ITradeAccountCreateScope{
		item:TradeAccount;
		createTradeAccount():void;
		goBack():void;
	}
	export class TradeAccountCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:ITradeAccountCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createTradeAccount(){
				http.post("/api/TradeAccount",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/TradeAccount");
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
			};
			function goBack() {
                window.history.back();
            }
            scope.createTradeAccount = createTradeAccount;
			scope.goBack = goBack;
		}
	}
	export interface ITradeAccountEditScope{
		id:string;
		item:TradeAccount;
		getTradeAccount(string):void;
		saveTradeAccount():void;
        deleteTradeAccount(): void;
		goBack():void;
	}
	export class TradeAccountEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window"];
		constructor(scope:ITradeAccountEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService){
			function getTradeAccount(id){
				http.get("/api/TradeAccount/"+id).success(function(data:any){
					scope.item=<TradeAccount>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveTradeAccount(){
				http.put("/api/TradeAccount/"+id,scope.item).success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/TradeAccount");
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
			function deleteTradeAccount() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/TradeAccount/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/TradeAccount");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getTradeAccount = getTradeAccount;
			scope.saveTradeAccount = saveTradeAccount;
			scope.deleteTradeAccount = deleteTradeAccount;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getTradeAccount(id);
			}
			else{
				locationService.path("/TradeAccount");
			}
		}
	}

}

