var FilterController = require('./maFilterController');
var _ = require('lodash');
function maFilterDirective(FieldViewConfiguration) {
    'use strict';
    var filterWidgetTypes = _(FieldViewConfiguration)
        .map(function (fieldView, field) {
        return '<span ng-switch-when="' + field + '">' + fieldView.getFilterWidget() + '</span>';
    }).join('');
    var template = "\n<div class=\"row\">\n    <form class=\"filters col-md-offset-6 col-md-6 form-horizontal\" ng-if=\"filterCtrl.shouldFilter()\">\n        <div class=\"filter form-group input-{{ field.type() }}\" ng-repeat=\"field in filters track by $index\">\n            <div class=\"col-sm-1 col-xs-1 remove_filter\">\n                <a ng-if=\"!field.pinned()\" ng-click=\"filterCtrl.removeFilter(field)\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n            </div>\n            <label for=\"{{ field.name() }}\" class=\"col-sm-4 col-xs-11 control-label\">\n                {{ field.label() }}<span ng-if=\"field.validation().required\">&nbsp;*</span>&nbsp;\n            </label>\n            <div class=\"col-sm-7\" ng-switch=\"field.type()\" ng-class=\"field.getCssClasses(entry)\">\n                " + filterWidgetTypes + "\n            </div>\n        </div>\n    </form>\n</div>\n    ";
    return {
        restrict: 'E',
        template: template,
        scope: {
            filters: '=',
            datastore: '&',
            values: '&'
        },
        controllerAs: 'filterCtrl',
        controller: FilterController
    };
}
maFilterDirective.$inject = ['FieldViewConfiguration'];
module.exports = maFilterDirective;
//# sourceMappingURL=maFilter.js.map