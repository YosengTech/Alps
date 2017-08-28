webpackJsonpac__name_([6],{

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_nga_module__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_tree__ = __webpack_require__(904);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_tree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_tree__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_routing__ = __webpack_require__(820);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_component__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_treeView_treeView_component__ = __webpack_require__(757);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function() { return ComponentsModule; });








var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__theme_nga_module__["a" /* NgaModule */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_tree__["TreeModule"],
                __WEBPACK_IMPORTED_MODULE_5__components_routing__["a" /* routing */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__components_component__["a" /* Components */],
                __WEBPACK_IMPORTED_MODULE_7__components_treeView_treeView_component__["a" /* TreeView */],
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ComponentsModule);
    return ComponentsModule;
}());


/***/ }),

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(6))(446);

/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(2);
var Rx_1 = __webpack_require__(616);
var draggable_events_1 = __webpack_require__(906);
var NodeDraggableService = (function () {
    function NodeDraggableService() {
        this.draggableNodeEvents$ = new Rx_1.Subject();
    }
    NodeDraggableService.prototype.fireNodeDragged = function (captured, target) {
        if (!captured.tree || captured.tree.isStatic()) {
            return;
        }
        this.draggableNodeEvents$.next(new draggable_events_1.NodeDraggableEvent(captured, target));
    };
    NodeDraggableService.prototype.captureNode = function (node) {
        this.capturedNode = node;
    };
    NodeDraggableService.prototype.getCapturedNode = function () {
        return this.capturedNode;
    };
    NodeDraggableService.prototype.releaseCapturedNode = function () {
        this.capturedNode = null;
    };
    NodeDraggableService.decorators = [
        { type: core_1.Injectable },
    ];
    NodeDraggableService.ctorParameters = function () { return []; };
    return NodeDraggableService;
}());
exports.NodeDraggableService = NodeDraggableService;
//# sourceMappingURL=node-draggable.service.js.map

/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function (NodeMenuItemAction) {
    NodeMenuItemAction[NodeMenuItemAction["NewFolder"] = 0] = "NewFolder";
    NodeMenuItemAction[NodeMenuItemAction["NewTag"] = 1] = "NewTag";
    NodeMenuItemAction[NodeMenuItemAction["Rename"] = 2] = "Rename";
    NodeMenuItemAction[NodeMenuItemAction["Remove"] = 3] = "Remove";
})(exports.NodeMenuItemAction || (exports.NodeMenuItemAction = {}));
var NodeMenuItemAction = exports.NodeMenuItemAction;
(function (NodeMenuAction) {
    NodeMenuAction[NodeMenuAction["Close"] = 0] = "Close";
})(exports.NodeMenuAction || (exports.NodeMenuAction = {}));
var NodeMenuAction = exports.NodeMenuAction;
//# sourceMappingURL=menu.events.js.map

/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(2);
var Rx_1 = __webpack_require__(616);
var menu_events_1 = __webpack_require__(699);
var NodeMenuService = (function () {
    function NodeMenuService() {
        this.nodeMenuEvents$ = new Rx_1.Subject();
    }
    NodeMenuService.prototype.fireMenuEvent = function (sender, action) {
        var nodeMenuEvent = { sender: sender, action: action };
        this.nodeMenuEvents$.next(nodeMenuEvent);
    };
    NodeMenuService.prototype.hideMenuStream = function (treeElementRef) {
        return this.nodeMenuEvents$
            .filter(function (e) { return treeElementRef.nativeElement !== e.sender; })
            .filter(function (e) { return e.action === menu_events_1.NodeMenuAction.Close; });
    };
    NodeMenuService.prototype.hideMenuForAllNodesExcept = function (treeElementRef) {
        this.nodeMenuEvents$.next({
            sender: treeElementRef.nativeElement,
            action: menu_events_1.NodeMenuAction.Close
        });
    };
    NodeMenuService.decorators = [
        { type: core_1.Injectable },
    ];
    NodeMenuService.ctorParameters = function () { return []; };
    return NodeMenuService;
}());
exports.NodeMenuService = NodeMenuService;
//# sourceMappingURL=node-menu.service.js.map

/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(31);
var tree_types_1 = __webpack_require__(795);
var Tree = (function () {
    function Tree(node, parent, isBranch) {
        if (parent === void 0) { parent = null; }
        if (isBranch === void 0) { isBranch = false; }
        this.node = node;
        this.parent = parent;
        this._children = isBranch ? [] : null;
    }
    Object.defineProperty(Tree.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.createNode = function (isBranch) {
        var tree = new Tree({ value: '' }, null, isBranch);
        tree.markAsNew();
        if (this.isLeaf()) {
            return this.addSibling(tree);
        }
        else {
            return this.addChild(tree);
        }
    };
    ;
    Object.defineProperty(Tree.prototype, "value", {
        get: function () {
            return this.node.value;
        },
        set: function (value) {
            if (typeof value !== 'string' && !Tree.isRenamable(value)) {
                return;
            }
            if (Tree.isRenamable(this.value)) {
                var newValue = typeof value === 'string' ? value : _.toString(value);
                this.node.value = Tree.applyNewValueToRenamable(this.value, newValue);
            }
            else {
                this.node.value = Tree.isValueEmpty(value) ? this.node.value : _.toString(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.addSibling = function (sibling, position) {
        if (_.isArray(_.get(this.parent, 'children'))) {
            return this.parent.addChild(sibling, position);
        }
        return null;
    };
    Tree.prototype.addChild = function (child, position) {
        return this._addChild(Tree.cloneTreeShallow(child), position);
    };
    Tree.prototype._addChild = function (child, position) {
        if (position === void 0) { position = _.size(this._children) || 0; }
        child.parent = this;
        if (Array.isArray(this._children)) {
            this._children.splice(position, 0, child);
        }
        else {
            this._children = [child];
        }
        return child;
    };
    Tree.prototype.swapWithSibling = function (sibling) {
        if (!this.hasSibling(sibling)) {
            return;
        }
        var siblingIndex = sibling.positionInParent;
        var thisTreeIndex = this.positionInParent;
        this.parent._children[siblingIndex] = this;
        this.parent._children[thisTreeIndex] = sibling;
    };
    Object.defineProperty(Tree.prototype, "positionInParent", {
        get: function () {
            return _.indexOf(this.parent.children, this);
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.isStatic = function () {
        return _.get(this.node.settings, 'static', false);
    };
    Tree.prototype.isLeaf = function () {
        return !this.isBranch();
    };
    Tree.prototype.isBranch = function () {
        return Array.isArray(this._children);
    };
    Tree.prototype.isRoot = function () {
        return this.parent === null;
    };
    Tree.prototype.hasSibling = function (tree) {
        return !this.isRoot() && _.includes(this.parent.children, tree);
    };
    Tree.prototype.hasChild = function (tree) {
        return _.includes(this._children, tree);
    };
    Tree.prototype.removeChild = function (tree) {
        var childIndex = _.findIndex(this._children, function (child) { return child === tree; });
        if (childIndex >= 0) {
            this._children.splice(childIndex, 1);
        }
    };
    Tree.prototype.removeItselfFromParent = function () {
        if (!this.parent) {
            return;
        }
        this.parent.removeChild(this);
    };
    Tree.prototype.switchFoldingType = function () {
        if (this.isLeaf()) {
            return;
        }
        this.node._foldingType = this.isNodeExpanded() ? tree_types_1.FoldingType.Collapsed : tree_types_1.FoldingType.Expanded;
    };
    Tree.prototype.isNodeExpanded = function () {
        return this.foldingType === tree_types_1.FoldingType.Expanded;
    };
    Object.defineProperty(Tree.prototype, "foldingType", {
        get: function () {
            if (!this.node._foldingType) {
                if (this._children) {
                    this.node._foldingType = tree_types_1.FoldingType.Expanded;
                }
                else {
                    this.node._foldingType = tree_types_1.FoldingType.Leaf;
                }
            }
            return this.node._foldingType;
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.isNew = function () {
        return this.node._status === tree_types_1.TreeStatus.New;
    };
    Tree.prototype.markAsNew = function () {
        this.node._status = tree_types_1.TreeStatus.New;
    };
    Tree.prototype.isBeingRenamed = function () {
        return this.node._status === tree_types_1.TreeStatus.IsBeingRenamed;
    };
    Tree.prototype.markAsBeingRenamed = function () {
        this.node._status = tree_types_1.TreeStatus.IsBeingRenamed;
    };
    Tree.prototype.isModified = function () {
        return this.node._status === tree_types_1.TreeStatus.Modified;
    };
    Tree.prototype.markAsModified = function () {
        this.node._status = tree_types_1.TreeStatus.Modified;
    };
    Tree.buildTreeFromModel = function (model, parent) {
        if (parent === void 0) { parent = null; }
        model.settings = tree_types_1.TreeModelSettings.merge(model, _.get(parent, 'node'));
        var tree = new Tree(_.omit(model, 'children'), parent);
        _.forEach(model.children, function (child, index) {
            tree._addChild(Tree.buildTreeFromModel(child, tree), index);
        });
        return tree;
    };
    Tree.isValueEmpty = function (value) {
        return _.isEmpty(_.trim(value));
    };
    Tree.isRenamable = function (value) {
        return (_.has(value, 'setName') && _.isFunction(value.setName))
            && (_.has(value, 'toString') && _.isFunction(value.toString) && value.toString !== Object.toString);
    };
    Tree.cloneTreeShallow = function (origin) {
        var tree = new Tree(_.clone(origin.node));
        tree._children = origin._children;
        return tree;
    };
    ;
    Tree.applyNewValueToRenamable = function (value, newValue) {
        var renamableValue = _.merge({}, value);
        renamableValue.setName(newValue);
        return renamableValue;
    };
    return Tree;
}());
exports.Tree = Tree;
//# sourceMappingURL=tree.js.map

/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tree_events_1 = __webpack_require__(794);
var Rx_1 = __webpack_require__(616);
var core_1 = __webpack_require__(2);
var node_draggable_service_1 = __webpack_require__(698);
var TreeService = (function () {
    function TreeService(nodeDraggableService) {
        this.nodeDraggableService = nodeDraggableService;
        this.nodeMoved$ = new Rx_1.Subject();
        this.nodeRemoved$ = new Rx_1.Subject();
        this.nodeRenamed$ = new Rx_1.Subject();
        this.nodeCreated$ = new Rx_1.Subject();
        this.nodeSelected$ = new Rx_1.Subject();
        this.nodeRemoved$.subscribe(function (e) { return e.node.removeItselfFromParent(); });
    }
    TreeService.prototype.unselectStream = function (tree) {
        return this.nodeSelected$.filter(function (e) { return tree !== e.node; });
    };
    TreeService.prototype.fireNodeRemoved = function (tree) {
        this.nodeRemoved$.next(new tree_events_1.NodeRemovedEvent(tree));
    };
    TreeService.prototype.fireNodeCreated = function (tree) {
        this.nodeCreated$.next(new tree_events_1.NodeCreatedEvent(tree));
    };
    TreeService.prototype.fireNodeSelected = function (tree) {
        this.nodeSelected$.next(new tree_events_1.NodeSelectedEvent(tree));
    };
    TreeService.prototype.fireNodeRenamed = function (oldValue, tree) {
        this.nodeRenamed$.next(new tree_events_1.NodeRenamedEvent(tree, oldValue, tree.value));
    };
    TreeService.prototype.fireNodeMoved = function (tree, parent) {
        this.nodeMoved$.next(new tree_events_1.NodeMovedEvent(tree, parent));
    };
    TreeService.prototype.draggedStream = function (tree, element) {
        return this.nodeDraggableService.draggableNodeEvents$
            .filter(function (e) { return e.target === element; })
            .filter(function (e) { return !e.captured.tree.hasChild(tree); });
    };
    TreeService.decorators = [
        { type: core_1.Injectable },
    ];
    TreeService.ctorParameters = function () { return [
        { type: node_draggable_service_1.NodeDraggableService, decorators: [{ type: core_1.Inject, args: [node_draggable_service_1.NodeDraggableService,] },] },
    ]; };
    return TreeService;
}());
exports.TreeService = TreeService;
//# sourceMappingURL=tree.service.js.map

/***/ }),

/***/ 756:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Components; });

var Components = (function () {
    function Components() {
    }
    Components = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'components',
            template: "<router-outlet></router-outlet>"
        }), 
        __metadata('design:paramtypes', [])
    ], Components);
    return Components;
}());


/***/ }),

/***/ 757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeView; });

var TreeView = (function () {
    function TreeView() {
        this.tree = {
            value: 'Programming languages by programming paradigm',
            children: [
                {
                    value: 'Object-oriented programming',
                    children: [
                        { value: 'Java' },
                        { value: 'C++' },
                        { value: 'C#' },
                    ]
                },
                {
                    value: 'Prototype-based programming',
                    children: [
                        { value: 'JavaScript' },
                        { value: 'CoffeeScript' },
                        { value: 'Lua' },
                    ]
                }
            ]
        };
    }
    TreeView = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tree-view',
            template: __webpack_require__(938),
        }), 
        __metadata('design:paramtypes', [])
    ], TreeView);
    return TreeView;
}());


/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function (NodeEditableEventAction) {
    NodeEditableEventAction[NodeEditableEventAction["Cancel"] = 0] = "Cancel";
})(exports.NodeEditableEventAction || (exports.NodeEditableEventAction = {}));
var NodeEditableEventAction = exports.NodeEditableEventAction;
//# sourceMappingURL=editable.events.js.map

/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(2);
var tree_service_1 = __webpack_require__(702);
var tree_1 = __webpack_require__(701);
var TreeComponent = (function () {
    function TreeComponent(treeService) {
        this.treeService = treeService;
        this.nodeCreated = new core_1.EventEmitter();
        this.nodeRemoved = new core_1.EventEmitter();
        this.nodeRenamed = new core_1.EventEmitter();
        this.nodeSelected = new core_1.EventEmitter();
        this.nodeMoved = new core_1.EventEmitter();
    }
    TreeComponent.prototype.ngOnChanges = function (changes) {
        if (!this.treeModel) {
            this.tree = TreeComponent.EMPTY_TREE;
        }
        else {
            this.tree = tree_1.Tree.buildTreeFromModel(this.treeModel);
        }
    };
    TreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.treeService.nodeRemoved$.subscribe(function (e) {
            _this.nodeRemoved.emit(e);
        });
        this.treeService.nodeRenamed$.subscribe(function (e) {
            _this.nodeRenamed.emit(e);
        });
        this.treeService.nodeCreated$.subscribe(function (e) {
            _this.nodeCreated.emit(e);
        });
        this.treeService.nodeSelected$.subscribe(function (e) {
            _this.nodeSelected.emit(e);
        });
        this.treeService.nodeMoved$.subscribe(function (e) {
            _this.nodeMoved.emit(e);
        });
    };
    TreeComponent.EMPTY_TREE = new tree_1.Tree({ value: '' });
    TreeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tree',
                    template: "<tree-internal [tree]=\"tree\" [settings]=\"settings\"></tree-internal>",
                    providers: [tree_service_1.TreeService]
                },] },
    ];
    TreeComponent.ctorParameters = function () { return [
        { type: tree_service_1.TreeService, decorators: [{ type: core_1.Inject, args: [tree_service_1.TreeService,] },] },
    ]; };
    TreeComponent.propDecorators = {
        'treeModel': [{ type: core_1.Input, args: ['tree',] },],
        'settings': [{ type: core_1.Input },],
        'nodeCreated': [{ type: core_1.Output },],
        'nodeRemoved': [{ type: core_1.Output },],
        'nodeRenamed': [{ type: core_1.Output },],
        'nodeSelected': [{ type: core_1.Output },],
        'nodeMoved': [{ type: core_1.Output },],
    };
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=tree.component.js.map

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeEvent = (function () {
    function NodeEvent(node) {
        this.node = node;
    }
    return NodeEvent;
}());
exports.NodeEvent = NodeEvent;
var NodeSelectedEvent = (function (_super) {
    __extends(NodeSelectedEvent, _super);
    function NodeSelectedEvent(node) {
        _super.call(this, node);
    }
    return NodeSelectedEvent;
}(NodeEvent));
exports.NodeSelectedEvent = NodeSelectedEvent;
var NodeDestructiveEvent = (function (_super) {
    __extends(NodeDestructiveEvent, _super);
    function NodeDestructiveEvent(node) {
        _super.call(this, node);
    }
    return NodeDestructiveEvent;
}(NodeEvent));
exports.NodeDestructiveEvent = NodeDestructiveEvent;
var NodeMovedEvent = (function (_super) {
    __extends(NodeMovedEvent, _super);
    function NodeMovedEvent(node, previousParent) {
        _super.call(this, node);
        this.previousParent = previousParent;
    }
    return NodeMovedEvent;
}(NodeDestructiveEvent));
exports.NodeMovedEvent = NodeMovedEvent;
var NodeRemovedEvent = (function (_super) {
    __extends(NodeRemovedEvent, _super);
    function NodeRemovedEvent(node) {
        _super.call(this, node);
    }
    return NodeRemovedEvent;
}(NodeDestructiveEvent));
exports.NodeRemovedEvent = NodeRemovedEvent;
var NodeCreatedEvent = (function (_super) {
    __extends(NodeCreatedEvent, _super);
    function NodeCreatedEvent(node) {
        _super.call(this, node);
    }
    return NodeCreatedEvent;
}(NodeDestructiveEvent));
exports.NodeCreatedEvent = NodeCreatedEvent;
var NodeRenamedEvent = (function (_super) {
    __extends(NodeRenamedEvent, _super);
    function NodeRenamedEvent(node, oldValue, newValue) {
        _super.call(this, node);
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
    return NodeRenamedEvent;
}(NodeDestructiveEvent));
exports.NodeRenamedEvent = NodeRenamedEvent;
//# sourceMappingURL=tree.events.js.map

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(31);
var FoldingType = (function () {
    function FoldingType(_cssClass) {
        this._cssClass = _cssClass;
    }
    Object.defineProperty(FoldingType.prototype, "cssClass", {
        get: function () {
            return this._cssClass;
        },
        enumerable: true,
        configurable: true
    });
    FoldingType.Expanded = new FoldingType('node-expanded');
    FoldingType.Collapsed = new FoldingType('node-collapsed');
    FoldingType.Leaf = new FoldingType('node-leaf');
    return FoldingType;
}());
exports.FoldingType = FoldingType;
var TreeModelSettings = (function () {
    function TreeModelSettings() {
    }
    TreeModelSettings.merge = function (sourceA, sourceB) {
        return _.defaults({}, _.get(sourceA, 'settings'), _.get(sourceB, 'settings'), { static: false });
    };
    return TreeModelSettings;
}());
exports.TreeModelSettings = TreeModelSettings;
(function (TreeStatus) {
    TreeStatus[TreeStatus["New"] = 0] = "New";
    TreeStatus[TreeStatus["Modified"] = 1] = "Modified";
    TreeStatus[TreeStatus["IsBeingRenamed"] = 2] = "IsBeingRenamed";
})(exports.TreeStatus || (exports.TreeStatus = {}));
var TreeStatus = exports.TreeStatus;
//# sourceMappingURL=tree.types.js.map

/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isLeftButtonClicked(e) {
    return e.button === MouseButtons.Left;
}
exports.isLeftButtonClicked = isLeftButtonClicked;
function isRightButtonClicked(e) {
    return e.button === MouseButtons.Right;
}
exports.isRightButtonClicked = isRightButtonClicked;
function isEscapePressed(e) {
    return e.keyCode === Keys.Escape;
}
exports.isEscapePressed = isEscapePressed;
(function (Keys) {
    Keys[Keys["Escape"] = 27] = "Escape";
})(exports.Keys || (exports.Keys = {}));
var Keys = exports.Keys;
(function (MouseButtons) {
    MouseButtons[MouseButtons["Left"] = 0] = "Left";
    MouseButtons[MouseButtons["Right"] = 2] = "Right";
})(exports.MouseButtons || (exports.MouseButtons = {}));
var MouseButtons = exports.MouseButtons;
//# sourceMappingURL=event.utils.js.map

/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_component__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_treeView_treeView_component__ = __webpack_require__(757);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });



// noinspection TypeScriptValidateTypes
var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__components_component__["a" /* Components */],
        children: [
            { path: 'treeview', component: __WEBPACK_IMPORTED_MODULE_2__components_treeView_treeView_component__["a" /* TreeView */] }
        ]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forChild(routes);


/***/ }),

/***/ 904:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tree_types_1 = __webpack_require__(795);
exports.TreeModelSettings = tree_types_1.TreeModelSettings;
exports.FoldingType = tree_types_1.FoldingType;
var tree_1 = __webpack_require__(701);
exports.Tree = tree_1.Tree;
var tree_events_1 = __webpack_require__(794);
exports.NodeEvent = tree_events_1.NodeEvent;
exports.NodeCreatedEvent = tree_events_1.NodeCreatedEvent;
exports.NodeRemovedEvent = tree_events_1.NodeRemovedEvent;
exports.NodeRenamedEvent = tree_events_1.NodeRenamedEvent;
exports.NodeMovedEvent = tree_events_1.NodeMovedEvent;
exports.NodeSelectedEvent = tree_events_1.NodeSelectedEvent;
exports.NodeDestructiveEvent = tree_events_1.NodeDestructiveEvent;
var tree_component_1 = __webpack_require__(793);
exports.TreeComponent = tree_component_1.TreeComponent;
var tree_module_1 = __webpack_require__(911);
exports.TreeModule = tree_module_1.TreeModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 905:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var CapturedNode = (function () {
    function CapturedNode(anElement, aTree) {
        this.anElement = anElement;
        this.aTree = aTree;
    }
    CapturedNode.prototype.canBeDroppedAt = function (element) {
        return !this.sameAs(element) && !this.contains(element);
    };
    CapturedNode.prototype.contains = function (other) {
        return this.element.nativeElement.contains(other.nativeElement);
    };
    CapturedNode.prototype.sameAs = function (other) {
        return this.element === other;
    };
    Object.defineProperty(CapturedNode.prototype, "element", {
        get: function () {
            return this.anElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CapturedNode.prototype, "tree", {
        get: function () {
            return this.aTree;
        },
        enumerable: true,
        configurable: true
    });
    return CapturedNode;
}());
exports.CapturedNode = CapturedNode;
//# sourceMappingURL=captured-node.js.map

/***/ }),

/***/ 906:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NodeDraggableEvent = (function () {
    function NodeDraggableEvent(captured, target) {
        this.captured = captured;
        this.target = target;
    }
    return NodeDraggableEvent;
}());
exports.NodeDraggableEvent = NodeDraggableEvent;
//# sourceMappingURL=draggable.events.js.map

/***/ }),

/***/ 907:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(2);
var node_draggable_service_1 = __webpack_require__(698);
var captured_node_1 = __webpack_require__(905);
var NodeDraggableDirective = (function () {
    function NodeDraggableDirective(element, nodeDraggableService, renderer) {
        this.element = element;
        this.nodeDraggableService = nodeDraggableService;
        this.renderer = renderer;
        this.disposersForDragListeners = [];
        this.nodeNativeElement = element.nativeElement;
    }
    NodeDraggableDirective.prototype.ngOnInit = function () {
        if (!this.tree.isStatic()) {
            this.renderer.setElementAttribute(this.nodeNativeElement, 'draggable', 'true');
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this)));
        }
    };
    NodeDraggableDirective.prototype.ngOnDestroy = function () {
        this.disposersForDragListeners.forEach(function (dispose) { return dispose(); });
    };
    NodeDraggableDirective.prototype.handleDragStart = function (e) {
        e.stopPropagation();
        this.nodeDraggableService.captureNode(new captured_node_1.CapturedNode(this.nodeDraggable, this.tree));
        e.dataTransfer.setData('text', NodeDraggableDirective.DATA_TRANSFER_STUB_DATA);
        e.dataTransfer.effectAllowed = 'move';
    };
    NodeDraggableDirective.prototype.handleDragOver = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    NodeDraggableDirective.prototype.handleDragEnter = function (e) {
        e.preventDefault();
        if (this.containsElementAt(e)) {
            this.addClass('over-drop-target');
        }
    };
    NodeDraggableDirective.prototype.handleDragLeave = function (e) {
        if (!this.containsElementAt(e)) {
            this.removeClass('over-drop-target');
        }
    };
    NodeDraggableDirective.prototype.handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.removeClass('over-drop-target');
        if (!this.isDropPossible(e)) {
            return false;
        }
        if (this.nodeDraggableService.getCapturedNode()) {
            return this.notifyThatNodeWasDropped();
        }
    };
    NodeDraggableDirective.prototype.isDropPossible = function (e) {
        var capturedNode = this.nodeDraggableService.getCapturedNode();
        return capturedNode
            && capturedNode.canBeDroppedAt(this.nodeDraggable)
            && this.containsElementAt(e);
    };
    NodeDraggableDirective.prototype.handleDragEnd = function (e) {
        this.removeClass('over-drop-target');
        this.nodeDraggableService.releaseCapturedNode();
    };
    NodeDraggableDirective.prototype.containsElementAt = function (e) {
        var _a = e.x, x = _a === void 0 ? e.clientX : _a, _b = e.y, y = _b === void 0 ? e.clientY : _b;
        return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
    };
    NodeDraggableDirective.prototype.addClass = function (className) {
        var classList = this.nodeNativeElement.classList;
        classList.add(className);
    };
    NodeDraggableDirective.prototype.removeClass = function (className) {
        var classList = this.nodeNativeElement.classList;
        classList.remove(className);
    };
    NodeDraggableDirective.prototype.notifyThatNodeWasDropped = function () {
        this.nodeDraggableService.fireNodeDragged(this.nodeDraggableService.getCapturedNode(), this.nodeDraggable);
    };
    NodeDraggableDirective.DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data';
    NodeDraggableDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[nodeDraggable]'
                },] },
    ];
    NodeDraggableDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: node_draggable_service_1.NodeDraggableService, decorators: [{ type: core_1.Inject, args: [node_draggable_service_1.NodeDraggableService,] },] },
        { type: core_1.Renderer, decorators: [{ type: core_1.Inject, args: [core_1.Renderer,] },] },
    ]; };
    NodeDraggableDirective.propDecorators = {
        'nodeDraggable': [{ type: core_1.Input },],
        'tree': [{ type: core_1.Input },],
    };
    return NodeDraggableDirective;
}());
exports.NodeDraggableDirective = NodeDraggableDirective;
//# sourceMappingURL=node-draggable.directive.js.map

/***/ }),

/***/ 908:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(2);
var editable_events_1 = __webpack_require__(792);
var NodeEditableDirective = (function () {
    function NodeEditableDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.valueChanged = new core_1.EventEmitter(false);
    }
    NodeEditableDirective.prototype.ngOnInit = function () {
        var nativeElement = this.elementRef.nativeElement;
        this.renderer.invokeElementMethod(nativeElement, 'focus', []);
        this.renderer.setElementProperty(nativeElement, 'value', this.nodeValue);
    };
    NodeEditableDirective.prototype.applyNewValue = function (newNodeValue) {
        this.valueChanged.emit({ type: 'keyup', value: newNodeValue });
    };
    NodeEditableDirective.prototype.applyNewValueByLoosingFocus = function (newNodeValue) {
        this.valueChanged.emit({ type: 'blur', value: newNodeValue });
    };
    NodeEditableDirective.prototype.cancelEditing = function () {
        this.valueChanged.emit({
            type: 'keyup',
            value: this.nodeValue,
            action: editable_events_1.NodeEditableEventAction.Cancel
        });
    };
    NodeEditableDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[nodeEditable]'
                },] },
    ];
    NodeEditableDirective.ctorParameters = function () { return [
        { type: core_1.Renderer, decorators: [{ type: core_1.Inject, args: [core_1.Renderer,] },] },
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
    ]; };
    NodeEditableDirective.propDecorators = {
        'nodeValue': [{ type: core_1.Input, args: ['nodeEditable',] },],
        'valueChanged': [{ type: core_1.Output },],
        'applyNewValue': [{ type: core_1.HostListener, args: ['keyup.enter', ['$event.target.value'],] },],
        'applyNewValueByLoosingFocus': [{ type: core_1.HostListener, args: ['blur', ['$event.target.value'],] },],
        'cancelEditing': [{ type: core_1.HostListener, args: ['keyup.esc',] },],
    };
    return NodeEditableDirective;
}());
exports.NodeEditableDirective = NodeEditableDirective;
//# sourceMappingURL=node-editable.directive.js.map

/***/ }),

/***/ 909:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(2);
var node_menu_service_1 = __webpack_require__(700);
var menu_events_1 = __webpack_require__(699);
var event_utils_1 = __webpack_require__(796);
var NodeMenuComponent = (function () {
    function NodeMenuComponent(renderer, nodeMenuService) {
        this.renderer = renderer;
        this.nodeMenuService = nodeMenuService;
        this.menuItemSelected = new core_1.EventEmitter();
        this.availableMenuItems = [
            {
                name: 'New tag',
                action: menu_events_1.NodeMenuItemAction.NewTag,
                cssClass: 'new-tag'
            },
            {
                name: 'New folder',
                action: menu_events_1.NodeMenuItemAction.NewFolder,
                cssClass: 'new-folder'
            },
            {
                name: 'Rename',
                action: menu_events_1.NodeMenuItemAction.Rename,
                cssClass: 'rename'
            },
            {
                name: 'Remove',
                action: menu_events_1.NodeMenuItemAction.Remove,
                cssClass: 'remove'
            }
        ];
        this.disposersForGlobalListeners = [];
    }
    NodeMenuComponent.prototype.ngOnInit = function () {
        this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'keyup', this.closeMenu.bind(this)));
        this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'click', this.closeMenu.bind(this)));
    };
    NodeMenuComponent.prototype.ngOnDestroy = function () {
        this.disposersForGlobalListeners.forEach(function (dispose) { return dispose(); });
    };
    NodeMenuComponent.prototype.onMenuItemSelected = function (e, selectedMenuItem) {
        if (event_utils_1.isLeftButtonClicked(e)) {
            this.menuItemSelected.emit({ nodeMenuItemAction: selectedMenuItem.action });
        }
    };
    NodeMenuComponent.prototype.closeMenu = function (e) {
        var mouseClicked = e instanceof MouseEvent;
        if (mouseClicked || event_utils_1.isEscapePressed(e)) {
            this.nodeMenuService.fireMenuEvent(e.target, menu_events_1.NodeMenuAction.Close);
        }
    };
    NodeMenuComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'node-menu',
                    template: "\n    <div class=\"node-menu\">\n      <ul class=\"node-menu-content\">\n        <li class=\"node-menu-item\" *ngFor=\"let menuItem of availableMenuItems\"\n            (click)=\"onMenuItemSelected($event, menuItem)\">\n          <div class=\"node-menu-item-icon {{menuItem.cssClass}}\"></div>\n          <span class=\"node-menu-item-value\">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  "
                },] },
    ];
    NodeMenuComponent.ctorParameters = function () { return [
        { type: core_1.Renderer, decorators: [{ type: core_1.Inject, args: [core_1.Renderer,] },] },
        { type: node_menu_service_1.NodeMenuService, decorators: [{ type: core_1.Inject, args: [node_menu_service_1.NodeMenuService,] },] },
    ]; };
    NodeMenuComponent.propDecorators = {
        'menuItemSelected': [{ type: core_1.Output },],
    };
    return NodeMenuComponent;
}());
exports.NodeMenuComponent = NodeMenuComponent;
//# sourceMappingURL=node-menu.component.js.map

/***/ }),

/***/ 910:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(2);
var tree_1 = __webpack_require__(701);
var node_menu_service_1 = __webpack_require__(700);
var menu_events_1 = __webpack_require__(699);
var editable_events_1 = __webpack_require__(792);
var tree_service_1 = __webpack_require__(702);
var EventUtils = __webpack_require__(796);
var TreeInternalComponent = (function () {
    function TreeInternalComponent(nodeMenuService, treeService, element) {
        this.nodeMenuService = nodeMenuService;
        this.treeService = treeService;
        this.element = element;
        this.isSelected = false;
        this.isMenuVisible = false;
    }
    TreeInternalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settings = this.settings || { rootIsVisible: true };
        this.nodeMenuService.hideMenuStream(this.element)
            .subscribe(function () { return _this.isMenuVisible = false; });
        this.treeService.unselectStream(this.tree)
            .subscribe(function () { return _this.isSelected = false; });
        this.treeService.draggedStream(this.tree, this.element)
            .subscribe(function (e) {
            if (_this.tree.hasSibling(e.captured.tree)) {
                _this.swapWithSibling(e.captured.tree, _this.tree);
            }
            else if (_this.tree.isBranch()) {
                _this.moveNodeToThisTreeAndRemoveFromPreviousOne(e, _this.tree);
            }
            else {
                _this.moveNodeToParentTreeAndRemoveFromPreviousOne(e, _this.tree);
            }
        });
    };
    TreeInternalComponent.prototype.swapWithSibling = function (sibling, tree) {
        tree.swapWithSibling(sibling);
        this.treeService.fireNodeMoved(sibling, sibling.parent);
    };
    TreeInternalComponent.prototype.moveNodeToThisTreeAndRemoveFromPreviousOne = function (e, tree) {
        this.treeService.fireNodeRemoved(e.captured.tree);
        var addedChild = tree.addChild(e.captured.tree);
        this.treeService.fireNodeMoved(addedChild, e.captured.tree.parent);
    };
    TreeInternalComponent.prototype.moveNodeToParentTreeAndRemoveFromPreviousOne = function (e, tree) {
        this.treeService.fireNodeRemoved(e.captured.tree);
        var addedSibling = tree.addSibling(e.captured.tree, tree.positionInParent);
        this.treeService.fireNodeMoved(addedSibling, e.captured.tree.parent);
    };
    TreeInternalComponent.prototype.onNodeSelected = function (e) {
        if (EventUtils.isLeftButtonClicked(e)) {
            this.isSelected = true;
            this.treeService.fireNodeSelected(this.tree);
        }
    };
    TreeInternalComponent.prototype.showMenu = function (e) {
        if (this.tree.isStatic()) {
            return;
        }
        if (EventUtils.isRightButtonClicked(e)) {
            this.isMenuVisible = !this.isMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.element);
        }
        e.preventDefault();
    };
    TreeInternalComponent.prototype.onMenuItemSelected = function (e) {
        switch (e.nodeMenuItemAction) {
            case menu_events_1.NodeMenuItemAction.NewTag:
                this.onNewSelected(e);
                break;
            case menu_events_1.NodeMenuItemAction.NewFolder:
                this.onNewSelected(e);
                break;
            case menu_events_1.NodeMenuItemAction.Rename:
                this.onRenameSelected();
                break;
            case menu_events_1.NodeMenuItemAction.Remove:
                this.onRemoveSelected();
                break;
            default:
                throw new Error("Chosen menu item doesn't exist");
        }
    };
    TreeInternalComponent.prototype.onNewSelected = function (e) {
        this.tree.createNode(e.nodeMenuItemAction === menu_events_1.NodeMenuItemAction.NewFolder);
        this.isMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRenameSelected = function () {
        this.tree.markAsBeingRenamed();
        this.isMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRemoveSelected = function () {
        this.treeService.fireNodeRemoved(this.tree);
    };
    TreeInternalComponent.prototype.applyNewValue = function (e) {
        if ((e.action === editable_events_1.NodeEditableEventAction.Cancel || this.tree.isNew()) && tree_1.Tree.isValueEmpty(e.value)) {
            return this.treeService.fireNodeRemoved(this.tree);
        }
        if (this.tree.isNew()) {
            this.tree.value = e.value;
            this.treeService.fireNodeCreated(this.tree);
        }
        if (this.tree.isBeingRenamed()) {
            var oldValue = this.tree.value;
            this.tree.value = e.value;
            this.treeService.fireNodeRenamed(oldValue, this.tree);
        }
        this.tree.markAsModified();
    };
    TreeInternalComponent.prototype.shouldShowInputForTreeValue = function () {
        return this.tree.isNew() || this.tree.isBeingRenamed();
    };
    TreeInternalComponent.prototype.isRootHidden = function () {
        return this.tree.isRoot() && !this.settings.rootIsVisible;
    };
    TreeInternalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tree-internal',
                    template: "\n  <ul class=\"tree\" *ngIf=\"tree\" [ngClass]=\"{rootless: isRootHidden()}\">\n    <li>\n      <div class=\"value-container\"\n        [ngClass]=\"{rootless: isRootHidden()}\" \n        (contextmenu)=\"showMenu($event)\" \n        [nodeDraggable]=\"element\"\n        [tree]=\"tree\">\n\n        <div class=\"folding\" (click)=\"tree.switchFoldingType()\" [ngClass]=\"tree.foldingType.cssClass\"></div>\n        <div class=\"node-value\" \n          *ngIf=\"!shouldShowInputForTreeValue()\" \n          [class.node-selected]=\"isSelected\" \n          (click)=\"onNodeSelected($event)\">{{tree.value}}</div>\n\n        <input type=\"text\" class=\"node-value\" \n           *ngIf=\"shouldShowInputForTreeValue()\"\n           [nodeEditable]=\"tree.value\"\n           (valueChanged)=\"applyNewValue($event)\"/>\n      </div>\n\n      <node-menu *ngIf=\"isMenuVisible\" (menuItemSelected)=\"onMenuItemSelected($event)\"></node-menu>\n\n      <template [ngIf]=\"tree.isNodeExpanded()\">\n        <tree-internal *ngFor=\"let child of tree.children\" [tree]=\"child\"></tree-internal>\n      </template>\n    </li>\n  </ul>\n  "
                },] },
    ];
    TreeInternalComponent.ctorParameters = function () { return [
        { type: node_menu_service_1.NodeMenuService, decorators: [{ type: core_1.Inject, args: [node_menu_service_1.NodeMenuService,] },] },
        { type: tree_service_1.TreeService, decorators: [{ type: core_1.Inject, args: [tree_service_1.TreeService,] },] },
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
    ]; };
    TreeInternalComponent.propDecorators = {
        'tree': [{ type: core_1.Input },],
        'settings': [{ type: core_1.Input },],
    };
    return TreeInternalComponent;
}());
exports.TreeInternalComponent = TreeInternalComponent;
//# sourceMappingURL=tree-internal.component.js.map

/***/ }),

/***/ 911:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(2);
var tree_component_1 = __webpack_require__(793);
var tree_internal_component_1 = __webpack_require__(910);
var common_1 = __webpack_require__(5);
var node_draggable_directive_1 = __webpack_require__(907);
var node_draggable_service_1 = __webpack_require__(698);
var node_editable_directive_1 = __webpack_require__(908);
var node_menu_component_1 = __webpack_require__(909);
var node_menu_service_1 = __webpack_require__(700);
var tree_service_1 = __webpack_require__(702);
var TreeModule = (function () {
    function TreeModule() {
    }
    TreeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [node_draggable_directive_1.NodeDraggableDirective, tree_component_1.TreeComponent, node_editable_directive_1.NodeEditableDirective, node_menu_component_1.NodeMenuComponent, tree_internal_component_1.TreeInternalComponent],
                    exports: [tree_component_1.TreeComponent],
                    providers: [node_draggable_service_1.NodeDraggableService, node_menu_service_1.NodeMenuService, tree_service_1.TreeService]
                },] },
    ];
    TreeModule.ctorParameters = function () { return []; };
    return TreeModule;
}());
exports.TreeModule = TreeModule;
//# sourceMappingURL=tree.module.js.map

/***/ }),

/***/ 938:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6\">\n  <ba-card title=\"basic\">\n    <tree id=\"tree-view\" [tree]=\"tree\"></tree>\n  </ba-card>\n</div>\n"

/***/ })

});
//# sourceMappingURL=6.chunk.js.map