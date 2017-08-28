module Alps.Directives {
    export class productskuselectorDirective {

        public static $inject = [];
        constructor(uibModal:ng.ui.bootstrap.IModalService,q:ng.IQService,selectListService) {
            var delay = q.defer();
            selectListService.GetSelection("ProductSkuWithCatagory").success(function (data) {
                return delay.resolve(data);
            });
            var d: ng.IDirective = {};
            d.restrict = 'A';
            d.priority = 0;
            d.scope = {
                ngModel: "=",
                selectlist: "=",
                ngChange: "&"
            };
            d.transclude = true;
            d.replace = true;
            d.template = '<div><button class="btn btn-default btn-sm ">{{name}}</button></div>';
            //d.controller = SelectListModalCtrl;
  
            d.link = function (scope: any, el, attributes, controller) {
                angular.element(el[0].children).on("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (event.which == 1) {
                        uibModal.open({ templateUrl: "/template/home/SelectListModal", backdrop: true, controller: SelectListModalCtrl, resolve: { selectList: function () { return scope.selectlist; }, selectedItem: function () { return scope.ngModel; } } })
                            .result.then(function (result) {
                            scope.ngModel = result.ID;
                            scope.name = result.Name;
                            setTimeout(scope.ngChange, 0);
                        });
                    }
                });
                delay.promise.then(function (data) {
                    scope.selectlist = data;
                    if (!scope.selectlist) return;
                    outerloop:
                    for (var i = 0, len = scope.selectlist.length; i < len; i++) {
                        for (var j = 0, lenj = scope.selectlist[i].Items.length; j < lenj; j++) {
                            for (var k = 0, lenk = scope.selectlist[i].Items[j].Items.length; k < lenk; k++) {
                                if (scope.selectlist[i].Items[j].Items[k].ID == scope.ngModel) {
                                    scope.name = scope.selectlist[i].Items[j].Items[k].Name;
                                    break outerloop;
                                }
                            }
                        }
                    }

                    if (!scope.name)
                        scope.name = "请选择"
                });
            };
            return d;
        }
        public static Factory() {
            var directive = (uibModal,q,selectListService) => {
                return new productskuselectorDirective(uibModal, q, selectListService);
            };
            directive.$inject = ["$uibModal", "$q","SelectListService"];
            return directive;
        }
    }
    export class SelectListModalCtrl {
        public static $inject = ["$scope", "$uibModalInstance", "selectList", "selectedItem"]
        constructor(scope, modalInstance, selectList, selectedItem) {

            scope.levelOne = selectList;
            scope.selectLevelOne = function (item) {
                scope.levelOneSelected = item;
                scope.levelTwo = item.Items;
                scope.levelThree = null;
                if (scope.levelTwo[0])
                    scope.selectLevelTwo(scope.levelTwo[0]);

            }
            scope.selectLevelTwo = function (item) {
                scope.levelTwoSelected = item;
                scope.levelThree = item.Items;
            }
            scope.selectLevelThree = function (item) {
                scope.levelThreeSelected = item;
                modalInstance.close(item);
                //scope.levelThree = item;
            }
            scope.levelThree = [];
            if (selectedItem) {
                outerloop:
                for (var i = 0, len = scope.levelOne.length; i < len; i++) {
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
                if (!scope.levelTwo && scope.levelOne[0]) {
                    scope.selectLevelOne(scope.levelOne[0]);
                    //scope.levelTwo = scope.levelOne[0].Items;
                }
            }
            else {
                if (scope.levelOne[0]) {
                    scope.selectLevelOne(scope.levelOne[0]);
                }
            }
        }
    }

    
}
