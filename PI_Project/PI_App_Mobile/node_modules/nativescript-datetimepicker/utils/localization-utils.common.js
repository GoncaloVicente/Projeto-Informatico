"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalizationUtilsBase = (function () {
    function LocalizationUtilsBase() {
    }
    LocalizationUtilsBase.createNativeLocale = function (localeIdentifier) {
        return null;
    };
    LocalizationUtilsBase.createDefaultTimeFormat = function (context) {
        return "";
    };
    LocalizationUtilsBase.createNativeDateFormatter = function (formatPattern, nativeLocale) {
        return null;
    };
    LocalizationUtilsBase.createNativeTimeFormatter = function (formatPattern, nativeLocale) {
        return null;
    };
    LocalizationUtilsBase.formatDateTime = function (formatter, dateTime) {
        return "";
    };
    LocalizationUtilsBase.is24Hours = function (formatter, context) {
        return false;
    };
    LocalizationUtilsBase.TIME_24H_FORMAT = "HH:mm";
    LocalizationUtilsBase.TIME_12H_FORMAT = "h:mm a";
    return LocalizationUtilsBase;
}());
exports.LocalizationUtilsBase = LocalizationUtilsBase;
//# sourceMappingURL=localization-utils.common.js.map