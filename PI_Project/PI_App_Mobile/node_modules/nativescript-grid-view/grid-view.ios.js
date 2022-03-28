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
var observable_1 = require("data/observable");
var view_1 = require("ui/core/view");
var utils = require("utils/utils");
var grid_view_common_1 = require("./grid-view-common");
__export(require("./grid-view-common"));
var GridView = (function (_super) {
    __extends(GridView, _super);
    function GridView() {
        var _this = _super.call(this) || this;
        _this._preparingCell = false;
        _this._map = new Map();
        return _this;
    }
    GridView.prototype.createNativeView = function () {
        this._layout = UICollectionViewFlowLayout.alloc().init();
        this._layout.minimumLineSpacing = 0;
        this._layout.minimumInteritemSpacing = 0;
        return UICollectionView.alloc().initWithFrameCollectionViewLayout(CGRectMake(0, 0, 0, 0), this._layout);
    };
    GridView.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        var nativeView = this.nativeViewProtected;
        nativeView.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
        nativeView.registerClassForCellWithReuseIdentifier(GridViewCell.class(), this._defaultTemplate.key);
        nativeView.autoresizesSubviews = false;
        nativeView.autoresizingMask = 0;
        this._dataSource = GridViewDataSource.initWithOwner(new WeakRef(this));
        nativeView.dataSource = this._dataSource;
        this._delegate = UICollectionViewDelegateImpl.initWithOwner(new WeakRef(this));
        this._setNativeClipToBounds();
        this._updateColWidthProperty();
        this._updateRowHeightProperty();
    };
    GridView.prototype.disposeNativeView = function () {
        this._layout = null;
        this._delegate = null;
        this._dataSource = null;
        _super.prototype.disposeNativeView.call(this);
    };
    GridView.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this.ios.delegate = this._delegate;
    };
    GridView.prototype.onUnloaded = function () {
        this.ios.delegate = null;
        _super.prototype.onUnloaded.call(this);
    };
    Object.defineProperty(GridView.prototype, "ios", {
        get: function () {
            return this.nativeViewProtected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "_childrenCount", {
        get: function () {
            return this._map.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "horizontalOffset", {
        get: function () {
            return this.nativeViewProtected.contentOffset.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "verticalOffset", {
        get: function () {
            return this.nativeViewProtected.contentOffset.y;
        },
        enumerable: true,
        configurable: true
    });
    GridView.prototype[grid_view_common_1.paddingTopProperty.getDefault] = function () {
        return this._layout.sectionInset.top;
    };
    GridView.prototype[grid_view_common_1.paddingTopProperty.setNative] = function (value) {
        this._setPadding({ top: utils.layout.toDeviceIndependentPixels(this.effectivePaddingTop) });
    };
    GridView.prototype[grid_view_common_1.paddingRightProperty.getDefault] = function () {
        return this._layout.sectionInset.right;
    };
    GridView.prototype[grid_view_common_1.paddingRightProperty.setNative] = function (value) {
        this._setPadding({ right: utils.layout.toDeviceIndependentPixels(this.effectivePaddingRight) });
    };
    GridView.prototype[grid_view_common_1.paddingBottomProperty.getDefault] = function () {
        return this._layout.sectionInset.bottom;
    };
    GridView.prototype[grid_view_common_1.paddingBottomProperty.setNative] = function (value) {
        this._setPadding({ bottom: utils.layout.toDeviceIndependentPixels(this.effectivePaddingBottom) });
    };
    GridView.prototype[grid_view_common_1.paddingLeftProperty.getDefault] = function () {
        return this._layout.sectionInset.left;
    };
    GridView.prototype[grid_view_common_1.paddingLeftProperty.setNative] = function (value) {
        this._setPadding({ left: utils.layout.toDeviceIndependentPixels(this.effectivePaddingLeft) });
    };
    GridView.prototype[grid_view_common_1.orientationProperty.getDefault] = function () {
        if (this._layout.scrollDirection === 1) {
            return "horizontal";
        }
        return "vertical";
    };
    GridView.prototype[grid_view_common_1.orientationProperty.setNative] = function (value) {
        if (value === "horizontal") {
            this._layout.scrollDirection = 1;
        }
        else {
            this._layout.scrollDirection = 0;
        }
    };
    GridView.prototype[grid_view_common_1.itemTemplatesProperty.getDefault] = function () {
        return null;
    };
    GridView.prototype[grid_view_common_1.itemTemplatesProperty.setNative] = function (value) {
        this._itemTemplatesInternal = new Array(this._defaultTemplate);
        if (value) {
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var template = value_1[_i];
                this.ios.registerClassForCellWithReuseIdentifier(GridViewCell.class(), template.key);
            }
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(value);
        }
        this.refresh();
    };
    GridView.prototype.eachChildView = function (callback) {
        this._map.forEach(function (view, key) {
            callback(view);
        });
    };
    GridView.prototype.onLayout = function (left, top, right, bottom) {
        var _this = this;
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        var layout = this.ios.collectionViewLayout;
        layout.itemSize = CGSizeMake(utils.layout.toDeviceIndependentPixels(this._effectiveColWidth), utils.layout.toDeviceIndependentPixels(this._effectiveRowHeight));
        this._map.forEach(function (childView, listViewCell) {
            childView.iosOverflowSafeAreaEnabled = false;
            view_1.View.layoutChild(_this, childView, 0, 0, _this._effectiveColWidth, _this._effectiveRowHeight);
        });
    };
    GridView.prototype.refresh = function () {
        this.eachChildView(function (view) {
            if (!(view.bindingContext instanceof observable_1.Observable)) {
                view.bindingContext = null;
            }
            return true;
        });
        if (this.isLoaded) {
            this.ios.reloadData();
            this.requestLayout();
        }
    };
    GridView.prototype.scrollToIndex = function (index, animated) {
        if (animated === void 0) { animated = true; }
        this.ios.scrollToItemAtIndexPathAtScrollPositionAnimated(NSIndexPath.indexPathForItemInSection(index, 0), this.orientation === "vertical" ? 1 : 8, animated);
    };
    GridView.prototype.requestLayout = function () {
        if (!this._preparingCell) {
            _super.prototype.requestLayout.call(this);
        }
    };
    GridView.prototype.measure = function (widthMeasureSpec, heightMeasureSpec) {
        var changed = this._setCurrentMeasureSpecs(widthMeasureSpec, heightMeasureSpec);
        _super.prototype.measure.call(this, widthMeasureSpec, heightMeasureSpec);
        if (changed) {
            this.ios.reloadData();
        }
    };
    GridView.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var _this = this;
        _super.prototype.onMeasure.call(this, widthMeasureSpec, heightMeasureSpec);
        this._map.forEach(function (childView, gridViewCell) {
            view_1.View.measureChild(_this, childView, childView._currentWidthMeasureSpec, childView._currentHeightMeasureSpec);
        });
    };
    GridView.prototype._setNativeClipToBounds = function () {
        this.ios.clipsToBounds = true;
    };
    GridView.prototype._removeContainer = function (cell) {
        var view = cell.view;
        view.parent._removeView(view);
        this._map.delete(cell);
    };
    GridView.prototype._prepareCell = function (cell, indexPath) {
        try {
            this._preparingCell = true;
            var view = cell.view;
            if (!view) {
                view = this._getItemTemplate(indexPath.row).createView();
            }
            var args = {
                eventName: grid_view_common_1.GridViewBase.itemLoadingEvent,
                object: this,
                index: indexPath.row,
                view: view,
                ios: cell,
                android: undefined,
            };
            this.notify(args);
            view = args.view;
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            }
            else if (cell.view !== view) {
                this._removeContainer(cell);
                cell.view.nativeView.removeFromSuperview();
                cell.owner = new WeakRef(view);
            }
            this._prepareItem(view, indexPath.row);
            this._map.set(cell, view);
            if (view && !view.parent) {
                this._addView(view);
                cell.contentView.addSubview(view.ios);
            }
            this._layoutCell(view, indexPath);
        }
        finally {
            this._preparingCell = false;
        }
    };
    GridView.prototype._layoutCell = function (cellView, index) {
        if (cellView) {
            var widthMeasureSpec = utils.layout.makeMeasureSpec(this._effectiveColWidth, utils.layout.EXACTLY);
            var heightMeasureSpec = utils.layout.makeMeasureSpec(this._effectiveRowHeight, utils.layout.EXACTLY);
            view_1.View.measureChild(this, cellView, widthMeasureSpec, heightMeasureSpec);
        }
    };
    GridView.prototype._setPadding = function (newPadding) {
        var padding = {
            top: this._layout.sectionInset.top,
            right: this._layout.sectionInset.right,
            bottom: this._layout.sectionInset.bottom,
            left: this._layout.sectionInset.left
        };
        var newValue = Object.assign(padding, newPadding);
        this._layout.sectionInset =
            UIEdgeInsetsFromString("{" + newValue.top + "," + newValue.left + "," + newValue.bottom + "," + newValue.right + "}");
    };
    return GridView;
}(grid_view_common_1.GridViewBase));
exports.GridView = GridView;
var GridViewCell = (function (_super) {
    __extends(GridViewCell, _super);
    function GridViewCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridViewCell.new = function () {
        return _super.new.call(this);
    };
    GridViewCell.class = function () {
        return GridViewCell;
    };
    Object.defineProperty(GridViewCell.prototype, "view", {
        get: function () {
            return this.owner ? this.owner.get() : null;
        },
        enumerable: true,
        configurable: true
    });
    GridViewCell.prototype.willMoveToSuperview = function (newSuperview) {
        var parent = (this.view ? this.view.parent : null);
        if (parent && !newSuperview) {
            parent._removeContainer(this);
        }
    };
    return GridViewCell;
}(UICollectionViewCell));
var GridViewDataSource = (function (_super) {
    __extends(GridViewDataSource, _super);
    function GridViewDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridViewDataSource_1 = GridViewDataSource;
    GridViewDataSource.initWithOwner = function (owner) {
        var dataSource = GridViewDataSource_1.new();
        dataSource._owner = owner;
        return dataSource;
    };
    GridViewDataSource.prototype.numberOfSectionsInCollectionView = function (collectionView) {
        return 1;
    };
    GridViewDataSource.prototype.collectionViewNumberOfItemsInSection = function (collectionView, section) {
        var owner = this._owner.get();
        return owner.items ? owner.items.length : 0;
    };
    GridViewDataSource.prototype.collectionViewCellForItemAtIndexPath = function (collectionView, indexPath) {
        var owner = this._owner.get();
        var template = owner._getItemTemplate(indexPath.row);
        var cell = collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(template.key, indexPath) || GridViewCell.new();
        owner._prepareCell(cell, indexPath);
        var cellView = cell.view;
        if (cellView && cellView.isLayoutRequired) {
            cellView.iosOverflowSafeAreaEnabled = false;
            view_1.View.layoutChild(owner, cellView, 0, 0, owner._effectiveColWidth, owner._effectiveRowHeight);
        }
        return cell;
    };
    var GridViewDataSource_1;
    GridViewDataSource = GridViewDataSource_1 = __decorate([
        ObjCClass(UICollectionViewDataSource)
    ], GridViewDataSource);
    return GridViewDataSource;
}(NSObject));
var UICollectionViewDelegateImpl = (function (_super) {
    __extends(UICollectionViewDelegateImpl, _super);
    function UICollectionViewDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UICollectionViewDelegateImpl_1 = UICollectionViewDelegateImpl;
    UICollectionViewDelegateImpl.initWithOwner = function (owner) {
        var delegate = UICollectionViewDelegateImpl_1.new();
        delegate._owner = owner;
        return delegate;
    };
    UICollectionViewDelegateImpl.prototype.collectionViewWillDisplayCellForItemAtIndexPath = function (collectionView, cell, indexPath) {
        var owner = this._owner.get();
        if (indexPath.row === owner.items.length - 1) {
            owner.notify({
                eventName: grid_view_common_1.GridViewBase.loadMoreItemsEvent,
                object: owner
            });
        }
        if (cell.preservesSuperviewLayoutMargins) {
            cell.preservesSuperviewLayoutMargins = false;
        }
        if (cell.layoutMargins) {
            cell.layoutMargins = UIEdgeInsetsZero;
        }
    };
    UICollectionViewDelegateImpl.prototype.collectionViewDidSelectItemAtIndexPath = function (collectionView, indexPath) {
        var cell = collectionView.cellForItemAtIndexPath(indexPath);
        var owner = this._owner.get();
        owner.notify({
            eventName: grid_view_common_1.GridViewBase.itemTapEvent,
            object: owner,
            index: indexPath.row,
            view: cell.view,
            ios: cell,
            android: undefined,
        });
        cell.highlighted = false;
        return indexPath;
    };
    UICollectionViewDelegateImpl.prototype.scrollViewDidScroll = function (collectionView) {
        var owner = this._owner.get();
        owner.notify({
            object: owner,
            eventName: grid_view_common_1.GridViewBase.scrollEvent,
            scrollX: owner.horizontalOffset,
            scrollY: owner.verticalOffset
        });
    };
    var UICollectionViewDelegateImpl_1;
    UICollectionViewDelegateImpl = UICollectionViewDelegateImpl_1 = __decorate([
        ObjCClass(UICollectionViewDelegate, UICollectionViewDelegateFlowLayout)
    ], UICollectionViewDelegateImpl);
    return UICollectionViewDelegateImpl;
}(NSObject));
