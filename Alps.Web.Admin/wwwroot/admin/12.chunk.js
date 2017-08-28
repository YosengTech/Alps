webpackJsonpac__name_([12],{

/***/ 1070:
/***/ (function(module, exports) {

module.exports = "<section class=\"chartist\">\n  <div class=\"row\">\n    <div class=\"col-md-6 \">\n      <ba-card title=\"Lines\" baCardClass=\"with-scroll\">\n        <h5>Simple line chart</h5>\n        <ba-chartist-chart baChartistChartClass=\"ct-chart\"\n                           baChartistChartType=\"Line\"\n                           [baChartistChartData]=\"data['simpleLineData']\"\n                           [baChartistChartOptions]=\"data['simpleLineOptions']\">\n        </ba-chartist-chart>\n\n        <h5>Line chart with area</h5>\n        <ba-chartist-chart baChartistChartClass=\"ct-chart\"\n                           baChartistChartType=\"Line\"\n                           [baChartistChartData]=\"data['areaLineData']\"\n                           [baChartistChartOptions]=\"data['areaLineOptions']\">\n        </ba-chartist-chart>\n\n        <h5>Bi-polar line chart with area only</h5>\n        <ba-chartist-chart baChartistChartClass=\"ct-chart\"\n                           baChartistChartType=\"Line\"\n                           [baChartistChartData]=\"data['biLineData']\"\n                           [baChartistChartOptions]=\"data['biLineOptions']\">\n        </ba-chartist-chart>\n      </ba-card>\n    </div>\n\n    <div class=\"col-md-6 \">\n      <ba-card title=\"Bars\" baCardClass=\"with-scroll\">\n        <h5>Simple bar chart</h5>\n        <ba-chartist-chart baChartistChartClass=\"ct-chart\"\n                           baChartistChartType=\"Bar\"\n                           [baChartistChartData]=\"data['simpleBarData']\"\n                           [baChartistChartOptions]=\"data['simpleBarOptions']\">\n        </ba-chartist-chart>\n\n        <h5>Multi-line labels bar chart</h5>\n        <ba-chartist-chart baChartistChartClass=\"ct-chart\"\n                           baChartistChartType=\"Bar\"\n                           [baChartistChartData]=\"data['multiBarData']\"\n                           [baChartistChartOptions]=\"data['multiBarOptions']\"\n                           [baChartistChartResponsive]=\"data['multiBarResponsive']\">\n        </ba-chartist-chart>\n\n        <h5>Stacked bar chart</h5>\n        <ba-chartist-chart baChartistChartClass=\"ct-chart stacked-bar\"\n                           baChartistChartType=\"Bar\"\n                           [baChartistChartData]=\"data['stackedBarData']\"\n                           [baChartistChartOptions]=\"data['stackedBarOptions']\">\n        </ba-chartist-chart>\n      </ba-card>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <ba-card title=\"Pies & Donuts\" baCardClass=\"with-scroll\">\n        <div class=\"row\">\n          <div class=\"col-md-12 col-lg-4\"><h5>Simple Pie</h5>\n            <ba-chartist-chart baChartistChartClass=\"ct-chart stacked-bar\"\n                               baChartistChartType=\"Pie\"\n                               [baChartistChartData]=\"data['simplePieData']\"\n                               [baChartistChartOptions]=\"data['simplePieOptions']\"\n                               [baChartistChartResponsive]=\"getResponsive(20, 80)\">\n            </ba-chartist-chart>\n          </div>\n          <div class=\"col-md-12 col-lg-4\"><h5>Pie with labels</h5>\n            <ba-chartist-chart baChartistChartClass=\"ct-chart stacked-bar\"\n                               baChartistChartType=\"Pie\"\n                               [baChartistChartData]=\"data['labelsPieData']\"\n                               [baChartistChartOptions]=\"data['labelsPieOptions']\">\n            </ba-chartist-chart>\n          </div>\n          <div class=\"col-md-12 col-lg-4\"><h5>Donut</h5>\n            <ba-chartist-chart baChartistChartClass=\"ct-chart stacked-bar\"\n                               baChartistChartType=\"Pie\"\n                               [baChartistChartData]=\"data['simpleDonutData']\"\n                               [baChartistChartOptions]=\"data['simpleDonutOptions']\"\n                               [baChartistChartResponsive]=\"getResponsive(5, 40)\">\n            </ba-chartist-chart>\n          </div>\n        </div>\n      </ba-card>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ 1131:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(814);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(9)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(814, function() {
			var newContent = __webpack_require__(814);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_nga_module__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__charts_routing__ = __webpack_require__(930);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__charts_component__ = __webpack_require__(863);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_chartistJs_chartistJs_component__ = __webpack_require__(864);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_chartistJs_chartistJs_service__ = __webpack_require__(865);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartsModule", function() { return ChartsModule; });








var ChartsModule = (function () {
    function ChartsModule() {
    }
    return ChartsModule;
}());
ChartsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__theme_nga_module__["a" /* NgaModule */],
            __WEBPACK_IMPORTED_MODULE_4__charts_routing__["a" /* routing */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__charts_component__["a" /* Charts */],
            __WEBPACK_IMPORTED_MODULE_6__components_chartistJs_chartistJs_component__["a" /* ChartistJs */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__components_chartistJs_chartistJs_service__["a" /* ChartistJsService */]
        ]
    })
], ChartsModule);



/***/ }),

/***/ 814:
/***/ (function(module, exports) {

module.exports = ".ct-area {\n  fill-opacity: .5; }\n\n.ct-label {\n  color: #ffffff;\n  opacity: 0.9;\n  fill: #ffffff; }\n\n.ct-chart .ct-label {\n  font-size: 1em; }\n\n.ct-chart svg {\n  width: 100%;\n  display: block; }\n\n.ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-slice-donut, .ct-series-a .ct-slice-pie {\n  stroke: #00abff; }\n\n.ct-series-a .ct-slice-pie, .ct-series-a .ct-area {\n  fill: #00abff; }\n\n.ct-series-b .ct-bar, .ct-series-b .ct-line, .ct-series-b .ct-point, .ct-series-b .ct-slice-donut, .ct-series-b .ct-slice-pie {\n  stroke: #8bd22f; }\n\n.ct-series-b .ct-slice-pie, .ct-series-b .ct-area {\n  fill: #8bd22f; }\n\n.ct-series-c .ct-bar, .ct-series-c .ct-line, .ct-series-c .ct-point, .ct-series-c .ct-slice-donut, .ct-series-c .ct-slice-pie {\n  stroke: #f95372; }\n\n.ct-series-c .ct-slice-pie, .ct-series-c .ct-area {\n  fill: #f95372; }\n\n.ct-series-d .ct-bar, .ct-series-d .ct-line, .ct-series-d .ct-point, .ct-series-d .ct-slice-donut, .ct-series-d .ct-slice-pie {\n  stroke: #e7ba08; }\n\n.ct-series-d .ct-slice-pie, .ct-series-d .ct-area {\n  fill: #e7ba08; }\n\n.ct-series-e .ct-bar, .ct-series-e .ct-line, .ct-series-e .ct-point, .ct-series-e .ct-slice-donut, .ct-series-e .ct-slice-pie {\n  stroke: #40daf1; }\n\n.ct-series-e .ct-slice-pie, .ct-series-e .ct-area {\n  fill: #40daf1; }\n\n.stacked-bar .ct-bar {\n  stroke-width: 30px; }\n"

/***/ }),

/***/ 863:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Charts; });

var Charts = (function () {
    function Charts() {
    }
    Charts.prototype.ngOnInit = function () {
    };
    return Charts;
}());
Charts = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'maps',
        template: "<router-outlet></router-outlet>"
    }),
    __metadata("design:paramtypes", [])
], Charts);



/***/ }),

/***/ 864:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chartistJs_service__ = __webpack_require__(865);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_style_loader_chartistJs_scss__ = __webpack_require__(1131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_style_loader_chartistJs_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_style_loader_chartistJs_scss__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartistJs; });



var ChartistJs = (function () {
    function ChartistJs(_chartistJsService) {
        this._chartistJsService = _chartistJsService;
    }
    ChartistJs.prototype.ngOnInit = function () {
        this.data = this._chartistJsService.getAll();
    };
    ChartistJs.prototype.getResponsive = function (padding, offset) {
        return this._chartistJsService.getResponsive(padding, offset);
    };
    return ChartistJs;
}());
ChartistJs = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chartist-js',
        template: __webpack_require__(1070),
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__chartistJs_service__["a" /* ChartistJsService */]])
], ChartistJs);



/***/ }),

/***/ 865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__theme__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartistJsService; });


var ChartistJsService = (function () {
    function ChartistJsService(_baConfig) {
        this._baConfig = _baConfig;
        this._data = {
            simpleLineOptions: {
                color: this._baConfig.get().colors.defaultText,
                fullWidth: true,
                height: '300px',
                chartPadding: {
                    right: 40
                }
            },
            simpleLineData: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                series: [
                    [20, 20, 12, 45, 50],
                    [10, 45, 30, 14, 12],
                    [34, 12, 12, 40, 50],
                    [10, 43, 25, 22, 16],
                    [3, 6, 30, 33, 43]
                ]
            },
            areaLineData: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8],
                series: [
                    [5, 9, 7, 8, 5, 3, 5, 4]
                ]
            },
            areaLineOptions: {
                fullWidth: true,
                height: '300px',
                low: 0,
                showArea: true
            },
            biLineData: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                series: [
                    [1, 2, 3, 1, -2, 0, 1],
                    [-2, -1, -2, -1, -2.5, -1, -2],
                    [0, 0, 0, 1, 2, 2.5, 2],
                    [2.5, 2, 1, 0.5, 1, 0.5, -1]
                ]
            },
            biLineOptions: {
                height: '300px',
                high: 3,
                low: -3,
                showArea: true,
                showLine: false,
                showPoint: false,
                fullWidth: true,
                axisX: {
                    showGrid: false
                }
            },
            simpleBarData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                series: [
                    [15, 24, 43, 27, 5, 10, 23, 44, 68, 50, 26, 8],
                    [13, 22, 49, 22, 4, 6, 24, 46, 57, 48, 22, 4]
                ]
            },
            simpleBarOptions: {
                fullWidth: true,
                height: '300px'
            },
            multiBarData: {
                labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
                series: [
                    [5, 4, 3, 7],
                    [3, 2, 9, 5],
                    [1, 5, 8, 4],
                    [2, 3, 4, 6],
                    [4, 1, 2, 1]
                ]
            },
            multiBarOptions: {
                fullWidth: true,
                height: '300px',
                stackBars: true,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value.split(/\s+/).map(function (word) {
                            return word[0];
                        }).join('');
                    }
                },
                axisY: {
                    offset: 20
                }
            },
            multiBarResponsive: [
                ['screen and (min-width: 400px)', {
                        reverseData: true,
                        horizontalBars: true,
                        axisX: {
                            labelInterpolationFnc: function (n) { return n; }
                        },
                        axisY: {
                            offset: 60
                        }
                    }],
                ['screen and (min-width: 700px)', {
                        stackBars: false,
                        reverseData: false,
                        horizontalBars: false,
                        seriesBarDistance: 15
                    }]
            ],
            stackedBarData: {
                labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
                series: [
                    [800000, 1200000, 1400000, 1300000],
                    [200000, 400000, 500000, 300000],
                    [100000, 200000, 400000, 600000]
                ]
            },
            stackedBarOptions: {
                fullWidth: true,
                height: '300px',
                stackBars: true,
                axisY: {
                    labelInterpolationFnc: function (value) {
                        return (value / 1000) + 'k';
                    }
                }
            },
            simplePieData: {
                series: [5, 3, 4]
            },
            simplePieOptions: {
                fullWidth: true,
                height: '300px',
                weight: '300px',
                labelInterpolationFnc: function (value) {
                    return Math.round(value / 12 * 100) + '%';
                }
            },
            labelsPieData: {
                labels: ['Bananas', 'Apples', 'Grapes'],
                series: [20, 15, 40]
            },
            labelsPieOptions: {
                fullWidth: true,
                height: '300px',
                weight: '300px',
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            },
            simpleDonutData: {
                labels: ['Bananas', 'Apples', 'Grapes'],
                series: [20, 15, 40]
            },
            simpleDonutOptions: {
                fullWidth: true,
                donut: true,
                height: '300px',
                weight: '300px',
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        };
    }
    ChartistJsService.prototype.getAll = function () {
        return this._data;
    };
    ChartistJsService.prototype.getResponsive = function (padding, offset) {
        return [
            ['screen and (min-width: 1550px)', {
                    chartPadding: padding,
                    labelOffset: offset,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                }],
            ['screen and (max-width: 1200px)', {
                    chartPadding: padding,
                    labelOffset: offset,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                }],
            ['screen and (max-width: 600px)', {
                    chartPadding: 0,
                    labelOffset: 0,
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }]
        ];
    };
    return ChartistJsService;
}());
ChartistJsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__theme__["c" /* BaThemeConfigProvider */]])
], ChartistJsService);



/***/ }),

/***/ 930:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__charts_component__ = __webpack_require__(863);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_chartistJs_chartistJs_component__ = __webpack_require__(864);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });



// noinspection TypeScriptValidateTypes
var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__charts_component__["a" /* Charts */],
        children: [
            { path: 'chartist-js', component: __WEBPACK_IMPORTED_MODULE_2__components_chartistJs_chartistJs_component__["a" /* ChartistJs */] }
        ]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forChild(routes);


/***/ })

});
//# sourceMappingURL=12.chunk.js.map