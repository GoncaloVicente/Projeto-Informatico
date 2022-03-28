"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var content_view_1 = require("tns-core-modules/ui/content-view");
var frameModule = require("tns-core-modules/ui/frame");
exports.CSS_NAME = "date-time-picker";
exports.SPINNERS_CSS_NAME = "date-time-picker-spinners";
exports.BUTTONS_CSS_NAME = "date-time-picker-buttons";
exports.BUTTON_OK_CSS_NAME = "date-time-picker-button-ok";
exports.BUTTON_CANCEL_CSS_NAME = "date-time-picker-button-cancel";
var DateTimePickerBase = (function () {
    function DateTimePickerBase() {
    }
    DateTimePickerBase.pickDate = function (options, style) {
        return Promise.resolve(null);
    };
    DateTimePickerBase.pickTime = function (options, style) {
        return Promise.resolve(null);
    };
    return DateTimePickerBase;
}());
exports.DateTimePickerBase = DateTimePickerBase;
var DateTimePickerStyleBase = (function () {
    function DateTimePickerStyleBase() {
    }
    DateTimePickerStyleBase.create = function (view) {
        var style = new DateTimePickerStyleBase();
        var pickerColors = getColorsForClassName(view, exports.CSS_NAME);
        var pickerSpinnersColors = getColorsForClassName(view, exports.SPINNERS_CSS_NAME);
        var pickerButtonsColors = getColorsForClassName(view, exports.BUTTONS_CSS_NAME);
        var pickerButtonOkColors = getColorsForClassName(view, exports.BUTTON_OK_CSS_NAME);
        var pickerButtonCancelColors = getColorsForClassName(view, exports.BUTTON_CANCEL_CSS_NAME);
        style.dialogBackgroundColor = pickerColors.backgroundColor;
        style.titleTextColor = pickerColors.color;
        style.spinnersBackgroundColor = pickerSpinnersColors.backgroundColor;
        style.spinnersTextColor = pickerSpinnersColors.color;
        style.buttonsBackgroundColor = pickerButtonsColors.backgroundColor;
        style.buttonsTextColor = pickerButtonsColors.color;
        style.buttonOkBackgroundColor = pickerButtonOkColors.backgroundColor;
        style.buttonOkTextColor = pickerButtonOkColors.color;
        style.buttonCancelBackgroundColor = pickerButtonCancelColors.backgroundColor;
        style.buttonCancelTextColor = pickerButtonCancelColors.color;
        return style;
    };
    return DateTimePickerStyleBase;
}());
exports.DateTimePickerStyleBase = DateTimePickerStyleBase;
function getCurrentPage() {
    var topmostFrame = frameModule.topmost();
    if (topmostFrame) {
        return topmostFrame.currentPage;
    }
    return undefined;
}
exports.getCurrentPage = getCurrentPage;
function getColorsForClassName(view, className) {
    var color;
    var backgroundColor;
    var tempView = new content_view_1.ContentView();
    var ngKey = Object.keys(view).find(function (key) { return key.startsWith('_ngcontent'); });
    var vueKey = Object.keys(view).find(function (key) { return key.startsWith('data-v'); });
    if (ngKey) {
        tempView[ngKey] = view[ngKey];
    }
    if (vueKey) {
        tempView[vueKey] = view[vueKey];
    }
    if (view.className) {
        var classNames = view.className.split(' ');
        classNames.forEach(function (element) {
            tempView.cssClasses.add(element);
        });
    }
    if (className) {
        tempView.cssClasses.add(className);
    }
    applySelectors(tempView, function (v) {
        color = v.color;
        backgroundColor = v.backgroundColor;
    });
    return { color: color, backgroundColor: backgroundColor };
}
function applySelectors(view, callback) {
    var currentPage = getCurrentPage();
    if (currentPage) {
        var styleScope = currentPage['_styleScope'];
        if (styleScope) {
            view['_inheritStyleScope'](styleScope);
            view.onLoaded();
            callback(view);
            view.onUnloaded();
        }
    }
}
//# sourceMappingURL=datetimepicker.common.js.map