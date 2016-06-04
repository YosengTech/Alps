module Alps.Controllers
{
    'use strict';
	export class Unit{
		ID:string
		Name:string
		Group:number
	}
	
	export interface IUnitListScope{
		items:Unit[];
		getUnitList():void;

	}
	export class UnitListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IUnitListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getUnitList(){
				http.get("/api/Unit").success(function(data:any[]){
					scope.items=<Unit[]>data;
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getUnitList = getUnitList;
            getUnitList();
		}
	}
	export interface IUnitCreateScope{
		item:Unit;
		createUnit():void;
		goBack():void;
	}
	export class UnitCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IUnitCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createUnit(){
				http.post("/api/Unit",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/Unit");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createUnit = createUnit;
			scope.goBack = goBack;
		}
	}
	export interface IUnitEditScope{
		id:string;
		item:Unit;
		getUnit(string):void;
		saveUnit():void;
        deleteUnit(): void;
		goBack():void;
	}
	export class UnitEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window"];
		constructor(scope:IUnitEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService){
			function getUnit(id){
				http.get("/api/Unit/"+id).success(function(data:any){
					scope.item=<Unit>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveUnit(){
				http.put("/api/Unit/"+id,scope.item).success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/Unit");
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
			function deleteUnit() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/Unit/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/Unit");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getUnit = getUnit;
			scope.saveUnit = saveUnit;
			scope.deleteUnit = deleteUnit;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getUnit(id);
			}
			else{
				locationService.path("/Unit");
			}
		}
	}

}

