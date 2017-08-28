var Alps;
(function (Alps) {
    var Directives;
    (function (Directives) {
        var productSkuSelectorDirective = (function () {
            function productSkuSelectorDirective() {
                var d = {};
                d.restrict = 'A';
                d.priority = 0;
                d.scope = {};
                d.transclude = true;
                d.replace = true;
                d.templateUrl = "<div>Your content</div>";
                d.controller = function ($scope, $element) {
                };
                return d;
            }
            productSkuSelectorDirective.$inject = [];
            return productSkuSelectorDirective;
        })();
        Directives.productSkuSelectorDirective = productSkuSelectorDirective;
    })(Directives = Alps.Directives || (Alps.Directives = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=productSkuSelector.js.map