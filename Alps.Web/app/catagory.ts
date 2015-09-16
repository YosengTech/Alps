module Alps.Controllers
{
    'use strict';
	export class Catagory{
		ID:string
		Name:string
		ParentID:string
	}
	
	export interface ICatagoryListScope{
		items:Catagory[];
		getCatagoryList():void;

	}
	export class CatagoryListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:ICatagoryListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getCatagoryList(){
				http.get("/api/Catagory").success(function(data){
					scope.items=<Catagory[]>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
            scope.getCatagoryList = getCatagoryList;
            getCatagoryList();
		}
	}
	export interface ICatagoryCreateScope{
		item:Catagory;
		createCatagory():void;
		ParentIDSelectList:any[];
		goBack():void;
	}
	export class CatagoryCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:ICatagoryCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function getParentIDSelectList(){
				http.get("/api/catagory").success(function(data){
					scope.ParentIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
			}
			function createCatagory(){
				http.post("/api/Catagory",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/Catagory");
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createCatagory = createCatagory;
			scope.goBack = goBack;
				getParentIDSelectList();
		}
	}
	export interface ICatagoryEditScope{
		id:string;
		item:Catagory;
		getCatagory(string):void;
		saveCatagory():void;
        deleteCatagory(): void;
		ParentIDSelectList:any[];
		goBack():void;
	}
	export class CatagoryEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window"];
		constructor(scope:ICatagoryEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService){
			function getParentIDSelectList(){
                http.get("/api/catagory").success(function(data){
					scope.ParentIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
			}
			function getCatagory(id){
				http.get("/api/Catagory/"+id).success(function(data){
					scope.item=<Catagory>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveCatagory(){
				http.put("/api/Catagory/"+id,scope.item).success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/Catagory");
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
			}
            function deleteCatagory() {
                if (confirm("确认要删除?")) {
                    http.delete("/api/Catagory/" + id).success(function (data) {
                        toaster.success("提示", "删除成功");
                        locationService.path("/Catagory");
                    }).error(function (err) {
                        toaster.error("错误", err.Message);
                    });
                }
            }
			function goBack() {
                window.history.back();
            }
            scope.getCatagory = getCatagory;
			scope.saveCatagory = saveCatagory;
			scope.deleteCatagory = deleteCatagory;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getParentIDSelectList();
				getCatagory(id);
			}
			else{
				locationService.path("/Catagory");
			}
		}
    }
}
