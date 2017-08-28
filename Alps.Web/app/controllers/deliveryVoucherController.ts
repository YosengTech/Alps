module Alps.Controllers
{
    'use strict';
	export class DeliveryVoucher{
		ID: string
		Creater: string
		CreateTime: Date
		SourceID: string
		DestinationID: string
		Handler: string
		State: number
		SubmitUser: string
		TotalQuantity: number
		TotalWeight: number
		TotalAmount: number
		Items: any[];
	}
	
	export interface IDeliveryVoucherListScope{
		items:DeliveryVoucher[];
		getDeliveryVoucherList():void;

	}
	export class DeliveryVoucherListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IDeliveryVoucherListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getDeliveryVoucherList(){
				http.get("/api/DeliveryVoucher").success(function(data:any[]){
					scope.items=<DeliveryVoucher[]>data;
					for (var i = 0; i < scope.items.length; i++) {
						scope.items[i].CreateTime=new Date(data[i].CreateTime);
	                }
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getDeliveryVoucherList = getDeliveryVoucherList;
            getDeliveryVoucherList();
		}
	}

	export interface IDeliveryVoucherEditScope{
		id:string;
		item:DeliveryVoucher;
		getDeliveryVoucher(string):void;
		saveDeliveryVoucher():void;
        deleteDeliveryVoucher(): void;
		DepartmentIDSelectList:any[];
        CustomerIDSelectList: any[];
        ProductSkuIDSelectList: any[];
        PositionIDSelectList: any[];
		goBack():void;
		addSubItem(): void;
        deleteSubItem(index): void;
        submitDeliveryVoucher(): void;
        form: ng.IFormController;
	}
	export class DeliveryVoucherEditCtrl{
		public static $inject=["$scope","$http","toaster","$location","$routeParams","$window","SelectListService"];
		constructor(scope:IDeliveryVoucherEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService, selectListService:Alps.Services.SelectListService){

			function getSelectList(){
                selectListService.GetSelection("Department").success(function (data) {
                    scope.DepartmentIDSelectList = <any[]>data;
                    });
                selectListService.GetSelection("Customer").success(function (data) {
                    scope.CustomerIDSelectList = <any[]>data;
                    });
                selectListService.GetSelection("ProductSku").success(function (data) {
                    scope.ProductSkuIDSelectList = <any[]>data;
                });
                selectListService.GetSelection("Position").success(function (data) {
                    scope.PositionIDSelectList = <any[]>data;
                });
			}
			function getDeliveryVoucher(id){
				http.get("/api/DeliveryVoucher/"+id).success(function(data:any){
					scope.item=<DeliveryVoucher>data;
					scope.item.CreateTime=new Date(data.CreateTime);
					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
            function saveDeliveryVoucher() {
                var promise = null;
                if (id == "0")
                    promise = http.post("/api/DeliveryVoucher/", scope.item);
                else
                    promise = http.put("/api/DeliveryVoucher/" + id, scope.item);
                promise.success(function (data) {
                    toaster.success("提示", "保存成功");
					locationService.path("/DeliveryVoucher");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			}
			function submitDeliveryVoucher() {
                //if (scope.form.$dirty) {
                //    alert("更改未保存");
                //    return;
                //}
                http.post("/api/DeliveryVoucher/" + id + "/submit", scope.item).success(function (data) {
                    toaster.success("提示", "保存成功");
                    locationService.path("/DeliveryVoucher");
                }).error(function (err) {
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                });
            }
			function deleteDeliveryVoucher() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/DeliveryVoucher/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/DeliveryVoucher");
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
                scope.item.Items.push({ "DeliveryVoucherID": scope.item.ID });
            }
            function deleteSubItem($index) {
                scope.item.Items.splice($index, 1);
            }
			scope.addSubItem = addSubItem;
            scope.deleteSubItem = deleteSubItem;
            scope.getDeliveryVoucher = getDeliveryVoucher;
			scope.saveDeliveryVoucher = saveDeliveryVoucher;
			scope.deleteDeliveryVoucher = deleteDeliveryVoucher;
            scope.submitDeliveryVoucher = submitDeliveryVoucher;
			scope.goBack=goBack;
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getSelectList();
				if (id != '0') {
                    getDeliveryVoucher(id);
                }
				else
					scope.item=new DeliveryVoucher();
			}
			else{
				locationService.path("/DeliveryVoucher");
			}
		}
	}

}

