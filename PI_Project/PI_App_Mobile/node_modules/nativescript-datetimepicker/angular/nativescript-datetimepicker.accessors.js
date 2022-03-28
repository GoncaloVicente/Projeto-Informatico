"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var value_accessors_1 = require("nativescript-angular/forms/value-accessors");
var DATE_PICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DatePickerValueAccessor; }),
    multi: true,
};
var TIME_PICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TimePickerValueAccessor; }),
    multi: true,
};
var DATE_TIME_PICKERS_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DateTimePickersValueAccessor; }),
    multi: true,
};
var DatePickerValueAccessor = (function (_super) {
    __extends(DatePickerValueAccessor, _super);
    function DatePickerValueAccessor(elementRef) {
        var _this = _super.call(this, elementRef.nativeElement) || this;
        _this._hasBeenOpened = false;
        return _this;
    }
    DatePickerValueAccessor.prototype.writeValue = function (value) {
        var normalized = _super.prototype.normalizeValue.call(this, value);
        this.view.date = normalized;
    };
    DatePickerValueAccessor.prototype.handleDateChange = function (args) {
        if (this._hasBeenOpened) {
            this.onChange(args.value);
        }
    };
    DatePickerValueAccessor.prototype.handleDatePickerOpened = function (args) {
        this._hasBeenOpened = true;
    };
    DatePickerValueAccessor.prototype.handleDatePickerClosed = function (args) {
        this.onTouched();
    };
    DatePickerValueAccessor = __decorate([
        core_1.Directive({
            selector: "DatePickerField[ngModel],DatePickerField[formControlName],DatePickerField[formControl]," +
                "datepickerfield[ngModel],datepickerfield[formControlName],datepickerfield[formControl]," +
                "datePickerField[ngModel],datePickerField[formControlName],datePickerField[formControl]," +
                "date-picker-field[ngModel],date-picker-field[formControlName],date-picker-field[formControl]",
            providers: [DATE_PICKER_VALUE_ACCESSOR],
            host: {
                "(dateChange)": "handleDateChange($event)",
                "(datePickerOpened)": "handleDatePickerOpened($event)",
                "(datePickerClosed)": "handleDatePickerClosed($event)"
            },
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DatePickerValueAccessor);
    return DatePickerValueAccessor;
}(value_accessors_1.BaseValueAccessor));
exports.DatePickerValueAccessor = DatePickerValueAccessor;
var TimePickerValueAccessor = (function (_super) {
    __extends(TimePickerValueAccessor, _super);
    function TimePickerValueAccessor(elementRef) {
        var _this = _super.call(this, elementRef.nativeElement) || this;
        _this._hasBeenOpened = false;
        return _this;
    }
    TimePickerValueAccessor.prototype.writeValue = function (value) {
        var normalized = _super.prototype.normalizeValue.call(this, value);
        this.view.time = normalized;
    };
    TimePickerValueAccessor.prototype.handleTimeChange = function (args) {
        if (this._hasBeenOpened) {
            this.onChange(args.value);
        }
    };
    TimePickerValueAccessor.prototype.handleTimePickerOpened = function (args) {
        this._hasBeenOpened = true;
    };
    TimePickerValueAccessor.prototype.handleTimePickerClosed = function (args) {
        this.onTouched();
    };
    TimePickerValueAccessor = __decorate([
        core_1.Directive({
            selector: "TimePickerField[ngModel],TimePickerField[formControlName],TimePickerField[formControl]," +
                "timepickerfield[ngModel],timepickerfield[formControlName],timepickerfield[formControl]," +
                "timePickerField[ngModel],timePickerField[formControlName],timePickerField[formControl]," +
                "time-picker-field[ngModel],time-picker-field[formControlName],time-picker-field[formControl]",
            providers: [TIME_PICKER_VALUE_ACCESSOR],
            host: {
                "(timeChange)": "handleTimeChange($event)",
                "(timePickerOpened)": "handleTimePickerOpened($event)",
                "(timePickerClosed)": "handleTimePickerClosed($event)"
            },
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TimePickerValueAccessor);
    return TimePickerValueAccessor;
}(value_accessors_1.BaseValueAccessor));
exports.TimePickerValueAccessor = TimePickerValueAccessor;
var DateTimePickersValueAccessor = (function (_super) {
    __extends(DateTimePickersValueAccessor, _super);
    function DateTimePickersValueAccessor(elementRef) {
        var _this = _super.call(this, elementRef.nativeElement) || this;
        _this._hasBeenOpened = false;
        return _this;
    }
    DateTimePickersValueAccessor.prototype.writeValue = function (value) {
        var normalized = _super.prototype.normalizeValue.call(this, value);
        this.view.date = normalized;
    };
    DateTimePickersValueAccessor.prototype.handleDateChange = function (args) {
        if (this._hasBeenOpened) {
            this.onChange(args.value);
        }
    };
    DateTimePickersValueAccessor.prototype.handlePickerOpened = function (args) {
        this._hasBeenOpened = true;
    };
    DateTimePickersValueAccessor.prototype.handlePickerClosed = function (args) {
        this.onTouched();
    };
    DateTimePickersValueAccessor = __decorate([
        core_1.Directive({
            selector: "DateTimePickerFields[ngModel],DateTimePickerFields[formControlName],DateTimePickerFields[formControl]," +
                "datetimepickerfields[ngModel],datetimepickerfields[formControlName],datetimepickerfields[formControl]," +
                "dateTimePickerFields[ngModel],dateTimePickerFields[formControlName],dateTimePickerFields[formControl]," +
                "date-time-picker-fields[ngModel],date-time-picker-fields[formControlName],date-time-picker-fields[formControl]",
            providers: [DATE_TIME_PICKERS_VALUE_ACCESSOR],
            host: {
                "(dateChange)": "handleDateChange($event)",
                "(datePickerOpened)": "handlePickerOpened($event)",
                "(datePickerClosed)": "handlePickerClosed($event)",
                "(timePickerOpened)": "handlePickerOpened($event)",
                "(timePickerClosed)": "handlePickerClosed($event)"
            },
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DateTimePickersValueAccessor);
    return DateTimePickersValueAccessor;
}(value_accessors_1.BaseValueAccessor));
exports.DateTimePickersValueAccessor = DateTimePickersValueAccessor;
//# sourceMappingURL=nativescript-datetimepicker.accessors.js.map