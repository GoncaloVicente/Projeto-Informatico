"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var date_picker_field_1 = require("../ui/date-picker-field");
var time_picker_field_1 = require("../ui/time-picker-field");
var date_time_picker_fields_1 = require("../ui/date-time-picker-fields");
var nativescript_datetimepicker_directives_1 = require("./nativescript-datetimepicker.directives");
var NativeScriptDateTimePickerModule = (function () {
    function NativeScriptDateTimePickerModule() {
    }
    NativeScriptDateTimePickerModule = __decorate([
        core_1.NgModule({
            declarations: [nativescript_datetimepicker_directives_1.DIRECTIVES],
            exports: [nativescript_datetimepicker_directives_1.DIRECTIVES],
        })
    ], NativeScriptDateTimePickerModule);
    return NativeScriptDateTimePickerModule;
}());
exports.NativeScriptDateTimePickerModule = NativeScriptDateTimePickerModule;
element_registry_1.registerElement("DatePickerField", function () { return date_picker_field_1.DatePickerField; });
element_registry_1.registerElement("TimePickerField", function () { return time_picker_field_1.TimePickerField; });
element_registry_1.registerElement("DateTimePickerFields", function () { return date_time_picker_fields_1.DateTimePickerFields; });
//# sourceMappingURL=nativescript-datetimepicker.module.js.map