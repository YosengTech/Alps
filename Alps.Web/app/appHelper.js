var Alps;
(function (Alps) {
    var Services;
    (function (Services) {
        var SelectListService = (function () {
            function SelectListService(http, toaster) {
                this.http = http;
                this.toaster = toaster;
            }
            SelectListService.prototype.GetSelectList = function (selectID) {
                return this.http.get("/api/" + selectID)
                    .error(function (err) {
                    this.toaster.error("错误", err.Message);
                });
            };
            SelectListService.prototype.GetSelection = function (selectName) {
                var self = this;
                return this.http.get("/selectList/get" + selectName + "?=" + new Date().toString())
                    .error(function (err) {
                    self.toaster.error("错误", err.Message);
                });
            };
            return SelectListService;
        }());
        SelectListService.$inject = ["$http", "toaster"];
        Services.SelectListService = SelectListService;
        angular.module("Alps.Services", []).service("SelectListService", Alps.Services.SelectListService);
    })(Services = Alps.Services || (Alps.Services = {}));
})(Alps || (Alps = {}));
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        var SelectListModalCtrl = (function () {
            function SelectListModalCtrl(scope, modalInstance, selectList, selectedItem) {
                scope.levelOne = selectList;
                scope.selectLevelOne = function (item) {
                    scope.levelTwo = item.Items;
                    scope.levelThree = null;
                    if (scope.levelTwo[0])
                        scope.selectLevelTwo(scope.levelTwo[0]);
                };
                scope.selectLevelTwo = function (item) {
                    scope.levelThree = item.Items;
                };
                scope.selectLevelThree = function (item) {
                    modalInstance.close(item);
                    //scope.levelThree = item;
                };
                scope.levelThree = [];
                if (selectedItem) {
                    outerloop: for (var i = 0, len = scope.levelOne.length; i < len; i++) {
                        for (var j = 0, lenj = scope.levelOne[i].Items.length; j < lenj; j++) {
                            for (var k = 0, lenk = scope.levelOne[i].Items[j].Items.length; k < lenk; k++) {
                                scope.levelThree.push(scope.levelOne[i].Items[j].Items[k]);
                                if (scope.levelOne[i].Items[j].Items[k].ID == selectedItem) {
                                    scope.levelTwo = scope.levelOne[i].Items;
                                    break outerloop;
                                }
                            }
                        }
                    }
                }
                scope.select = function (item) {
                    scope.selectedItem = item;
                    modalInstance.close(item);
                };
            }
            return SelectListModalCtrl;
        }());
        SelectListModalCtrl.$inject = ["$scope", "$uibModalInstance", "selectList", "selectedItem"];
        Controllers.SelectListModalCtrl = SelectListModalCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=appHelper.js.map