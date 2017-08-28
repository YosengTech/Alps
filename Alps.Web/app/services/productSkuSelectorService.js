var Alps;
(function (Alps) {
    var Services;
    (function (Services) {
        var productSkuSelectorService = (function () {
            function productSkuSelectorService(uibModal, selectListService, q) {
                this.uibModal = uibModal;
                this.selectListSevice = selectListService;
                this.delay = q.defer();
                selectListService.GetSelection("ProductSkuWithCatagory").success(function (data) {
                    return this.delay.resolve(data);
                });
            }
            productSkuSelectorService.prototype.Show = function () {
                this.delay.promise.then(function (data) {
                    return this.uibModal.open({ templateUrl: "/template/home/SelectListModal", backdrop: true, controller: SelectListModalCtrl, resolve: { selectList: function () { return this.selectlist; }, selectedItem: function () { return this.ngModel; } } })
                        .result;
                });
            };
            return productSkuSelectorService;
        }());
        productSkuSelectorService.$inject = ["$uibModal", "SelectListService", "$q"];
        Services.productSkuSelectorService = productSkuSelectorService;
        var SelectListModalCtrl = (function () {
            function SelectListModalCtrl(scope, modalInstance, selectList, selectedItem) {
                scope.levelOne = selectList;
                scope.selectLevelOne = function (item) {
                    scope.levelOneSelected = item;
                    scope.levelTwo = item.Items;
                    scope.levelThree = null;
                    if (scope.levelTwo[0])
                        scope.selectLevelTwo(scope.levelTwo[0]);
                };
                scope.selectLevelTwo = function (item) {
                    scope.levelTwoSelected = item;
                    scope.levelThree = item.Items;
                };
                scope.selectLevelThree = function (item) {
                    scope.levelThreeSelected = item;
                    modalInstance.close(item);
                    //scope.levelThree = item;
                };
                scope.levelThree = [];
                if (selectedItem) {
                    outerloop: for (var i = 0, len = scope.levelOne.length; i < len; i++) {
                        for (var j = 0, lenj = scope.levelOne[i].Items.length; j < lenj; j++) {
                            for (var k = 0, lenk = scope.levelOne[i].Items[j].Items.length; k < lenk; k++) {
                                if (scope.levelOne[i].Items[j].Items[k].ID == selectedItem) {
                                    scope.levelOneSelected = scope.levelOne[i];
                                    scope.levelTwoSelected = scope.levelOne[i].Items[j];
                                    scope.levelThreeSelected = scope.levelOne[i].Items[j].Items[k];
                                    scope.levelTwo = scope.levelOne[i].Items;
                                    scope.levelThree = scope.levelOne[i].Items[j].Items;
                                    break outerloop;
                                }
                            }
                        }
                    }
                    if (!scope.levelTwo)
                        scope.levelTwo = scope.levelOne[0].Items;
                }
            }
            return SelectListModalCtrl;
        }());
        SelectListModalCtrl.$inject = ["$scope", "$uibModalInstance", "selectList", "selectedItem"];
        Services.SelectListModalCtrl = SelectListModalCtrl;
    })(Services = Alps.Services || (Alps.Services = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=productSkuSelectorService.js.map