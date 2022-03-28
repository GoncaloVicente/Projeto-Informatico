"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_picker_field_common_1 = require("./date-picker-field.common");
var DatePickerField = (function (_super) {
    __extends(DatePickerField, _super);
    function DatePickerField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePickerField.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        this.nativeView.setFocusable(false);
    };
    return DatePickerField;
}(date_picker_field_common_1.DatePickerFieldBase));
exports.DatePickerField = DatePickerField;
//# sourceMappingURL=date-picker-field.android.js.map