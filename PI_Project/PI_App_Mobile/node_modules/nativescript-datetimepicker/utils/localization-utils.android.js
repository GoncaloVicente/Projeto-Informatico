"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localization_utils_common_1 = require("./localization-utils.common");
var LocalizationUtils = (function (_super) {
    __extends(LocalizationUtils, _super);
    function LocalizationUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalizationUtils.createNativeLocale = function (locale) {
        if (LocalizationUtils._localesCache.has(locale)) {
            return LocalizationUtils._localesCache.get(locale);
        }
        var result;
        if (locale) {
            locale = locale.replace(/_/g, "-");
            var firstHypenIndex = locale.indexOf("-");
            var lang = "";
            var country = "";
            if (firstHypenIndex > -1) {
                lang = locale.substr(0, firstHypenIndex);
                var nextHypenIndex = locale.substr(firstHypenIndex + 1).indexOf("-");
                country = locale.substr(firstHypenIndex + 1, (nextHypenIndex > -1) ? nextHypenIndex : undefined);
            }
            else {
                lang = locale;
            }
            if (country !== "") {
                result = new java.util.Locale(lang, country);
            }
            else {
                result = new java.util.Locale(lang);
            }
        }
        else {
            result = java.util.Locale.getDefault();
        }
        LocalizationUtils._localesCache.set(locale, result);
        return result;
    };
    LocalizationUtils.createDefaultTimeFormat = function (context) {
        var is24Hour = android.text.format.DateFormat.is24HourFormat(context);
        var format = is24Hour ? LocalizationUtils.TIME_24H_FORMAT : LocalizationUtils.TIME_12H_FORMAT;
        return format;
    };
    LocalizationUtils.createNativeDateFormatter = function (formatPattern, nativeLocale) {
        if (!formatPattern) {
            return java.text.DateFormat.getDateInstance(java.text.DateFormat.DEFAULT, nativeLocale);
        }
        var nativeDateFormat = new java.text.SimpleDateFormat(formatPattern, nativeLocale);
        return nativeDateFormat;
    };
    LocalizationUtils.createNativeTimeFormatter = function (formatPattern, nativeLocale) {
        if (!formatPattern) {
            return java.text.DateFormat.getTimeInstance(java.text.DateFormat.SHORT, nativeLocale);
        }
        var nativeDateFormat = new java.text.SimpleDateFormat(formatPattern, nativeLocale);
        return nativeDateFormat;
    };
    LocalizationUtils.formatDateTime = function (formatter, dateTime) {
        var nativeDate = new java.util.Date(dateTime.getTime());
        var result = formatter.format(nativeDate);
        return result;
    };
    LocalizationUtils.is24Hours = function (formatter) {
        var formatPattern = formatter.toPattern();
        if (formatPattern.indexOf('H') < 0) {
            return false;
        }
        return true;
    };
    LocalizationUtils._localesCache = new Map();
    return LocalizationUtils;
}(localization_utils_common_1.LocalizationUtilsBase));
exports.LocalizationUtils = LocalizationUtils;
//# sourceMappingURL=localization-utils.android.js.map