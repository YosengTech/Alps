module Alps {
    export class SelectListService {
        public static $inject = ["$http", "toaster"];
        http: ng.IHttpService;
        toaster: ngToaster.IToasterService;
        constructor(http: ng.IHttpService, toaster: ngToaster.IToasterService) {
            this.http = http;
            this.toaster = toaster;
        }
        public GetSelectList(selectID: string) {
            return this.http.get("/api/" + selectID)//.success(function (data) {
            //       dest= <any[]>data;
            //})
                .error(function (err) {
                this.toaster.error("错误", err.Message);
            });
        }
    }
    angular.module("Alps").service("SelectListService", Alps.SelectListService);;
} 