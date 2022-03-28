"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_field_1 = require("tns-core-modules/ui/text-field");
var gestures_1 = require("tns-core-modules/ui/gestures");
var view_1 = require("tns-core-modules/ui/core/view");
var PickerFieldBase = (function (_super) {
    __extends(PickerFieldBase, _super);
    function PickerFieldBase() {
        var _this = _super.call(this) || this;
        _this.editable = false;
        return _this;
    }
    PickerFieldBase.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        this._updatePickerFieldBaseTapHandler(true);
    };
    PickerFieldBase.prototype.disposeNativeView = function () {
        this._updatePickerFieldBaseTapHandler(false);
        _super.prototype.disposeNativeView.call(this);
    };
    PickerFieldBase.localePropertyChanged = function (field, oldValue, newValue) {
        field.onLocaleChanged(oldValue, newValue);
    };
    PickerFieldBase.prototype.onLocaleChanged = function (oldValue, newValue) {
    };
    PickerFieldBase.prototype._updatePickerFieldBaseTapHandler = function (subscribe) {
        var _this = this;
        if (subscribe) {
            this._pickerFieldBaseTapHandler = this._pickerFieldBaseTapHandler || (function (args) {
                _this._onPickerFieldBaseTap(args);
            });
            this.on(gestures_1.GestureTypes.tap, this._pickerFieldBaseTapHandler);
        }
        else {
            this.off(gestures_1.GestureTypes.tap, this._pickerFieldBaseTapHandler);
        }
    };
    PickerFieldBase.prototype._onPickerFieldBaseTap = function (args) {
        this.open();
    };
    PickerFieldBase.localeProperty = new view_1.Property({
        name: "locale",
        valueChanged: PickerFieldBase.localePropertyChanged
    });
    PickerFieldBase.pickerTitleProperty = new view_1.Property({
        name: "pickerTitle"
    });
    PickerFieldBase.pickerOkTextProperty = new view_1.Property({
        name: "pickerOkText"
    });
    PickerFieldBase.pickerCancelTextProperty = new view_1.Property({
        name: "pickerCancelText"
    });
    return PickerFieldBase;
}(text_field_1.TextField));
exports.PickerFieldBase = PickerFieldBase;
PickerFieldBase.localeProperty.register(PickerFieldBase);
PickerFieldBase.pickerTitleProperty.register(PickerFieldBase);
PickerFieldBase.pickerOkTextProperty.register(PickerFieldBase);
PickerFieldBase.pickerCancelTextProperty.register(PickerFieldBase);
//# sourceMappingURL=picker-field-base.js.map