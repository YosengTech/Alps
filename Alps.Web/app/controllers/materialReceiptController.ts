module Alps.Controllers
{
    'use strict';
	export class MaterialReceipt{
		ID: string
		SourceDepartmentID: string
		DepartmentID: string
		Creater: string
		CreateTime: Date
		SubmitUser: string
		Handler: string
		TotalQuantity: number
		TotalWeight: number
		TotalAmount: number
		State: number
		Items: any[];
	}
	
	export interface IMaterialReceiptListScope{
		items:MaterialReceipt[];
		getMaterialReceiptList():void;

	}
	export class MaterialReceiptListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IMaterialReceiptListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getMaterialReceiptList(){
				http.get("/api/MaterialReceipt").success(function(data:any[]){
					scope.items=<MaterialReceipt[]>data;
					for (var i = 0; i < scope.items.length; i++) {
						scope.items[i].CreateTime=new Date(data[i].CreateTime);
	                }
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getMaterialReceiptList = getMaterialReceiptList;
            getMaterialReceiptList();
		}
	}

	export interface IMaterialReceiptEditScope{
		id:string;
		item:MaterialReceipt;
		getMaterialReceipt(string):void;
		saveMaterialReceipt():void;
        deleteMaterialReceipt(): void;
		SourceDepartmentIDSelectList:any[];
		DepartmentIDSelectList:any[];
		goBack():void;
		addSubItem(): void;
        deleteSubItem(index): void;
        submitMaterialReceipt(): void;
        form: ng.IFormController;
	}
	export class MaterialReceiptEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window","SelectListService"];
		constructor(scope:IMaterialReceiptEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService, selectListService:Alps.Services.SelectListService){

			function getSelectList(){
				selectListService.GetSelection("Department").success(function (data) {
						scope.SourceDepartmentIDSelectList = <any[]>data;
					}).error(function(err){
						toaster.error("错误",err.Message);
					});
				selectListService.GetSelection("Department").success(function (data) {
						scope.DepartmentIDSelectList = <any[]>data;
					}).error(function(err){
						toaster.error("错误",err.Message);
					});
			}
			function getMaterialReceipt(id){
				http.get("/api/MaterialReceipt/"+id).success(function(data:any){
					scope.item=<MaterialReceipt>data;
					scope.item.CreateTime=new Date(data.CreateTime);
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
			function saveMaterialReceipt(){
				var promise = null;
                if (id == "0")
                    promise = http.post("/api/MaterialReceipt/", scope.item);
                else
                    promise = http.put("/api/MaterialReceipt/" + id, scope.item);
                promise.success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/MaterialReceipt");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			}
			function submitMaterialReceipt() {
                if (scope.form.$dirty) {
                    alert("更改未保存");
                    return;
                }
                http.post("/api/MaterialReceipt/" + id + "/submit", {}).success(function (data) {
                    toaster.success("提示", "保存成功");
                    locationService.path("/MaterialReceipt");
                }).error(function (err) {
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                });
            }
			function deleteMaterialReceipt() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/MaterialReceipt/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/MaterialReceipt");
					}).error(function (err) {
						toaster.error("错误", Alps.phaseErr(err));
					});
				}
            }
			function goBack() {
                window.history.back();
            }
			function addSubItem() {
			    if (scope.item.Items == undefined)
                    scope.item.Items = [];
                scope.item.Items.push({ "MaterialReceiptID": scope.item.ID });
            }
            function deleteSubItem($index) {
                scope.item.Items.splice($index, 1);
            }
			scope.addSubItem = addSubItem;
            scope.deleteSubItem = deleteSubItem;
            scope.getMaterialReceipt = getMaterialReceipt;
			scope.saveMaterialReceipt = saveMaterialReceipt;
			scope.deleteMaterialReceipt = deleteMaterialReceipt;
            scope.submitMaterialReceipt = submitMaterialReceipt;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getSelectList();
				if (id != '0') {
                    getMaterialReceipt(id);
                }
				else
					scope.item=new MaterialReceipt();
				
			}
			else{
				locationService.path("/MaterialReceipt");
			}
		}
	}

}

