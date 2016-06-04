

module Alps.Controllers
{
    'use strict';
	export class Material{
		ID:string
		Name:string
		CatagoryID:string
	}
	
	export interface IMaterialListScope{
		items:Material[];
		getMaterialList():void;

	}
	export class MaterialListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IMaterialListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getMaterialList(){
				http.get("/api/Material").success(function(data:any[]){
					scope.items=<Material[]>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",Alps.phaseErr( data));
				});
			};
            scope.getMaterialList = getMaterialList;
            getMaterialList();
		}
	}
	export interface IMaterialCreateScope{
		item:Material;
		createMaterial():void;
		CatagoryIDSelectList:any[];
		goBack():void;
	}
	export class MaterialCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IMaterialCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function getCatagoryIDSelectList(){
				http.get("/api/Catagory").success(function(data){
					scope.CatagoryIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
			}
			function createMaterial(){
				http.post("/api/Material",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/Material");
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
            scope.createMaterial = createMaterial;
			scope.goBack = goBack;
				getCatagoryIDSelectList();
		}
	}
	export interface IMaterialEditScope{
		id:string;
		item:Material;
		getMaterial(string):void;
		saveMaterial():void;
        deleteMaterial(): void;
		CatagoryIDSelectList:any[];
		goBack():void;
	}
	export class MaterialEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window"];
		constructor(scope:IMaterialEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService){
			function getCatagoryIDSelectList(){
                http.get("/selectlist/getcatagory").success(function(data){
					scope.CatagoryIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",err.Message);
				});
			}
			function getMaterial(id){
				http.get("/api/Material/"+id).success(function(data:any){
					scope.item=<Material>data;
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveMaterial(){
				http.put("/api/Material/"+id,scope.item).success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/Material");
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
			function deleteMaterial() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/Material/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/Material");
					}).error(function (err) {
						toaster.error("错误", err.Message);
					});
				}
            }
			function goBack() {
                window.history.back();
            }
            scope.getMaterial = getMaterial;
			scope.saveMaterial = saveMaterial;
			scope.deleteMaterial = deleteMaterial;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getCatagoryIDSelectList();
				getMaterial(id);
			}
			else{
				locationService.path("/Material");
			}
		}
	}

}

