function maViewBatchActionsDirective($injector) {
    var $compile = $injector.get('$compile');
    return {
        restrict: 'E',
        scope: {
            'entity': '=',
            'selection': '=',
            'buttons': '&'
        },
        link: function (scope) {
            scope.isopen = false;
            scope.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.isopen = !scope.isopen;
            };
            scope.buttons = scope.buttons();
            if (typeof scope.buttons === 'string') {
                scope.customTemplate = scope.buttons;
                scope.buttons = null;
            }
        },
        // the ng-class hidden is necessary to hide the inner blank space used for spacing buttons when the selection is not empty
        template: "<span ng-if=\"selection\" ng-class=\"{hidden:!selection || selection.length==0}\"> <span class=\"btn-group\" dropdown is-open=\"isopen\"><button type=\"button\" ng-if=\"selection.length\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle >\n            {{ selection.length }} Selected <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu\" role=\"menu\">\n            <li ng-repeat=\"button in buttons\" ng-switch=\"button\">\n                <a ng-switch-when=\"delete\">\n                    <ma-batch-delete-button selection=\"selection\" entity=\"entity\"/>\n                </a>\n                <a ng-switch-default>\n                    <span compile=\"button\"></span>\n                </a>\n            </li>\n        </ul>\n    </span>\n</span>"
    };
}
maViewBatchActionsDirective.$inject = ['$injector'];
module.exports = maViewBatchActionsDirective;
//# sourceMappingURL=maViewBatchActions.js.map