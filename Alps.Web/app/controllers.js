var Alps;
(function (Alps) {
    var Controllers;
    (function (Controllers) {
        var WarehouseVouchersCtrl = (function () {
            function WarehouseVouchersCtrl(scope) {
                scope.getall = this.getall;
            }
            WarehouseVouchersCtrl.prototype.getall = function () {
                $.get("/api/WarehouseVouchers", function (data) {
                });
            };
            WarehouseVouchersCtrl.$inject = ["$scope"];
            return WarehouseVouchersCtrl;
        })();
        Controllers.WarehouseVouchersCtrl = WarehouseVouchersCtrl;
    })(Controllers = Alps.Controllers || (Alps.Controllers = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=controllers.js.map