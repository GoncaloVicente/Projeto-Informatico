"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_picker_field_1 = require("../ui/date-picker-field");
var time_picker_field_1 = require("../ui/time-picker-field");
var date_time_picker_fields_1 = require("../ui/date-time-picker-fields");
var DateTimePicker = {
    install: function (Vue) {
        Vue.registerElement('DatePickerField', function () { return date_picker_field_1.DatePickerField; }, {
            model: {
                prop: 'date',
                event: 'dateChange'
            }
        });
        Vue.registerElement('TimePickerField', function () { return time_picker_field_1.TimePickerField; }, {
            model: {
                prop: 'time',
                event: 'timeChange'
            }
        });
        Vue.registerElement('DateTimePickerFields', function () { return date_time_picker_fields_1.DateTimePickerFields; }, {
            model: {
                prop: 'date',
                event: 'dateChange'
            }
        });
    }
};
exports.default = DateTimePicker;
//# sourceMappingURL=index.js.map