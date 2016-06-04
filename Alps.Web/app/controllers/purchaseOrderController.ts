module Alps.Controllers
{
    'use strict';
	export class PurchaseOrder{
		ID: string
		OrderTime: Date
		Creater: string
		SupplierID: string
		State: number
		Items: any[];
	}
	
	export interface IPurchaseOrderListScope{
		items:PurchaseOrder[];
		getPurchaseOrderList():void;

	}
	export class PurchaseOrderListCtrl{
		public static $inject=["$scope","$http","toaster"];
		constructor(scope:IPurchaseOrderListScope,http:ng.IHttpService,toaster:ngToaster.IToasterService){
			function getPurchaseOrderList(){
				http.get("/api/PurchaseOrder").success(function(data:any[]){
					scope.items=<PurchaseOrder[]>data;
					for (var i = 0; i < scope.items.length; i++) {
						scope.items[i].OrderTime=new Date(data[i].OrderTime);
	                }
					toaster.success("提示","载入成功");
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getPurchaseOrderList = getPurchaseOrderList;
            getPurchaseOrderList();
		}
	}
/*	export interface IPurchaseOrderCreateScope{
		item:PurchaseOrder;
		createPurchaseOrder():void;
		goBack():void;
	}
	export class PurchaseOrderCreateCtrl{
		public static $inject=["$scope","$http","toaster","$location"];
		constructor(scope:IPurchaseOrderCreateScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService){
			function createPurchaseOrder(){
				http.post("/api/PurchaseOrder",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/PurchaseOrder");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			};
			function goBack() {
                window.history.back();
            }
            scope.createPurchaseOrder = createPurchaseOrder;
			scope.goBack = goBack;
		}
	}
	*/
	export interface IPurchaseOrderEditScope extends angular.IScope{
		id:string;
		item:PurchaseOrder;
		getPurchaseOrder(string):void;
		savePurchaseOrder():void;
        deletePurchaseOrder(): void;
		goBack():void;
		addSubItem(): void;
        deleteSubItem(index): void;
        submitPurchaseOrder(): void;
        form: ng.IFormController;
        SupplierIDSelectList: any[];
        ProductIDSelectList: any[];
        UnitIDSelectList: any[];
        ProductSkuIDSelectList: any[];
        PricingMethodSelectList: any[];
        productSelectionChanged(value): void;
        reCaluAmount(value): void;
        
	}
	export class PurchaseOrderEditCtrl{
        public static $inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window","SelectListService"];
		constructor(scope:IPurchaseOrderEditScope,http:ng.IHttpService,toaster:ngToaster.IToasterService,locationService:ng.ILocationService,routeParams:ng.route.IRouteParamsService,window:ng.IWindowService,selectListService:Alps.SelectListService){
			function getPurchaseOrder(id){
				http.get("/api/PurchaseOrder/"+id).success(function(data:any){
					scope.item=<PurchaseOrder>data;
                    scope.item.OrderTime = new Date(data.OrderTime);

					toaster.success("提示","载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
            function savePurchaseOrder() {
                var promise = null;
                if (id == "0")
                    promise = http.post("/api/PurchaseOrder/", scope.item);
                else
                    promise = http.put("/api/PurchaseOrder/" + id, scope.item);
                promise.success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/PurchaseOrder");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			}
			function submitPurchaseOrder() {
                if (scope.form.$dirty) {
                    alert("更改未保存");
                    return;
                }
                http.post("/api/PurchaseOrder/" + id + "/submit", {}).success(function (data) {
                    toaster.success("提示", "保存成功");
                    locationService.path("/PurchaseOrder");
                }).error(function (err) {
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                });
            }
			function deletePurchaseOrder() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/PurchaseOrder/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/PurchaseOrder");
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
                scope.item.Items.push({ "PurchaseOrderID": scope.item.ID });
            }
            function deleteSubItem($index) {
                scope.item.Items.splice($index, 1);
            }

            function confirmPurchaseOrder() {
                http.post("/action/PurchaseOrder/ConfirmPurchaseOrder/" + id, {}).success(function (data) {
                    toaster.success("提示", "订单确认成功");
                    locationService.path("/PurchaseOrder");
                }).error(function (err) {
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                });
            }
            function getPricingMethodSelectList() {
                http.get("/product/getPricingMethodSelectList").success(function (data) {
                    scope.PricingMethodSelectList =<any[]> data;
                }).error(function (data) {
                    toaster.error("错误", data.Message);
                });
            }
            function productSelectionChanged(item) {
                var value = item.ProductSkuInfo;
                for (var i = 0; i < scope.ProductSkuIDSelectList.length; i++) {
                    if (scope.ProductSkuIDSelectList[i].SkuID === value.SkuID) {
                        value.Name = scope.ProductSkuIDSelectList[i].Name;
                        value.PricingMethod = scope.ProductSkuIDSelectList[i].PricingMethod;
                        reCaluAmount(item);
                        break;
                    }
                }
            }
            function reCaluAmount(item) {
                if (item.ProductSkuInfo.PricingMethod === 0)
                    item.Amount = item.Quantity * item.Price;
                else
                    item.Amount = item.Weight * item.Price;
            }
			scope.addSubItem = addSubItem;
            scope.deleteSubItem = deleteSubItem;
            scope.getPurchaseOrder = getPurchaseOrder;
			scope.savePurchaseOrder = savePurchaseOrder;
			scope.deletePurchaseOrder = deletePurchaseOrder;
            scope.submitPurchaseOrder = submitPurchaseOrder;
            scope.productSelectionChanged = productSelectionChanged;
            scope.reCaluAmount = reCaluAmount;
            scope.goBack = goBack;
            selectListService.GetSelection("TradeAccount").success(function (data) {
                scope.SupplierIDSelectList = <any[]>data;
            });
            selectListService.GetSelection("Unit").success(function (data) {
                scope.UnitIDSelectList = <any[]>data;
            });
            selectListService.GetSelection("Product").success(function (data) {
                scope.ProductIDSelectList = <any[]>data;
            });
            selectListService.GetSelection("ProductSku").success(function (data) {
                scope.ProductSkuIDSelectList = <any[]>data;
            });
            getPricingMethodSelectList();
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
                if (id != '0') {
                    getPurchaseOrder(id);
                }
				else
					scope.item=new PurchaseOrder();
				
			}
			else{
				locationService.path("/PurchaseOrder");
			}
		}
	}

}

