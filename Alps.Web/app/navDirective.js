!function () {
    "use strict";
    angular.module("Alps.Directives", []).directive("toggleNavMin", ["$rootScope", function ($rs) {
            return function (scope, el) {
                var app = $("#app");
                $rs.$watch("isMobile", function () {
                    $rs.isMobile && app.removeClass("nav-min");
                }), el.on("click", function (e) {
                    $rs.isMobile || (app.toggleClass("nav-min"), $rs.$broadcast("nav.reset"), $rs.$broadcast("chartist.update")), e.preventDefault();
                });
            };
        }]).directive("collapseNavAccordion", [function () {
            return {
                restrict: "A",
                link: function (scope, el) {
                    var lists = el.find("ul").parent("li"), a = lists.children("a"), listsRest = el.children("ul").children("li").not(lists), aRest = listsRest.children("a"), app = $("#app"), stopClick = 0;
                    a.on("click", function (e) {
                        if (e.timeStamp - stopClick > 300) {
                            if (app.hasClass("nav-min") && window.innerWidth > 767)
                                return;
                            var self = $(this), parent = self.parent("li");
                            a.not(self).next("ul").slideUp(), self.next("ul").slideToggle(), lists.not(parent).removeClass("open"), parent.toggleClass("open"), stopClick = e.timeStamp;
                        }
                        e.preventDefault();
                    }), aRest.on("click", function () {
                        var parent = aRest.parent("li");
                        lists.not(parent).removeClass("open").find("ul").slideUp();
                    }), scope.$on("nav.reset", function (e) {
                        a.next("ul").removeAttr("style"), lists.removeClass("open"), e.preventDefault();
                    });
                }
            };
        }]).directive("toggleOffCanvas", ["$rootScope", function () {
            return {
                restrict: "A",
                link: function (scope, el) {
                    el.on("click", function () {
                        $("#app").toggleClass("on-canvas");
                    });
                }
            };
        }]).directive("highlightActive", ["$location", function ($location) {
            return {
                restrict: "A",
                link: function (scope, el) {
                    var links = el.find("a"), path = function () {
                        return $location.path();
                    }, highlightActive = function (links, path) {
                        var path = "#" + path;
                        angular.forEach(links, function (link) {
                            var link = angular.element(link), li = link.parent("li"), href = link.attr("href");
                            li.hasClass("active") && li.removeClass("active"), 0 == path.indexOf(href) && li.addClass("active");
                        });
                    };
                    highlightActive(links, $location.path()), scope.$watch(path, function (newVal, oldVal) {
                        newVal != oldVal && highlightActive(links, $location.path());
                    });
                }
            };
        }]).directive("uiCheckbox", [function () {
            return {
                restrict: "A",
                link: function (scope, el) {
                    el.children().on("click", function (e) {
                        el.hasClass("checked") ? (el.removeClass("checked"), el.children().removeAttr("checked")) : (el.addClass("checked"), el.children().attr("checked", !0)), e.stopPropagation();
                    });
                }
            };
        }]).directive("customScrollbar", ["$interval", function ($interval) {
            return {
                restrict: "A",
                link: function (scope, el) {
                    scope.$isMobile || (el.perfectScrollbar({
                        suppressScrollX: !0
                    }), $interval(function () {
                        el[0].scrollHeight >= el[0].clientHeight && el.perfectScrollbar("update");
                    }, 60));
                }
            };
        }]).directive("customPage", [function () {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$location", function ($scope, $element, $location) {
                        var path = function () {
                            return $location.path();
                        }, addBg = function (path) {
                            switch ($element.removeClass("body-full"), path) {
                                case "/404":
                                case "/pages/404":
                                case "/pages/login":
                                case "/pages/register":
                                case "/pages/forget-pass":
                                case "/pages/lock-screen":
                                    $element.addClass("body-full");
                            }
                        };
                        addBg($location.path()), $scope.$watch(path, function (newVal, oldVal) {
                            angular.equals(newVal, oldVal) || addBg($location.path());
                        });
                    }]
            };
        }]);
}();
//# sourceMappingURL=navDirective.js.map