function maReferenceField(ReferenceRefresher) {
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
            function refresh(search) {
                return ReferenceRefresher.refresh(field, scope.value, search)
                    .then(function (formattedResults) {
                    scope.$broadcast('choices:update', { choices: formattedResults });
                });
            }
            if (field.remoteComplete()) {
                ReferenceRefresher.getInitialChoices(field, [scope.value])
                    .then(function (options) {
                    scope.$broadcast('choices:update', { choices: options });
                });
                scope.refresh = refresh;
            }
            else {
                refresh();
            }
        },
        template: "<ma-choice-field\n                field=\"field()\"\n                datastore=\"datastore()\"\n                refresh=\"refresh($search)\"\n                value=\"value\">\n            </ma-choice-field>"
    };
}
maReferenceField.$inject = ['ReferenceRefresher'];
module.exports = maReferenceField;
//# sourceMappingURL=maReferenceField.js.map