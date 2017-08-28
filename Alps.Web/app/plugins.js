//angular-loading-bar
!function () {
    "use strict";
    angular.module("angular-loading-bar", ["cfp.loadingBarInterceptor"]),
        angular.module("chieffancypants.loadingBar", ["cfp.loadingBarInterceptor"]),
        angular.module("cfp.loadingBarInterceptor", ["cfp.loadingBar"]).
            config(["$httpProvider", function (a) {
                var b = ["$q", "$cacheFactory", "$timeout", "$rootScope", "cfpLoadingBar",
                    function (b, c, d, e, f) { function g() { d.cancel(i), f.complete(), k = 0, j = 0; } function h(b) { var d, e = c.get("$http"), f = a.defaults; !b.cache && !f.cache || b.cache === !1 || "GET" !== b.method && "JSONP" !== b.method || (d = angular.isObject(b.cache) ? b.cache : angular.isObject(f.cache) ? f.cache : e); var g = void 0 !== d ? void 0 !== d.get(b.url) : !1; return void 0 !== b.cached && g !== b.cached ? b.cached : (b.cached = g, g); } var i, j = 0, k = 0, l = f.latencyThreshold; return { request: function (a) { return a.ignoreLoadingBar || h(a) || (e.$broadcast("cfpLoadingBar:loading", { url: a.url }), 0 === j && (i = d(function () { f.start(); }, l)), j++, f.set(k / j)), a; }, response: function (a) { return a.config.ignoreLoadingBar || h(a.config) || (k++, e.$broadcast("cfpLoadingBar:loaded", { url: a.config.url }), k >= j ? g() : f.set(k / j)), a; }, responseError: function (a) { return a.config.ignoreLoadingBar || h(a.config) || (k++, e.$broadcast("cfpLoadingBar:loaded", { url: a.config.url }), k >= j ? g() : f.set(k / j)), b.reject(a); } }; }];
                a.interceptors.push(b);
            }]), angular.module("cfp.loadingBar", []).provider("cfpLoadingBar", function () { this.includeSpinner = !0, this.includeBar = !0, this.latencyThreshold = 100, this.startSize = .02, this.parentSelector = "body", this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>', this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>', this.$get = ["$injector", "$document", "$timeout", "$rootScope", function (a, b, c, d) { function e() { k || (k = a.get("$animate")); var e = b.find(n).eq(0); c.cancel(m), r || (d.$broadcast("cfpLoadingBar:started"), r = !0, u && k.enter(o, e), t && k.enter(q, e), f(v)); } function f(a) { if (r) {
            var b = 100 * a + "%";
            p.css("width", b), s = a, c.cancel(l), l = c(function () { g(); }, 250);
        } } function g() { if (!(h() >= 1)) {
            var a = 0, b = h();
            a = b >= 0 && .25 > b ? (3 * Math.random() + 3) / 100 : b >= .25 && .65 > b ? 3 * Math.random() / 100 : b >= .65 && .9 > b ? 2 * Math.random() / 100 : b >= .9 && .99 > b ? .005 : 0;
            var c = h() + a;
            f(c);
        } } function h() { return s; } function i() { s = 0, r = !1; } function j() { k || (k = a.get("$animate")), d.$broadcast("cfpLoadingBar:completed"), f(1), c.cancel(m), m = c(function () { var a = k.leave(o, i); a && a.then && a.then(i), k.leave(q); }, 500); } var k, l, m, n = this.parentSelector, o = angular.element(this.loadingBarTemplate), p = o.find("div").eq(0), q = angular.element(this.spinnerTemplate), r = !1, s = 0, t = this.includeSpinner, u = this.includeBar, v = this.startSize; return { start: e, set: f, status: h, inc: g, complete: j, includeSpinner: this.includeSpinner, latencyThreshold: this.latencyThreshold, parentSelector: this.parentSelector, startSize: this.startSize }; }]; });
}();
//# sourceMappingURL=plugins.js.map