"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_datetimepicker_accessors_1 = require("./nativescript-datetimepicker.accessors");
var DatePickerFieldDirective = (function () {
    function DatePickerFieldDirective() {
    }
    DatePickerFieldDirective = __decorate([
        core_1.Directive({
            selector: "DatePickerField"
        })
    ], DatePickerFieldDirective);
    return DatePickerFieldDirective;
}());
exports.DatePickerFieldDirective = DatePickerFieldDirective;
var TimePickerFieldDirective = (function () {
    function TimePickerFieldDirective() {
    }
    TimePickerFieldDirective = __decorate([
        core_1.Directive({
            selector: "TimePickerField"
        })
    ], TimePickerFieldDirective);
    return TimePickerFieldDirective;
}());
exports.TimePickerFieldDirective = TimePickerFieldDirective;
var DateTimePickerFieldsDirective = (function () {
    function DateTimePickerFieldsDirective() {
    }
    DateTimePickerFieldsDirective = __decorate([
        core_1.Directive({
            selector: "DateTimePickerFields"
        })
    ], DateTimePickerFieldsDirective);
    return DateTimePickerFieldsDirective;
}());
exports.DateTimePickerFieldsDirective = DateTimePickerFieldsDirective;
exports.DIRECTIVES = [DatePickerFieldDirective, TimePickerFieldDirective, DateTimePickerFieldsDirective,
    nativescript_datetimepicker_accessors_1.DatePickerValueAccessor, nativescript_datetimepicker_accessors_1.TimePickerValueAccessor, nativescript_datetimepicker_accessors_1.DateTimePickersValueAccessor];
//# sourceMappingURL=nativescript-datetimepicker.directives.js.map