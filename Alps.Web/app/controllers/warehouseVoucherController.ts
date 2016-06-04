module Alps.Controllers
{
    'use strict';
	export class WarehouseVoucher{
		ID: string
		Creater: string
		CreateTime: Date
		SourceID: string
		DestinationID: string
		State: number
		SubmitUser: string
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
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			};
            scope.getWarehouseVoucherList = getWarehouseVoucherList;
            getWarehouseVoucherList();
		}
	}
/*	export interface IWarehouseVoucherCreateScope{
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
					toaster.error("错误",Alps.phaseErr(err));
				});
			}
			function getDestinationIDSelectList(){
				http.get("/api/TradeAccount").success(function(data){
					scope.DestinationIDSelectList=<any[]>data;
				}).error(function(err){
					toaster.error("错误",Alps.phaseErr(err));
				});
			}
			function createWarehouseVoucher(){
				http.post("/api/WarehouseVoucher",scope.item).success(function(data){
					toaster.success("提示","创建成功");
					locationService.path("/WarehouseVoucher");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
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
	*/
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
        ProductIDSelectList: any[];
        ProductSkuIDSelectList: any[];
        PricingMethodSelectList: any[];
		goBack():void;
		addSubItem(): void;
        deleteSubItem(index): void;
        submitWarehouseVoucher(): void;
        form: ng.IFormController;
        pn_KeyUp(e): void;
        inputProductNumber: string;
        itemsGridOptions: uiGrid.IGridOptions;
        regetWarehouseVoucher(): void;
        list: any[];
        productSelectionChanged(value): void;
        reCaluAmount(value): void;
	}
	export class WarehouseVoucherEditCtrl{
        public static $inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window","SelectListService"];
        constructor(scope: IWarehouseVoucherEditScope, http: ng.IHttpService, toaster: ngToaster.IToasterService, locationService: ng.ILocationService, routeParams: ng.route.IRouteParamsService, window: ng.IWindowService, selectListService:Alps.SelectListService){
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
			function getWarehouseVoucher(id){
				http.get("/api/WarehouseVoucher/"+id).success(function(data:any){
					scope.item=<WarehouseVoucher>data;
                    scope.item.CreateTime = new Date(data.CreateTime);
                    scope.itemsGridOptions = {
                        columnDefs: [{
                            name: "ProductID"
                        }, { name: "Quantity" }, {
                                name: "Weight"
                            }, {
                                name: 'PricingMethod',
                                field: 'PricingMethod',
                                
                                cellFilter: "alpsDropdown:this",
                                editableCellTemplate: "ui-grid/dropdownEditor",
                                editDropdownOptionsArray: scope.PricingMethodSelectList,
                                editDropdownIdLabel:"Value",editDropdownValueLabel:"Text"
                            }, { name: "Price" }]
                    };
                    scope.itemsGridOptions.data = scope.item.Items;
                    toaster.success("提示", "载入成功");
				}).error(function(data){
					toaster.error("错误",data.Message);
				});
			};
            function saveWarehouseVoucher() {
                var promise = null;
                if (id == "0") 
                    promise = http.post("/api/WarehouseVoucher/", scope.item);
                else
                    promise = http.put("/api/WarehouseVoucher/" + id, scope.item);
				promise.success(function(data){
					toaster.success("提示","保存成功");
					locationService.path("/WarehouseVoucher");
				}).error(function(err){
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
				});
			}
			function submitWarehouseVoucher() {
                //if (scope.form.$dirty) {
                //    alert("更改未保存");
                //    return;
                //}
                http.post("/api/WarehouseVoucher/" + id + "/submit", scope.item).success(function (data) {
                    toaster.success("提示", "保存成功");
                    locationService.path("/WarehouseVoucher");
                }).error(function (err) {
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                });
            }
			function deleteWarehouseVoucher() {
			    if (confirm("确认要删除?")) {
					http.delete("/api/WarehouseVoucher/" + id).success(function (data) {
						toaster.success("提示", "删除成功");
						locationService.path("/WarehouseVoucher");
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
                scope.item.Items.push({ "WarehouseVoucherID": scope.item.ID });
            }
            function deleteSubItem($index) {
                scope.item.Items.splice($index, 1);
            }
            function addSubItemByProductNumber(e) {
                var keycode = window.event ? e.keyCode : e.which;
                if (keycode == 13) {
                    e.preventDefault();
                    var codeHasExisting = false;
                    for (var p in scope.item.Items) {
                        if (scope.item.Items[p].ProductNumber == scope.inputProductNumber) { codeHasExisting = true; break; }
                    }
                    if (codeHasExisting) { toaster.error("此编号已经录入"); return; };
                    http.get("/api/stockinfo/" + scope.inputProductNumber).success(function (data: any) {
                        addSubItem();
                        var subItem = scope.item.Items[scope.item.Items.length - 1];
                        subItem.MaterialID = data.MaterialID;
                        subItem.PackingQuantity = data.PackingQuantity;
                        subItem.Quantity = data.Quantity;
                        subItem.ProductNumber = data.ProductNumber;
                        subItem.PositionID = data.PositionID;
                        scope.inputProductNumber = "";
                    }).error(function (err) {
                        toaster.error("库存中无此产品号");
                    });
                }
            }
            function getPricingMethodSelectList() {
                http.get("/product/getPricingMethodSelectList").success(function (data: any) {
                    scope.PricingMethodSelectList = <any[]>data;
                    
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
            scope.pn_KeyUp = addSubItemByProductNumber;
			scope.addSubItem = addSubItem;
            scope.deleteSubItem = deleteSubItem;
            scope.getWarehouseVoucher = getWarehouseVoucher;
			scope.saveWarehouseVoucher = saveWarehouseVoucher;
			scope.deleteWarehouseVoucher = deleteWarehouseVoucher;
            scope.submitWarehouseVoucher = submitWarehouseVoucher;
            scope.goBack = goBack;
            scope.productSelectionChanged = productSelectionChanged;
            scope.reCaluAmount = reCaluAmount;
            scope.itemsGridOptions = {};
            
			var id="";
			if(routeParams["id"]){
				id=routeParams["id"];
				getSourceIDSelectList();
                getDestinationIDSelectList();
                getPricingMethodSelectList();
                selectListService.GetSelection("Material").success(function (data) {
                    scope.MaterialIDSelectList = <any[]>data;
                });
                selectListService.GetSelection("Position").success(function (data) {
                    scope.PositionIDSelectList = <any[]>data;
                });
                selectListService.GetSelection("Product").success(function (data) {

                    scope.ProductIDSelectList = <any[]>data;
                });
                selectListService.GetSelection("ProductSku").success(function (data) {
                    scope.ProductSkuIDSelectList = <any[]>data;
                });
                

				if (id != '0') {
                    getWarehouseVoucher(id);
                   
                }
				else
					scope.item=new WarehouseVoucher();
				
			}
			else{
				locationService.path("/WarehouseVoucher");
			}
		}
	}

}

