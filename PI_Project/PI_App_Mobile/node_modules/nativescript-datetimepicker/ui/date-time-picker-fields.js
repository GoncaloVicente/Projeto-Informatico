"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var grid_layout_1 = require("tns-core-modules/ui/layouts/grid-layout");
var date_picker_field_1 = require("./date-picker-field");
var time_picker_field_1 = require("./time-picker-field");
var date_utils_1 = require("../utils/date-utils");
var DateTimePickerFields = (function (_super) {
    __extends(DateTimePickerFields, _super);
    function DateTimePickerFields() {
        var _this = _super.call(this) || this;
        _this.dateField = new date_picker_field_1.DatePickerField();
        _this.timeField = new time_picker_field_1.TimePickerField();
        var row1Spec = new grid_layout_1.ItemSpec(1, "star");
        var row2Spec = new grid_layout_1.ItemSpec(1, "star");
        var column1Spec = new grid_layout_1.ItemSpec(1, "star");
        var column2Spec = new grid_layout_1.ItemSpec(1, "star");
        _this.addRow(row1Spec);
        _this.addRow(row2Spec);
        _this.addColumn(column1Spec);
        _this.addColumn(column2Spec);
        _this.addChild(_this.dateField);
        _this.addChild(_this.timeField);
        DateTimePickerFields_1._updateOrientation(_this);
        return _this;
    }
    DateTimePickerFields_1 = DateTimePickerFields;
    DateTimePickerFields.datePropertyChanged = function (field, oldValue, newValue) {
        field.dateField.date = newValue;
        if (!field._shouldSkipTimeAssignment) {
            field.timeField.time = newValue;
        }
        field._shouldSkipTimeAssignment = false;
    };
    DateTimePickerFields.maxDatePropertyChanged = function (field, oldValue, newValue) {
        field.dateField.maxDate = newValue;
    };
    DateTimePickerFields.minDatePropertyChanged = function (field, oldValue, newValue) {
        field.dateField.minDate = newValue;
    };
    DateTimePickerFields.dateFormatPropertyChanged = function (field, oldValue, newValue) {
        field.dateField.dateFormat = newValue;
    };
    DateTimePickerFields.timeFormatPropertyChanged = function (field, oldValue, newValue) {
        field.timeField.timeFormat = newValue;
    };
    DateTimePickerFields.localePropertyChanged = function (field, oldValue, newValue) {
        field.dateField.locale = newValue;
        field.timeField.locale = newValue;
    };
    DateTimePickerFields.hintDatePropertyChanged = function (field, oldValue, newValue) {
        field.dateField.hint = newValue;
    };
    DateTimePickerFields.hintTimePropertyChanged = function (field, oldValue, newValue) {
        field.timeField.hint = newValue;
    };
    DateTimePickerFields.pickerDefaultDatePropertyChanged = function (field, oldValue, newValue) {
        field.dateField.pickerDefaultDate = newValue;
        field.timeField.pickerDefaultTime = newValue;
    };
    DateTimePickerFields.pickerTitleDatePropertyChanged = function (field, oldValue, newValue) {
        field.dateField.pickerTitle = newValue;
    };
    DateTimePickerFields.pickerTitleTimePropertyChanged = function (field, oldValue, newValue) {
        field.timeField.pickerTitle = newValue;
    };
    DateTimePickerFields.pickerOkTextPropertyChanged = function (field, oldValue, newValue) {
        field.dateField.pickerOkText = newValue;
        field.timeField.pickerOkText = newValue;
    };
    DateTimePickerFields.pickerCancelTextPropertyChanged = function (field, oldValue, newValue) {
        field.dateField.pickerCancelText = newValue;
        field.timeField.pickerCancelText = newValue;
    };
    DateTimePickerFields.orientationPropertyChanged = function (field, oldValue, newValue) {
        DateTimePickerFields_1._updateOrientation(field);
    };
    DateTimePickerFields.autoPickTimePropertyChanged = function (field, oldValue, newValue) {
        if (field.autoPickTime) {
            field.dateField.pickerDefaultDate = field.pickerDefaultDate;
        }
        else {
            field.dateField.pickerDefaultDate = date_utils_1.clearTime(field.pickerDefaultDate);
        }
    };
    DateTimePickerFields.prototype.createNativeView = function () {
        var nativeView = _super.prototype.createNativeView.call(this);
        var ngKey = Object.keys(this).find(function (key) { return key.startsWith('_ngcontent'); });
        var vueKey = Object.keys(this).find(function (key) { return key.startsWith('data-v'); });
        if (ngKey) {
            this.dateField[ngKey] = this[ngKey];
            this.timeField[ngKey] = this[ngKey];
        }
        if (vueKey) {
            this.dateField[vueKey] = this[vueKey];
            this.timeField[vueKey] = this[vueKey];
        }
        return nativeView;
    };
    DateTimePickerFields.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        this._updateHandlers(true);
    };
    DateTimePickerFields.prototype.disposeNativeView = function () {
        this._updateHandlers(false);
        _super.prototype.disposeNativeView.call(this);
    };
    DateTimePickerFields.prototype.addEventListener = function (eventNames, callback, thisArg) {
        _super.prototype.addEventListener.call(this, eventNames, callback, thisArg);
        this.dateField.addEventListener(eventNames, callback, thisArg);
        this.timeField.addEventListener(eventNames, callback, thisArg);
    };
    DateTimePickerFields.prototype.removeEventListener = function (eventNames, callback, thisArg) {
        _super.prototype.removeEventListener.call(this, eventNames, callback, thisArg);
        this.dateField.removeEventListener(eventNames, callback, thisArg);
        this.timeField.removeEventListener(eventNames, callback, thisArg);
    };
    DateTimePickerFields.prototype._updateHandlers = function (subscribe) {
        var _this = this;
        if (subscribe) {
            this._dateChangeHandler = this._dateChangeHandler || (function (args) {
                if (args.propertyName === "date") {
                    if (!_this.autoPickTime && _this.timeField.time === undefined) {
                        _this._shouldSkipTimeAssignment = true;
                    }
                    _this.date = args.value;
                }
            });
            this.dateField.on("dateChange", this._dateChangeHandler);
            this._timeChangeHandler = this._timeChangeHandler || (function (args) {
                if (args.propertyName === "time") {
                    _this.date = args.value;
                }
            });
            this.timeField.on("timeChange", this._timeChangeHandler);
            if (this.className) {
                this._handleClassNameChange();
            }
            this.on("classNameChange", this._handleClassNameChange, this);
        }
        else {
            this.dateField.off("dateChange", this._dateChangeHandler);
            this.timeField.off("timeChange", this._timeChangeHandler);
            this.off("classNameChange", this._handleClassNameChange);
        }
    };
    DateTimePickerFields.prototype._handleClassNameChange = function () {
        if (this.dateField && this.timeField) {
            this.dateField.className = this.className;
            this.timeField.className = this.className;
        }
    };
    DateTimePickerFields._updateOrientation = function (field) {
        if (field.orientation === "horizontal") {
            grid_layout_1.GridLayout.setRow(field.dateField, 0);
            grid_layout_1.GridLayout.setRow(field.timeField, 0);
            grid_layout_1.GridLayout.setColumn(field.dateField, 0);
            grid_layout_1.GridLayout.setColumn(field.timeField, 1);
            grid_layout_1.GridLayout.setRowSpan(field.dateField, 2);
            grid_layout_1.GridLayout.setRowSpan(field.timeField, 2);
            grid_layout_1.GridLayout.setColumnSpan(field.dateField, 1);
            grid_layout_1.GridLayout.setColumnSpan(field.timeField, 1);
        }
        else if (field.orientation === "vertical") {
            grid_layout_1.GridLayout.setRow(field.dateField, 0);
            grid_layout_1.GridLayout.setRow(field.timeField, 1);
            grid_layout_1.GridLayout.setColumn(field.dateField, 0);
            grid_layout_1.GridLayout.setColumn(field.timeField, 0);
            grid_layout_1.GridLayout.setRowSpan(field.dateField, 1);
            grid_layout_1.GridLayout.setRowSpan(field.timeField, 1);
            grid_layout_1.GridLayout.setColumnSpan(field.dateField, 2);
            grid_layout_1.GridLayout.setColumnSpan(field.timeField, 2);
        }
    };
    var DateTimePickerFields_1;
    DateTimePickerFields.dateProperty = new view_1.Property({
        name: "date",
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: dateValueConverter,
        valueChanged: DateTimePickerFields_1.datePropertyChanged
    });
    DateTimePickerFields.maxDateProperty = new view_1.Property({
        name: "maxDate",
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: dateValueConverter,
        valueChanged: DateTimePickerFields_1.maxDatePropertyChanged
    });
    DateTimePickerFields.minDateProperty = new view_1.Property({
        name: "minDate",
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: dateValueConverter,
        valueChanged: DateTimePickerFields_1.minDatePropertyChanged
    });
    DateTimePickerFields.dateFormatProperty = new view_1.Property({
        name: "dateFormat",
        valueChanged: DateTimePickerFields_1.dateFormatPropertyChanged,
    });
    DateTimePickerFields.timeFormatProperty = new view_1.Property({
        name: "timeFormat",
        valueChanged: DateTimePickerFields_1.timeFormatPropertyChanged,
    });
    DateTimePickerFields.localeProperty = new view_1.Property({
        name: "locale",
        valueChanged: DateTimePickerFields_1.localePropertyChanged
    });
    DateTimePickerFields.hintDateProperty = new view_1.Property({
        name: "hintDate",
        valueChanged: DateTimePickerFields_1.hintDatePropertyChanged,
    });
    DateTimePickerFields.hintTimeProperty = new view_1.Property({
        name: "hintTime",
        valueChanged: DateTimePickerFields_1.hintTimePropertyChanged,
    });
    DateTimePickerFields.pickerDefaultDateProperty = new view_1.Property({
        name: "pickerDefaultDate",
        defaultValue: date_utils_1.getDateNow(),
        equalityComparer: date_utils_1.dateComparer,
        valueConverter: dateValueConverter,
        valueChanged: DateTimePickerFields_1.pickerDefaultDatePropertyChanged
    });
    DateTimePickerFields.pickerTitleDateProperty = new view_1.Property({
        name: "pickerTitleDate",
        valueChanged: DateTimePickerFields_1.pickerTitleDatePropertyChanged
    });
    DateTimePickerFields.pickerTitleTimeProperty = new view_1.Property({
        name: "pickerTitleTime",
        valueChanged: DateTimePickerFields_1.pickerTitleTimePropertyChanged
    });
    DateTimePickerFields.pickerOkTextProperty = new view_1.Property({
        name: "pickerOkText",
        valueChanged: DateTimePickerFields_1.pickerOkTextPropertyChanged
    });
    DateTimePickerFields.pickerCancelTextProperty = new view_1.Property({
        name: "pickerCancelText",
        valueChanged: DateTimePickerFields_1.pickerCancelTextPropertyChanged
    });
    DateTimePickerFields.orientationProperty = new view_1.Property({
        name: "orientation",
        defaultValue: "horizontal",
        valueChanged: DateTimePickerFields_1.orientationPropertyChanged
    });
    DateTimePickerFields.autoPickTimeProperty = new view_1.Property({
        name: "autoPickTime",
        defaultValue: false,
        valueChanged: DateTimePickerFields_1.autoPickTimePropertyChanged
    });
    DateTimePickerFields = DateTimePickerFields_1 = __decorate([
        view_1.CSSType("DateTimePickerFields"),
        __metadata("design:paramtypes", [])
    ], DateTimePickerFields);
    return DateTimePickerFields;
}(grid_layout_1.GridLayout));
exports.DateTimePickerFields = DateTimePickerFields;
function dateValueConverter(v) {
    return new Date(v);
}
exports.dateValueConverter = dateValueConverter;
DateTimePickerFields.dateProperty.register(DateTimePickerFields);
DateTimePickerFields.maxDateProperty.register(DateTimePickerFields);
DateTimePickerFields.minDateProperty.register(DateTimePickerFields);
DateTimePickerFields.dateFormatProperty.register(DateTimePickerFields);
DateTimePickerFields.timeFormatProperty.register(DateTimePickerFields);
DateTimePickerFields.localeProperty.register(DateTimePickerFields);
DateTimePickerFields.hintDateProperty.register(DateTimePickerFields);
DateTimePickerFields.hintTimeProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerDefaultDateProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerTitleDateProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerTitleTimeProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerOkTextProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerCancelTextProperty.register(DateTimePickerFields);
DateTimePickerFields.orientationProperty.register(DateTimePickerFields);
DateTimePickerFields.autoPickTimeProperty.register(DateTimePickerFields);
//# sourceMappingURL=date-time-picker-fields.js.map