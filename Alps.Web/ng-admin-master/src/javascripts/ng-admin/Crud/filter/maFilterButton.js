function maFilterButtonDirective() {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            filters: '&',
            enabledFilters: '=',
            enableFilter: '&'
        },
        link: function (scope) {
            scope.notYetEnabledFilters = function () { return scope.filters().filter(function (filter) {
                return scope.enabledFilters.indexOf(filter) === -1;
            }); };
            scope.hasFilters = function () { return scope.notYetEnabledFilters().length > 0; };
        },
        template: "<span class=\"btn-group\" dropdown is-open=\"isopen\" ng-if=\"hasFilters()\">\n    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle >\n        <span class=\"glyphicon glyphicon-filter\" aria-hidden=\"true\"></span>&nbsp;Add filter <span class=\"caret\"></span>\n    </button>\n    <ul class=\"dropdown-menu\" role=\"menu\">\n        <li ng-repeat=\"filter in notYetEnabledFilters()\" ng-switch=\"button\">\n            <a ng-click=\"enableFilter()(filter)\">{{ filter.label() }}</a>\n        </li>\n    </ul>\n</span>"
    };
}
maFilterButtonDirective.$inject = [];
module.exports = maFilterButtonDirective;
//# sourceMappingURL=maFilterButton.js.map