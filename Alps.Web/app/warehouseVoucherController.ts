
/// <reference path="app.ts" />
/// <reference path="../scripts/_all.ts" />
module Alps.Controllers
{
    'use strict';
	export class WarehouseVoucher{
		ID:string
		Creater:string
		CreateTime:Date
		SourceID:string
		DestinationID:string
		State:number
		SubmitUser:string
        Items: any[];
        
	}
	
	export interface IWarehouseVoucherListScope{
		items:WarehouseVoucher[];
		getWarehouseVoucherList():void;

	}
	export class WarehouseVoucherListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IWarehouseVoucherListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getWarehouseVoucherList(){
				http.get("/api/WarehouseVoucher").success(function(data:any[]){
					scope.items=<WarehouseVoucher[]>data;
					for (var i = 0; i < scope.items.length; i++) {
						scope.items[i].CreateTime=new Date(data[i].CreateTime);
	                }
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
            scope.getWarehouseVoucherList = getWarehouseVoucherList;
            getWarehouseVoucherList();
		}
	}
	export interface IWarehouseVoucherCreateScope{
		item:WarehouseVoucher;
		createWarehouseVoucher():void;
		SourceIDSelectList:any[];
		DestinationIDSelectList:any[];
		goBack():void;
	}
	export class WarehouseVoucherCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IWarehouseVoucherCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function getSourceIDSelectList(){
				http.get("/api/TradeAccount").success(function(data){
					scope.SourceIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
			}
			function getDestinationIDSelectList(){
				http.get("/api/TradeAccount").success(function(data){
					scope.DestinationIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
			}
			function createWarehouseVoucher(){
				http.post("/api/WarehouseVoucher",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/WarehouseVoucher");
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
            scope.createWarehouseVoucher = createWarehouseVoucher;
			scope.goBack = goBack;
				getSourceIDSelectList();
				getDestinationIDSelectList();
		}
	}
	export interface IWarehouseVoucherEditScope{
		id:string;
		item:WarehouseVoucher;
		getWarehouseVoucher(string):void;
		saveWarehouseVoucher():void;
        deleteWarehouseVoucher(): void;
		SourceIDSelectList:any[];
        DestinationIDSelectList: any[];
        MaterialIDSelectList: any[];
        PositionIDSelectList: any[];
        goBack(): void;
        ///
        addSubItem(): void;
        deleteSubItem(index): void;
        submitWarehouseVoucher(): void;
        form: ng.IFormController;
	}
	export class WarehouseVoucherEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window"];
		constructor(scope:IWarehouseVoucherEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService){
			function getSourceIDSelectList(){
				http.get("/api/TradeAccount").success(function(data){
					scope.SourceIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
			}
			function getDestinationIDSelectList(){
				http.get("/api/TradeAccount").success(function(data){
					scope.DestinationIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
            }
            function getMaterialIDSelectList() {
                http.get("/api/Material").success(function (data) {
                    scope.MaterialIDSelectList = <any[]>data;
                }).error(function (err) {
                    toaster.error("错误", err.Message);
                });
            }
            function getPositionIDSelectList() {
                http.get("/api/Position").success(function (data) {
                    scope.PositionIDSelectList = <any[]>data;
                }).error(function (err) {
                    toaster.error("错误", err.Message);
                });
            }
			function getWarehouseVoucher(id){
				http.get("/api/WarehouseVoucher/"+id).success(function(data:any){
					scope.item=<WarehouseVoucher>data;
                    scope.item.CreateTime = new Date(data.CreateTime);
                    if (scope.item.Items ===null) {
                        scope.item.Items = [];
                    }
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveWarehouseVoucher(){
				http.put("/api/WarehouseVoucher/"+id,scope.item).success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/WarehouseVoucher");
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
            function submitWarehouseVoucher() {
                if (scope.form.$dirty) {
                    alert("更改未保存");
                    return;
                }
                http.post("/api/WarehouseVoucher/" + id + "/submit", {}).success(function (data) {
                    toaster.success("提示", "保存成功");
                    locationService.path("/WarehouseVoucher");
                }).error(function (err) {
                    var errMsg = "";
                    if (err.ModelState) {
                        errMsg = "<ul>";
                        for (var p in err.ModelState) {
                            errMsg = errMsg + "<li>" + err.ModelState[p][0] + "</li>";
                        }
                        errMsg = errMsg + "</ul>";
                    }
                    if (errMsg == "") {
                        errMsg =err.ExceptionMessage;
                    }
                    toaster.pop("error", "错误", errMsg, 3000, "trustedHtml");
                });
            }
			function deleteWarehouseVoucher() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/WarehouseVoucher/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/WarehouseVoucher");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            function addSubItem() {
                scope.item.Items.push({ "WarehouseVoucherID":scope.item.ID});
            }
            function deleteSubItem($index) {
                scope.item.Items.splice($index,1);
            }
            scope.addSubItem = addSubItem;
            scope.deleteSubItem = deleteSubItem;
            scope.getWarehouseVoucher = getWarehouseVoucher;
			scope.saveWarehouseVoucher = saveWarehouseVoucher;
			scope.deleteWarehouseVoucher = deleteWarehouseVoucher;
            scope.goBack = goBack;
            scope.submitWarehouseVoucher = submitWarehouseVoucher;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getSourceIDSelectList();
                getDestinationIDSelectList();
                getMaterialIDSelectList();
                getPositionIDSelectList();
				getWarehouseVoucher(id);
			}
			else{
				locationService.path("/WarehouseVoucher");
			}
		}
    }
    //Alps.getApp().
    //    controller("WarehouseVoucherListCtrl", Alps.Controllers.WarehouseVoucherListCtrl);
}

