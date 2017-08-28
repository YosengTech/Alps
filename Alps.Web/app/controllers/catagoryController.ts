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
        remove(any): void;
        toggle(any): void;
        newSubItem(any): void;
        GetCatagoriesByParentID(id): void;
        currentParentID: string;
	}
    export class CatagoryListCtrl{
		public static $inject=["$scope","$http","toaster","$routeParams"];
        constructor(scope: ICatagoryListScope, http: ng.IHttpService, toaster: ngToaster.IToasterService, routeParams: ng.route.IRouteParamsService){
			function getCatagoryList(){
				http.get("/api/Catagory").success(function(data){
					scope.items=<Catagory[]>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",Alps.phaseErr(data));
				});
            };
            function GetCatagoriesByParentID(id) {
                
                http.get("/action/catagory/GetCatagoriesByParentID/" + id).success(function (data) {
                    scope.items = <Catagory[]>data;
                    scope.currentParentID = id;
                    toaster.success("提示", "载入成功");
                }).error(function (errData) {
                    toaster.error("错误", Alps.phaseErr(errData));
                    });
            }
            //scope.getCatagoryList = getCatagoryList;
            GetCatagoriesByParentID(null);
            scope.GetCatagoriesByParentID = GetCatagoriesByParentID;
            scope.remove = function (scope) {
                scope.remove();
            };

            scope.toggle = function (scope) {
                scope.toggle();
            };

            scope.newSubItem = function (scope) {
                var nodeData = scope.$modelValue;
                if (nodeData.nodes == undefined)
                    nodeData.nodes = [];
                nodeData.nodes.push({
                    id: nodeData.id * 10 + nodeData.nodes.length,
                    title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                    nodes: []
                });
            };
		}
	}
	export interface ICatagoryCreateScope{
		item:Catagory;
		createCatagory():void;
		ParentIDSelectList:any[];
		goBack():void;
	}
	export class CatagoryCreateCtrl{
        public static $inject = ["$scope", "$http", "toaster", "$location","SelectListService"];
        constructor(scope: ICatagoryCreateScope, http: ng.IHttpService, toaster: ngToaster.IToasterService, locationService: ng.ILocationService, selectListService:Alps.Services.SelectListService){
			function getParentIDSelectList(){
                selectListService.GetSelection("catagory").success(function(data){
					scope.ParentIDSelectList=<any[]>data;
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
        public static $inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window","SelectListService"];
        constructor(scope: ICatagoryEditScope, http: ng.IHttpService, toaster: ngToaster.IToasterService, locationService: ng.ILocationService, routeParams: ng.route.IRouteParamsService, window: ng.IWindowService, selectListService: Alps.Services.SelectListService){
            function getParentIDSelectList() {
                selectListService.GetSelection("catagory").success(function(data){
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
