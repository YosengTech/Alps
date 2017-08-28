/*global define*/
define(function (require) {
    'use strict';
    /**
     * Generic edition field
     *
     * @example <ma-input-field type="text" field="field" value="value"></ma-input-field>
     */
    function maInputField() {
        return {
            scope: {
                'type': '@',
                'step': '@?',
                'field': '&',
                'value': '='
            },
            restrict: 'E',
            link: function (scope, element) {
                var field = scope.field();
                scope.name = field.name();
                scope.v = field.validation();
                var input = element.children()[0];
                var attributes = field.attributes();
                for (var name in attributes) {
                    if (name === 'step') {
                        scope.step = attributes[name];
                        continue;
                    }
                    input[name] = attributes[name];
                }
            },
            template: "<input type=\"{{ type || 'text' }}\" ng-attr-step=\"{{ step }}\" ng-model=\"value\"\n    id=\"{{ name }}\" name=\"{{ name }}\" class=\"form-control\"\n    'ng-required=\"v.required\" ng-minlength=\"v.minlength\" ng-maxlength=\"v.maxlength\" />"
        };
    }
    maInputField.$inject = [];
    return maInputField;
});
//# sourceMappingURL=maInputField.js.map