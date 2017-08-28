"use strict";
/**
 * Edition field for a date - a text input with a datepicker.
 *
 * @example <ma-date-field field="field" value="value"></ma-date-field>
 */
function maDateField() {
    return {
        scope: {
            'field': '&',
            'value': '='
        },
        restrict: 'E',
        link: function (scope, element) {
            var field = scope.field();
            scope.name = field.name();
            scope.rawValue = scope.value;
            scope.$watch('rawValue', function (rawValue) {
                scope.value = field.parse()(rawValue);
            });
            scope.format = field.format();
            if (!scope.format) {
                scope.format = field.type() === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss';
            }
            scope.v = field.validation();
            scope.isOpen = false;
            var input = element.find('input').eq(0);
            var attributes = field.attributes();
            for (var name in attributes) {
                input.attr(name, attributes[name]);
            }
            scope.toggleDatePicker = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.isOpen = !scope.isOpen;
            };
        },
        template: "\n            <div class=\"input-group datepicker\">\n                <input\n                    type=\"text\" ng-model=\"rawValue\" id=\"{{ name }}\" name=\"{{ name }}\" class=\"form-control\"\n                    datepicker-popup=\"{{ format }}\" is-open=\"isOpen\" close-text=\"Close\" ng-required=\"v.required\" />\n                <span class=\"input-group-btn\">\n                    <button type=\"button\" class=\"btn btn-default\" ng-click=\"toggleDatePicker($event)\">\n                        <i class=\"glyphicon glyphicon-calendar\"></i>\n                    </button>\n                </span>\n            </div>\n        "
    };
}
maDateField.$inject = [];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = maDateField;
//# sourceMappingURL=maDateField.js.map