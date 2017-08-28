/*global define*/
define(function (require) {
    'use strict';
    var maDatagridController = require('./maDatagridController');
    function maDatagridDirective() {
        return {
            restrict: 'E',
            scope: {
                name: '@',
                entries: '=',
                selection: '=',
                fields: '&',
                listActions: '&',
                entity: '&'
            },
            controllerAs: 'datagrid',
            controller: maDatagridController,
            template: "<table class=\"grid table table-condensed table-hover table-striped\">\n    <thead>\n        <tr>\n            <th ng-if=\"selection\">\n                <ma-datagrid-multi-selector toggle-select-all=\"toggleSelectAll()\" selection=\"selection\" entries=\"entries\"/>\n            </th>\n            <th ng-repeat=\"field in fields() track by $index\" ng-class=\"'ng-admin-column-' + field.name()\">\n                <a ng-click=\"datagrid.sort(field)\">\n                    <span class=\"glyphicon {{ datagrid.sortDir === 'DESC' ? 'glyphicon-chevron-down': 'glyphicon-chevron-up' }}\" ng-if=\"datagrid.isSorting(field)\"></span>\n\n                    {{ field.label() }}\n                </a>\n            </th>\n            <th ng-if=\"datagrid.shouldDisplayActions\" class=\"ng-admin-column-actions\">\n                Actions\n            </th>\n        </tr>\n    </thead>\n\n    <tbody>\n        <tr ng-repeat=\"entry in entries track by entry.identifierValue\">\n            <td ng-if=\"selection\">\n                <ma-datagrid-item-selector toggle-select=\"toggleSelect(entry)\" selection=\"selection\" entry=\"entry\"/>\n            </td>\n            <td ng-repeat=\"field in fields() track by $index\" ng-class=\"field.getCssClasses(entry)\">\n                <ma-column field=\"::field\" entry=\"::entry\" entity=\"::entity\"></ma-column>\n            </td>\n            <td ng-if=\"datagrid.shouldDisplayActions\" class=\"ng-admin-column-actions\">\n                <ma-list-actions entry=\"::entry\" entity=\"::entity\" buttons=\"listActions()\"></ma-list-actions>\n            </td>\n        </tr>\n    </tbody>\n</table>"
        };
    }
    maDatagridDirective.$inject = [];
    return maDatagridDirective;
});
//# sourceMappingURL=maDatagrid.js.map