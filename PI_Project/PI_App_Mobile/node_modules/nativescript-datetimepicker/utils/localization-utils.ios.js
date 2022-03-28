"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localization_utils_common_1 = require("./localization-utils.common");
var LocalizationUtils = (function (_super) {
    __extends(LocalizationUtils, _super);
    function LocalizationUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalizationUtils.createNativeLocale = function (localeIdentifier) {
        if (LocalizationUtils._localesCache.has(localeIdentifier)) {
            return LocalizationUtils._localesCache.get(localeIdentifier);
        }
        var result;
        if (localeIdentifier) {
            result = NSLocale.alloc().initWithLocaleIdentifier(localeIdentifier);
        }
        else {
            result = NSLocale.currentLocale;
        }
        LocalizationUtils._localesCache.set(localeIdentifier, result);
        return result;
    };
    LocalizationUtils.createNativeDateFormatter = function (formatPattern, nativeLocale) {
        var dateFormatter = NSDateFormatter.alloc().init();
        dateFormatter.locale = nativeLocale;
        if (!formatPattern) {
            dateFormatter.dateStyle = 2;
            dateFormatter.timeStyle = 0;
        }
        else {
            dateFormatter.dateFormat = formatPattern;
        }
        return dateFormatter;
    };
    LocalizationUtils.createNativeTimeFormatter = function (formatPattern, nativeLocale) {
        var dateFormatter = NSDateFormatter.alloc().init();
        dateFormatter.locale = nativeLocale;
        if (!formatPattern) {
            dateFormatter.dateStyle = 0;
            dateFormatter.timeStyle = 1;
        }
        else {
            dateFormatter.dateFormat = formatPattern;
        }
        return dateFormatter;
    };
    LocalizationUtils.formatDateTime = function (formatter, dateTime) {
        return formatter.stringFromDate(dateTime);
    };
    LocalizationUtils.is24Hours = function (formatter) {
        var formatPattern = formatter.dateFormat;
        if (formatPattern.indexOf('H') < 0) {
            return false;
        }
        return true;
    };
    LocalizationUtils._localesCache = new Map();
    return LocalizationUtils;
}(localization_utils_common_1.LocalizationUtilsBase));
exports.LocalizationUtils = LocalizationUtils;
//# sourceMappingURL=localization-utils.ios.js.map