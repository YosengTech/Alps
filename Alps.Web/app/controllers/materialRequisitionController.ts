module Alps.Controllers {
    'use strict';
    export class MaterialRequisition {
        ID: string
        RequisitionDepartmentID: string
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

    export interface IMaterialRequisitionListScope {
        items: MaterialRequisition[];
        getMaterialRequisitionList(): void;

    }
    export class MaterialRequisitionListCtrl {
        public static $inject = ["$scope", "$http", "toaster"];
        constructor(scope: IMaterialRequisitionListScope, http: ng.IHttpService, toaster: ngToaster.IToasterService) {
            function getMaterialRequisitionList() {
                http.get("/api/MaterialRequisition").success(function (data: any[]) {
                    scope.items = <MaterialRequisition[]>data;
                    for (var i = 0; i < scope.items.length; i++) {
                        scope.items[i].CreateTime = new Date(data[i].CreateTime);
                    }
                    toaster.success("提示", "载入成功");
                }).error(function (err) {
                    toaster.error("错误", Alps.phaseErr(err));
                });
            };
            scope.getMaterialRequisitionList = getMaterialRequisitionList;
            getMaterialRequisitionList();
        }
    }

    export interface IMaterialRequisitionEditScope {
        id: string;
        item: MaterialRequisition;
        getMaterialRequisition(string): void;
        saveMaterialRequisition(): void;
        deleteMaterialRequisition(): void;
        RequisitionDepartmentIDSelectList: any[];
        ProductSkuIDSelectList: any[];
        DepartmentIDSelectList: any[];
        PositionIDSelectList: any[];
        goBack(): void;
        addSubItem(): void;
        deleteSubItem(index): void;
        submitMaterialRequisition(): void;
        form: ng.IFormController;
        productSelectionChanged(value): void;
        reCaluAmount(value): void;
        ProductSkuWithCatagorySelectList: any[];
    }
    export class MaterialRequisitionEditCtrl {
        public static $inject = ["$scope", "$http", "toaster", "$location", "$routeParams", "$window", "SelectListService"];
        constructor(scope: IMaterialRequisitionEditScope, http: ng.IHttpService, toaster: ngToaster.IToasterService, locationService: ng.ILocationService, routeParams: ng.route.IRouteParamsService, window: ng.IWindowService, selectListService: Alps.Services.SelectListService) {

            function getSelectList() {
                selectListService.GetSelection("Department").success(function (data) {
                    scope.RequisitionDepartmentIDSelectList = <any[]>data;
                }).error(function (err) {
                    toaster.error("错误", err.Message);
                });
                selectListService.GetSelection("Department").success(function (data) {
                    scope.DepartmentIDSelectList = <any[]>data;
                }).error(function (err) {
                    toaster.error("错误", err.Message);
                });
                selectListService.GetSelection("ProductSku").success(function (data) {
                    scope.ProductSkuIDSelectList = <any[]>data;
                });
                selectListService.GetSelection("Position").success(function (data) {
                    scope.PositionIDSelectList = <any[]>data;
                });
                selectListService.GetSelection("ProductSkuWithCatagory").success(function (data) {
                    scope.ProductSkuWithCatagorySelectList = <any[]>data;
                });
            }
            function getMaterialRequisition(id) {
                http.get("/api/MaterialRequisition/" + id).success(function (data: any) {
                    scope.item = <MaterialRequisition>data;
                    scope.item.CreateTime = new Date(data.CreateTime);
                    toaster.success("提示", "载入成功");
                }).error(function (data) {
                    toaster.error("错误", data.Message);
                });
            };
            function saveMaterialRequisition() {
                var promise = null;
                if (id == "0")
                    promise = http.post("/api/MaterialRequisition/", scope.item);
                else
                    promise = http.put("/api/MaterialRequisition/" + id, scope.item);
                promise.success(function (data) {
                    toaster.success("提示", "保存成功");
                    locationService.path("/MaterialRequisition");
                }).error(function (err) {
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                });
            }
            function submitMaterialRequisition() {
                //if (scope.form.$dirty) {
                //    alert("更改未保存");
                //    return;
                //}
                http.post("/api/MaterialRequisition/" + id + "/submit", scope.item).success(function (data) {
                    toaster.success("提示", "保存成功");
                    locationService.path("/MaterialRequisition");
                }).error(function (err) {
                    toaster.pop("error", "错误", Alps.phaseErr(err), 3000, "trustedHtml");
                });
            }
            function deleteMaterialRequisition() {
                if (confirm("确认要删除?")) {
                    http.delete("/api/MaterialRequisition/" + id).success(function (data) {
                        toaster.success("提示", "删除成功");
                        locationService.path("/MaterialRequisition");
                    }).error(function (err) {
                        toaster.error("错误", Alps.phaseErr(err));
                    });
                }
            }
            function productSelectionChanged(item) {

                var value = item.ProductSkuInfo;
                if (value && value.SkuID) {
                    for (var i = 0; i < scope.ProductSkuIDSelectList.length; i++) {
                        if (scope.ProductSkuIDSelectList[i].SkuID === value.SkuID) {
                            value.Name = scope.ProductSkuIDSelectList[i].Name;
                            value.PricingMethod = scope.ProductSkuIDSelectList[i].PricingMethod;
                            reCaluAmount(item);
                            break;
                        }
                    }
                }
            }
            function reCaluAmount(item) {
                if (item.ProductSkuInfo.PricingMethod === 0)
                    item.Amount = item.Quantity * item.Price;
                else
                    item.Amount = item.Weight * item.Price;
            }
            function goBack() {
                window.history.back();
            }
            function addSubItem() {
                if (scope.item.Items == undefined)
                    scope.item.Items = [];
                scope.item.Items.push({ "MaterialRequisitionID": scope.item.ID });
            }
            function deleteSubItem($index) {
                scope.item.Items.splice($index, 1);
            }
            scope.addSubItem = addSubItem;
            scope.deleteSubItem = deleteSubItem;
            scope.getMaterialRequisition = getMaterialRequisition;
            scope.saveMaterialRequisition = saveMaterialRequisition;
            scope.deleteMaterialRequisition = deleteMaterialRequisition;
            scope.submitMaterialRequisition = submitMaterialRequisition;
            scope.goBack = goBack;
            scope.productSelectionChanged = productSelectionChanged;
            var id = "";
            if (routeParams["id"]) {
                id = routeParams["id"];
                getSelectList();
                if (id != '0') {
                    getMaterialRequisition(id);
                }
                else
                    scope.item = new MaterialRequisition();

            }
            else {
                locationService.path("/MaterialRequisition");
            }
        }
    }

}

