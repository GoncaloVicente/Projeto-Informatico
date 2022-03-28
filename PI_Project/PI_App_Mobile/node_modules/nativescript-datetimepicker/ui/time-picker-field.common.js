"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var datetimepicker_1 = require("../datetimepicker");
var localization_utils_1 = require("../utils/localization-utils");
var date_utils_1 = require("../utils/date-utils");
var picker_field_base_1 = require("./picker-field-base");
var TimePickerFieldBase = (function (_super) {
    __extends(TimePickerFieldBase, _super);
    function TimePickerFieldBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimePickerFieldBase_1 = TimePickerFieldBase;
    TimePickerFieldBase.prototype.open = function () {
        var _this = this;
        var style = datetimepicker_1.DateTimePickerStyle.create(this);
        datetimepicker_1.DateTimePicker.pickTime({
            context: this._context,
            time: this.time ? this.time : this.pickerDefaultTime,
            locale: this.locale,
            title: this.pickerTitle,
            okButtonText: this.pickerOkText,
            cancelButtonText: this.pickerCancelText,
            is24Hours: this.is24Hours(this._nativeTimeFormatter)
        }, style)
            .then(function (result) {
            if (result) {
                _this.time = result;
            }
            var args = {
                eventName: TimePickerFieldBase_1.timePickerClosedEvent,
                object: _this
            };
            _this.notify(args);
        })
            .catch(function (err) {
            console.log('TimePickerField Error: ' + err);
        });
        var args = {
            eventName: TimePickerFieldBase_1.timePickerOpenedEvent,
            object: this
        };
        this.notify(args);
    };
    TimePickerFieldBase.prototype.updateText = function () {
        if (!this._nativeTimeFormatter) {
            this._initRegionalSettings();
        }
        this.text = this.time ? this.getFormattedTime(this.time) : "";
    };
    TimePickerFieldBase.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        this._updateRegionalSettings();
    };
    TimePickerFieldBase.timePropertyChanged = function (field, oldValue, newValue) {
        field.updateText();
    };
    TimePickerFieldBase.timeFormatPropertyChanged = function (field, oldValue, newValue) {
        field.onTimeFormatChanged(oldValue, newValue);
    };
    TimePickerFieldBase.prototype.onTimeFormatChanged = function (oldValue, newValue) {
        this._updateRegionalSettings();
    };
    TimePickerFieldBase.prototype.onLocaleChanged = function (oldValue, newValue) {
        this._updateRegionalSettings();
    };
    TimePickerFieldBase.prototype._updateRegionalSettings = function () {
        this._initRegionalSettings();
        this.updateText();
    };
    TimePickerFieldBase.prototype.getFormattedTime = function (time) {
        return localization_utils_1.LocalizationUtils.formatDateTime(this._nativeTimeFormatter, time);
    };
    TimePickerFieldBase.prototype._initRegionalSettings = function () {
        this._nativeLocale = localization_utils_1.LocalizationUtils.createNativeLocale(this.locale);
        this._nativeTimeFormatter = localization_utils_1.LocalizationUtils.createNativeTimeFormatter(this.timeFormat, this._nativeLocale);
    };
    TimePickerFieldBase.prototype.is24Hours = function (formatter) {
        return localization_utils_1.LocalizationUtils.is24Hours(formatter);
    };
    var TimePickerFieldBase_1;
    TimePickerFieldBase.timePickerOpenedEvent = "timePickerOpened";
    TimePickerFieldBase.timePickerClosedEvent = "timePickerClosed";
    TimePickerFieldBase.timeProperty = new view_1.Property({
        name: "time",
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: timeValueConverter,
        valueChanged: TimePickerFieldBase_1.timePropertyChanged
    });
    TimePickerFieldBase.timeFormatProperty = new view_1.Property({
        name: "timeFormat",
        valueChanged: TimePickerFieldBase_1.timeFormatPropertyChanged
    });
    TimePickerFieldBase.pickerDefaultTimeProperty = new view_1.Property({
        name: "pickerDefaultTime",
        defaultValue: date_utils_1.getDateNow(),
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: timeValueConverter
    });
    TimePickerFieldBase = TimePickerFieldBase_1 = __decorate([
        view_1.CSSType("TimePickerField")
    ], TimePickerFieldBase);
    return TimePickerFieldBase;
}(picker_field_base_1.PickerFieldBase));
exports.TimePickerFieldBase = TimePickerFieldBase;
function timeValueConverter(timeString) {
    var date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    if (timeString.length < 2 || isNaN(+timeString.substring(0, 2))) {
        return date;
    }
    var hours = +timeString.substring(0, 2);
    date.setHours(hours);
    date.setMinutes(0);
    var timeRemainder = timeString.substring(2);
    timeRemainder = timeRemainder.startsWith(':') ? timeRemainder.substring(1) : timeRemainder;
    if (timeRemainder.length < 2 || isNaN(+timeRemainder.substring(0, 2))) {
        return date;
    }
    var minutes = +timeRemainder.substring(0, 2);
    date.setMinutes(minutes);
    timeRemainder = timeRemainder.substring(2);
    timeRemainder = timeRemainder.startsWith(':') ? timeRemainder.substring(1) : timeRemainder;
    if (timeRemainder.length < 2 || isNaN(+timeRemainder.substring(0, 2))) {
        return date;
    }
    var seconds = +timeRemainder.substring(0, 2);
    date.setSeconds(seconds);
    timeRemainder = timeRemainder.substring(2);
    timeRemainder = timeRemainder.startsWith('.') ? timeRemainder.substring(1) : timeRemainder;
    if (timeRemainder.length < 3 || isNaN(+timeRemainder.substring(0, 3))) {
        return date;
    }
    var milliseconds = +timeRemainder.substring(0, 3);
    date.setMilliseconds(milliseconds);
    return date;
}
exports.timeValueConverter = timeValueConverter;
TimePickerFieldBase.timeProperty.register(TimePickerFieldBase);
TimePickerFieldBase.timeFormatProperty.register(TimePickerFieldBase);
TimePickerFieldBase.pickerDefaultTimeProperty.register(TimePickerFieldBase);
//# sourceMappingURL=time-picker-field.common.js.map