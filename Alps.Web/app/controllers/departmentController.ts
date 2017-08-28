module Alps.Controllers
{
    'use strict';
	export class Department{
		ID:string
		Name:string
	}
	
	export interface IDepartmentListScope{
		items:Department[];
		getDepartmentList():void;

	}
	export class DepartmentListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IDepartmentListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getDepartmentList(){
				http.get("/api/Department").success(function(data:any[]){
					scope.items=<Department[]>data;
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getDepartmentList = getDepartmentList;
            getDepartmentList();
		}
	}
	export interface IDepartmentCreateScope{
		item:Department;
		createDepartment():void;
		goBack():void;
	}
	export class DepartmentCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IDepartmentCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createDepartment(){
				http.post("/api/Department",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/Department");
				}).error(function(err){

                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createDepartment = createDepartment;
			scope.goBack = goBack;
		}
	}
	export interface IDepartmentEditScope{
		id:string;
		item:Department;
		getDepartment(string):void;
		saveDepartment():void;
        deleteDepartment(): void;
		goBack():void;
	}
	export class DepartmentEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window","SelectListService"];
		constructor(scope:IDepartmentEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService,selectListService:Alps.Services.SelectListService){

			function getSelectList(){
			}
			function getDepartment(id){
				http.get("/api/Department/"+id).success(function(data:any){
					scope.item=<Department>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveDepartment(){
				var promise = null;
                if (id == "0")
                    promise = http.post("/api/Department/", scope.item);
                else
                    promise = http.put("/api/Department/" + id, scope.item);
                promise.success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/Department");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			}
			function deleteDepartment() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/Department/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/Department");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getDepartment = getDepartment;
			scope.saveDepartment = saveDepartment;
			scope.deleteDepartment = deleteDepartment;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getSelectList();
				if (id != '0') {
                    getDepartment(id);
                }
				else
					scope.item=new Department();
				
			}
			else{
				locationService.path("/Department");
			}
		}
	}

}

