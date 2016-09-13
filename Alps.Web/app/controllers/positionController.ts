module Alps.Controllers
{
    'use strict';
	export class Position{
		ID:string
		Number:string
		Name:string
		Warehouse:string
	}
	
	export interface IPositionListScope{
		items:Position[];
		getPositionList():void;

	}
	export class PositionListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IPositionListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getPositionList(){
				http.get("/api/Position").success(function(data:any[]){
					scope.items=<Position[]>data;
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getPositionList = getPositionList;
            getPositionList();
		}
	}
	export interface IPositionCreateScope{
		item:Position;
		createPosition():void;
		goBack():void;
	}
	export class PositionCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IPositionCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createPosition(){
				http.post("/api/Position",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/Position");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createPosition = createPosition;
			scope.goBack = goBack;
		}
	}
	export interface IPositionEditScope{
		id:string;
		item:Position;
		getPosition(string):void;
		savePosition():void;
        deletePosition(): void;
		goBack():void;
	}
	export class PositionEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window","SelectListService"];
		constructor(scope:IPositionEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService,selectListService:Alps.Services.SelectListService){

			function getSelectList(){
			}
			function getPosition(id){
				http.get("/api/Position/"+id).success(function(data:any){
					scope.item=<Position>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function savePosition(){
				var promise = null;
                if (id == "0")
                    promise = http.post("/api/Position/", scope.item);
                else
                    promise = http.put("/api/Position/" + id, scope.item);
                promise.success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/Position");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			}
			function deletePosition() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/Position/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/Position");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getPosition = getPosition;
			scope.savePosition = savePosition;
			scope.deletePosition = deletePosition;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getSelectList();
				if (id != '0') {
                    getPosition(id);
                }
				else
					scope.item=new Position();
				
			}
			else{
				locationService.path("/Position");
			}
		}
	}

}

