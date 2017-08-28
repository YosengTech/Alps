function maReferenceManyField(ReferenceRefresher) {
    'use strict';
    return {
        scope: {
            'field': '&',
            'value': '=',
            'entry': '=?',
            'datastore': '&?'
        },
        restrict: 'E',
        link: function (scope) {
            var field = scope.field();
            scope.name = field.name();
            scope.v = field.validation();
            scope.choices = [];
            function refresh(search) {
                return ReferenceRefresher.refresh(field, scope.value, search)
                    .then(function (formattedResults) {
                    scope.$broadcast('choices:update', { choices: formattedResults });
                });
            }
            // if value is set, we should retrieve references label from server
            if (scope.value && scope.value.length) {
                ReferenceRefresher.getInitialChoices(field, scope.value)
                    .then(function (options) {
                    scope.$broadcast('choices:update', { choices: options });
                    if (field.remoteComplete()) {
                        scope.refresh = refresh;
                    }
                    else {
                        refresh();
                    }
                });
            }
            else {
                if (field.remoteComplete()) {
                    scope.refresh = refresh;
                }
                else {
                    refresh();
                }
            }
        },
        template: "<ma-choices-field\n                field=\"field()\"\n                datastore=\"datastore()\"\n                refresh=\"refresh($search)\"\n                value=\"value\">\n            </ma-choice-field>"
    };
}
maReferenceManyField.$inject = ['ReferenceRefresher'];
module.exports = maReferenceManyField;
//# sourceMappingURL=maReferenceManyField.js.map