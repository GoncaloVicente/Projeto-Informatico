"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var time_picker_field_common_1 = require("./time-picker-field.common");
var localization_utils_1 = require("../utils/localization-utils");
var TimePickerField = (function (_super) {
    __extends(TimePickerField, _super);
    function TimePickerField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimePickerField.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        this.nativeView.setFocusable(false);
        if (this.timeFormat === undefined) {
            this.timeFormat = localization_utils_1.LocalizationUtils.createDefaultTimeFormat(this._context);
        }
        this._updateRegionalSettings();
    };
    return TimePickerField;
}(time_picker_field_common_1.TimePickerFieldBase));
exports.TimePickerField = TimePickerField;
//# sourceMappingURL=time-picker-field.android.js.map