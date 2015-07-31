module Alps.Controllers {
    interface WarehouseVoucher {

    }
    interface IWarehouseVouchersListScope {
        items: any[];
        getall(): void;
    }
    export class WarehouseVouchersCtrl {
        public static $inject = ["$scope"];
        constructor(scope: IWarehouseVouchersListScope) {
            scope.getall = this.getall;
        }
        getall() {
            $.get("/api/WarehouseVouchers", function (data) {

            });
        }
    }

}
