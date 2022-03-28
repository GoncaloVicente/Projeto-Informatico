"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var datetimepicker_1 = require("../datetimepicker");
var localization_utils_1 = require("../utils/localization-utils");
var date_utils_1 = require("../utils/date-utils");
var picker_field_base_1 = require("./picker-field-base");
var DatePickerFieldBase = (function (_super) {
    __extends(DatePickerFieldBase, _super);
    function DatePickerFieldBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePickerFieldBase_1 = DatePickerFieldBase;
    DatePickerFieldBase.prototype.open = function () {
        var _this = this;
        var style = datetimepicker_1.DateTimePickerStyle.create(this);
        datetimepicker_1.DateTimePicker.pickDate({
            context: this._context,
            date: this.date ? this.date : this.pickerDefaultDate,
            locale: this.locale,
            minDate: this.minDate,
            maxDate: this.maxDate,
            title: this.pickerTitle,
            okButtonText: this.pickerOkText,
            cancelButtonText: this.pickerCancelText
        }, style)
            .then(function (result) {
            if (result) {
                _this.date = result;
            }
            var args = {
                eventName: DatePickerFieldBase_1.datePickerClosedEvent,
                object: _this
            };
            _this.notify(args);
        })
            .catch(function (err) {
            console.log('DatePickerField Error: ' + err);
        });
        var args = {
            eventName: DatePickerFieldBase_1.datePickerOpenedEvent,
            object: this
        };
        this.notify(args);
    };
    DatePickerFieldBase.prototype.updateText = function () {
        if (!this._nativeDateFormatter) {
            this._initRegionalSettings();
        }
        this.text = this.date ? this.getFormattedDate(this.date) : "";
    };
    DatePickerFieldBase.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        this._updateRegionalSettings();
    };
    DatePickerFieldBase.datePropertyChanged = function (field, oldValue, newValue) {
        field.updateText();
    };
    DatePickerFieldBase.dateFormatPropertyChanged = function (field, oldValue, newValue) {
        field.onDateFormatChanged(oldValue, newValue);
    };
    DatePickerFieldBase.prototype.onDateFormatChanged = function (oldValue, newValue) {
        this._updateRegionalSettings();
    };
    DatePickerFieldBase.prototype.onLocaleChanged = function (oldValue, newValue) {
        this._updateRegionalSettings();
    };
    DatePickerFieldBase.prototype.getFormattedDate = function (date) {
        return localization_utils_1.LocalizationUtils.formatDateTime(this._nativeDateFormatter, date);
    };
    DatePickerFieldBase.prototype._initRegionalSettings = function () {
        this._nativeLocale = localization_utils_1.LocalizationUtils.createNativeLocale(this.locale);
        this._nativeDateFormatter = localization_utils_1.LocalizationUtils.createNativeDateFormatter(this.dateFormat, this._nativeLocale);
    };
    DatePickerFieldBase.prototype._updateRegionalSettings = function () {
        this._initRegionalSettings();
        this.updateText();
    };
    var DatePickerFieldBase_1;
    DatePickerFieldBase.datePickerOpenedEvent = "datePickerOpened";
    DatePickerFieldBase.datePickerClosedEvent = "datePickerClosed";
    DatePickerFieldBase.dateProperty = new view_1.Property({
        name: "date",
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: dateValueConverter,
        valueChanged: DatePickerFieldBase_1.datePropertyChanged
    });
    DatePickerFieldBase.maxDateProperty = new view_1.Property({
        name: "maxDate",
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: dateValueConverter,
    });
    DatePickerFieldBase.minDateProperty = new view_1.Property({
        name: "minDate",
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: dateValueConverter,
    });
    DatePickerFieldBase.dateFormatProperty = new view_1.Property({
        name: "dateFormat",
        valueChanged: DatePickerFieldBase_1.dateFormatPropertyChanged,
    });
    DatePickerFieldBase.pickerDefaultDateProperty = new view_1.Property({
        name: "pickerDefaultDate",
        defaultValue: date_utils_1.getDateToday(),
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: dateValueConverter,
    });
    DatePickerFieldBase = DatePickerFieldBase_1 = __decorate([
        view_1.CSSType("DatePickerField")
    ], DatePickerFieldBase);
    return DatePickerFieldBase;
}(picker_field_base_1.PickerFieldBase));
exports.DatePickerFieldBase = DatePickerFieldBase;
function dateValueConverter(v) {
    return new Date(v);
}
exports.dateValueConverter = dateValueConverter;
DatePickerFieldBase.dateProperty.register(DatePickerFieldBase);
DatePickerFieldBase.maxDateProperty.register(DatePickerFieldBase);
DatePickerFieldBase.minDateProperty.register(DatePickerFieldBase);
DatePickerFieldBase.dateFormatProperty.register(DatePickerFieldBase);
DatePickerFieldBase.pickerDefaultDateProperty.register(DatePickerFieldBase);
//# sourceMappingURL=date-picker-field.common.js.map