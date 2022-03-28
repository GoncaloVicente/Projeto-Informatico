"use strict";
/*! *****************************************************************************
Copyright (c) 2019 Tangra Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
***************************************************************************** */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var observable_array_1 = require("data/observable-array");
var builder_1 = require("ui/builder");
var content_view_1 = require("ui/content-view");
var view_1 = require("ui/core/view");
var weak_event_listener_1 = require("ui/core/weak-event-listener");
var label_1 = require("ui/label");
var autoEffectiveRowHeight = 100;
var autoEffectiveColWidth = 100;
__export(require("ui/core/view"));
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var knownMultiTemplates;
(function (knownMultiTemplates) {
    knownMultiTemplates.itemTemplates = "itemTemplates";
})(knownMultiTemplates = exports.knownMultiTemplates || (exports.knownMultiTemplates = {}));
var GridViewBase = (function (_super) {
    __extends(GridViewBase, _super);
    function GridViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._defaultTemplate = {
            key: "default",
            createView: function () {
                if (_this.itemTemplate) {
                    return builder_1.parse(_this.itemTemplate, _this);
                }
                return undefined;
            }
        };
        _this._itemTemplatesInternal = new Array(_this._defaultTemplate);
        _this._innerWidth = 0;
        _this._innerHeight = 0;
        _this._itemTemplateSelectorBindable = new label_1.Label();
        _this.itemIdGenerator = function (_item, index) { return index; };
        return _this;
    }
    Object.defineProperty(GridViewBase.prototype, "itemTemplateSelector", {
        get: function () {
            return this._itemTemplateSelector;
        },
        set: function (value) {
            var _this = this;
            if (typeof value === "string") {
                this._itemTemplateSelectorBindable.bind({
                    sourceProperty: null,
                    targetProperty: "templateKey",
                    expression: value
                });
                this._itemTemplateSelector = function (item, index, items) {
                    item["$index"] = index;
                    _this._itemTemplateSelectorBindable.bindingContext = item;
                    return _this._itemTemplateSelectorBindable.get("templateKey");
                };
            }
            else if (typeof value === "function") {
                this._itemTemplateSelector = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    GridViewBase.prototype.onLayout = function (left, top, right, bottom) {
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        this._innerWidth = right - left - this.effectivePaddingLeft - this.effectivePaddingRight;
        this._effectiveColWidth = view_1.PercentLength.toDevicePixels(this.colWidth, autoEffectiveColWidth, this._innerWidth);
        this._innerHeight = bottom - top - this.effectivePaddingTop - this.effectivePaddingBottom;
        this._effectiveRowHeight = view_1.PercentLength.toDevicePixels(this.rowHeight, autoEffectiveRowHeight, this._innerHeight);
    };
    GridViewBase.prototype._getItemTemplate = function (index) {
        var templateKey = "default";
        if (this.itemTemplateSelector) {
            var dataItem = this._getDataItem(index);
            templateKey = this._itemTemplateSelector(dataItem, index, this.items);
        }
        for (var _i = 0, _a = this._itemTemplatesInternal; _i < _a.length; _i++) {
            var template = _a[_i];
            if (template.key === templateKey) {
                return template;
            }
        }
        return this._itemTemplatesInternal[0];
    };
    GridViewBase.prototype._prepareItem = function (item, index) {
        if (item) {
            item.bindingContext = this._getDataItem(index);
        }
    };
    GridViewBase.prototype._getDataItem = function (index) {
        return this.isItemsSourceIn ? this.items.getItem(index) : this.items[index];
    };
    GridViewBase.prototype._updateColWidthProperty = function () {
        exports.colWidthProperty.coerce(this);
    };
    GridViewBase.prototype._updateRowHeightProperty = function () {
        exports.rowHeightProperty.coerce(this);
    };
    GridViewBase.itemLoadingEvent = "itemLoading";
    GridViewBase.itemTapEvent = "itemTap";
    GridViewBase.loadMoreItemsEvent = "loadMoreItems";
    GridViewBase.scrollEvent = "scroll";
    GridViewBase.knownFunctions = ["itemTemplateSelector", "itemIdGenerator"];
    GridViewBase = __decorate([
        view_1.CSSType("GridView")
    ], GridViewBase);
    return GridViewBase;
}(view_1.ContainerView));
exports.GridViewBase = GridViewBase;
exports.itemsProperty = new view_1.Property({
    name: "items",
    valueChanged: function (target, oldValue, newValue) {
        var getItem = newValue && newValue.getItem;
        target.isItemsSourceIn = typeof getItem === "function";
        if (oldValue instanceof observable_array_1.ObservableArray) {
            weak_event_listener_1.removeWeakEventListener(oldValue, observable_array_1.ObservableArray.changeEvent, target.refresh, target);
        }
        if (newValue instanceof observable_array_1.ObservableArray) {
            weak_event_listener_1.addWeakEventListener(newValue, observable_array_1.ObservableArray.changeEvent, target.refresh, target);
        }
        target.refresh();
    }
});
exports.itemsProperty.register(GridViewBase);
exports.itemTemplateProperty = new view_1.Property({
    name: "itemTemplate",
    valueChanged: function (target) {
        target.refresh();
    }
});
exports.itemTemplateProperty.register(GridViewBase);
exports.itemTemplatesProperty = new view_1.Property({
    name: "itemTemplates",
    valueConverter: function (value) {
        if (typeof value === "string") {
            return builder_1.parseMultipleTemplates(value);
        }
        return value;
    }
});
exports.itemTemplatesProperty.register(GridViewBase);
var defaultRowHeight = "auto";
exports.rowHeightProperty = new view_1.CoercibleProperty({
    name: "rowHeight",
    defaultValue: defaultRowHeight,
    affectsLayout: true,
    equalityComparer: view_1.PercentLength.equals,
    valueConverter: view_1.PercentLength.parse,
    coerceValue: function (target, value) {
        return target.nativeView ? value : defaultRowHeight;
    },
    valueChanged: function (target, oldValue, newValue) {
        target._effectiveRowHeight = view_1.PercentLength.toDevicePixels(newValue, autoEffectiveRowHeight, target._innerHeight);
        target.refresh();
    }
});
exports.rowHeightProperty.register(GridViewBase);
var defaultColWidth = "auto";
exports.colWidthProperty = new view_1.CoercibleProperty({
    name: "colWidth",
    defaultValue: view_1.PercentLength.parse("100"),
    affectsLayout: true,
    equalityComparer: view_1.PercentLength.equals,
    valueConverter: view_1.PercentLength.parse,
    coerceValue: function (target, value) {
        return target.nativeView ? value : defaultColWidth;
    },
    valueChanged: function (target, oldValue, newValue) {
        target._effectiveColWidth = view_1.PercentLength.toDevicePixels(newValue, autoEffectiveColWidth, target._innerWidth);
        target.refresh();
    }
});
exports.colWidthProperty.register(GridViewBase);
var converter = content_view_1.makeParser(content_view_1.makeValidator("horizontal", "vertical"));
exports.orientationProperty = new view_1.Property({
    name: "orientation",
    defaultValue: "vertical",
    affectsLayout: true,
    valueChanged: function (target, oldValue, newValue) {
        target.refresh();
    },
    valueConverter: converter
});
exports.orientationProperty.register(GridViewBase);
