var Alps;
(function (Alps) {
    var Filters;
    (function (Filters) {
        var app = angular.module("Alps.Filters", []);
        app.filter('displayName', function () {
            return function (id, map, idField, valueField) {
                if (typeof map !== undefined) {
                    if (idField === undefined)
                        idField = "ID";
                    if (valueField === undefined)
                        valueField = "Name";
                    for (var i = 0; i < map.length; i++) {
                        if (map[i][idField] == id) {
                            return map[i][valueField];
                        }
                    }
                }
                return id;
            };
        });
        app.filter('warehouseVoucherStateFilter', function () {
            return function (input) {
                switch (input) {
                    case 0:
                        return '未确认';
                    case 1:
                        return '已确认';
                }
            };
        });
    })(Filters = Alps.Filters || (Alps.Filters = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=appFilter.js.map