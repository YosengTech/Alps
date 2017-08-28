var Alps;
(function (Alps) {
    var Directives;
    (function (Directives) {
        var app = angular.module("Alps.Directives");
        app.directive('draggable', ['$document', function ($document) {
                return function (scope, element, attr) {
                    var startX = 0, startY = 0, x = 0, y = 0;
                    angular.element(document.getElementsByClassName("modal-header")).css({ cursor: 'move' });
                    element = angular.element(document.getElementsByClassName("modal-dialog"));
                    element.css({
                        position: 'relative'
                    });
                    element.css({ left: '0px' });
                    element.on('mousedown', function (event) {
                        // Prevent default dragging of selected content
                        event.preventDefault();
                        startX = event.pageX - x;
                        startY = event.pageY - y;
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                    });
                    function mousemove(event) {
                        y = event.pageY - startY;
                        x = event.pageX - startX;
                        element.css({
                            top: y + 'px',
                            left: x + 'px'
                        });
                        angular.element(document.getElementById("log")).html(x.toString() + "px," + y.toString() + "px" + startX.toString() + "px," + startY.toString() + "px");
                    }
                    function mouseup() {
                        $document.off('mousemove', mousemove);
                        $document.off('mouseup', mouseup);
                    }
                };
            }]);
    })(Directives = Alps.Directives || (Alps.Directives = {}));
})(Alps || (Alps = {}));
//# sourceMappingURL=draggableDirective.js.map