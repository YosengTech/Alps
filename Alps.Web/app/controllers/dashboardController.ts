module Alps.Controllers {
    'use strict';
    export interface IDashboardScope extends ng.IScope {
        productCount: number;
        skuCount: number;
        catagoryCount: number;
        tradeAccountCount: number;
        purchaseOrderCount: number;
        warehouseVoucherCount: number;
        deliveryVoucherCount: number;
        saleOrderCount: number;
        pop(): void;
        msg: any[];
        select(index): void;
        activePill: any;
        //ProductSkuWithCatagorySelectList: any[];
    }
    export class DashboardCtrl {
        public static $inject = ["$scope", "$http", "toaster", "$uibModal", "SelectListService"];
        constructor(scope: IDashboardScope, http: ng.IHttpService, toaster: ngToaster.IToasterService, uibModal: ng.ui.bootstrap.IModalService, selectListService:Alps.Services.SelectListService) {
            http.get("/home/GetDashboard", { cache: false }).success(function (data: any) {
                scope.productCount = data.productCount;
                scope.skuCount = data.skuCount;
                scope.catagoryCount = data.catagoryCount;
                scope.tradeAccountCount = data.tradeAccountCount;
                scope.purchaseOrderCount = data.purchaseOrderCount;
                scope.warehouseVoucherCount = data.warehouseVoucherCount;
                scope.deliveryVoucherCount = data.deliveryVoucherCount;
                scope.saleOrderCount = data.saleOrderCount;
            });
            scope.select = function (index) {
                if (scope.activePill != index)
                    scope.activePill = index;
            };
            scope.msg = [{ "name": "winsan", items: [{ name: "winsan1" }, { name: "winsan2" }, { name: "winsan3" }] },
                { "name": "amei", items: [{ name: "amei1" }, { name: "amei2" }, { name: "amei3" }] },
                { "name": "yan", items: [{ name: "yan1" }, { name: "yan2" }, { name: "yan3" }] }];
            scope.pop = function () {
                uibModal.open({ templateUrl: "/template/home/SelectListModal", controller: "SelectListModalCtrl", resolve: { selectList: function () { return scope.msg; } } })
                    .result.then(function (item) { alert(item.name); });
            }
            //selectListService.GetSelection("ProductSkuWithCatagory").success(function (data) {
            //    scope.ProductSkuWithCatagorySelectList = <any[]>data;
            //});
        }
    }
   
}