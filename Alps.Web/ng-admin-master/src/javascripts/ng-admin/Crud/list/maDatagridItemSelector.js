/*global define*/
define(function () {
    'use strict';
    function DatagridItemSelectorDirective() {
        return {
            restrict: 'E',
            scope: {
                entry: '=',
                selection: '=',
                toggleSelect: '&'
            },
            template: '<input type="checkbox" ng-click="toggle(entry)" ng-checked="isInSelection()"/>',
            link: function (scope) {
                scope.toggle = function (entry) { return scope.toggleSelect({ entry: entry }); };
                var e = scope.entry;
                scope.isInSelection = function () { return scope.selection.filter(function (s) { return s._entityName == e._entityName && s._identifierValue == e._identifierValue; }).length > 0; };
            }
        };
    }
    DatagridItemSelectorDirective.$inject = [];
    return DatagridItemSelectorDirective;
});
//# sourceMappingURL=maDatagridItemSelector.js.map