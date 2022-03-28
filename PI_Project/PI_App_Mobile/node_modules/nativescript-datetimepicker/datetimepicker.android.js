"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localization_utils_1 = require("./utils/localization-utils");
var date_utils_1 = require("./utils/date-utils");
var datetimepicker_common_1 = require("./datetimepicker.common");
var DialogListener;
var AppCompatNamespace;
function initializeAppCompatNamespace() {
    if (AppCompatNamespace) {
        return;
    }
    if (global.androidx && global.androidx.appcompat) {
        AppCompatNamespace = global.androidx.appcompat;
    }
    else {
        AppCompatNamespace = android.support.v7;
    }
}
function initializeDialogListener() {
    if (DialogListener) {
        return;
    }
    var DialogListenerImpl = (function (_super) {
        __extends(DialogListenerImpl, _super);
        function DialogListenerImpl(nativePicker, dateTime, callback) {
            var _this = _super.call(this) || this;
            _this.nativePicker = nativePicker;
            _this.dateTime = dateTime;
            _this.callback = callback;
            _this._isClicked = false;
            return global.__native(_this);
        }
        DialogListenerImpl.prototype.onClick = function (dialog, which) {
            var callback = this.callback;
            var dateTime = this.dateTime;
            var nativePicker = this.nativePicker;
            this._isClicked = true;
            switch (which) {
                case android.content.DialogInterface.BUTTON_POSITIVE: {
                    if (nativePicker instanceof android.widget.DatePicker) {
                        dateTime.setFullYear(this.nativePicker.getYear());
                        dateTime.setMonth(this.nativePicker.getMonth());
                        dateTime.setDate(this.nativePicker.getDayOfMonth());
                    }
                    else if (nativePicker instanceof android.widget.TimePicker) {
                        dateTime.setHours(this.nativePicker.getCurrentHour());
                        dateTime.setMinutes(this.nativePicker.getCurrentMinute());
                    }
                    callback(dateTime);
                    return;
                }
            }
            callback(null);
        };
        DialogListenerImpl.prototype.onDismiss = function (dialog) {
            if (this._isClicked) {
                return;
            }
            var callback = this.callback;
            callback(null);
        };
        DialogListenerImpl = __decorate([
            Interfaces([android.content.DialogInterface.OnClickListener, android.content.DialogInterface.OnDismissListener]),
            __metadata("design:paramtypes", [Object, Date, Function])
        ], DialogListenerImpl);
        return DialogListenerImpl;
    }(java.lang.Object));
    DialogListener = DialogListenerImpl;
}
var DateTimePickerStyle = (function (_super) {
    __extends(DateTimePickerStyle, _super);
    function DateTimePickerStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DateTimePickerStyle;
}(datetimepicker_common_1.DateTimePickerStyleBase));
exports.DateTimePickerStyle = DateTimePickerStyle;
var DateTimePicker = (function (_super) {
    __extends(DateTimePicker, _super);
    function DateTimePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimePicker.pickDate = function (options, style) {
        var pickDate = new Promise(function (resolve) {
            var originalLocale;
            if (options.locale) {
                originalLocale = java.util.Locale.getDefault();
                var preferredLocale = localization_utils_1.LocalizationUtils.createNativeLocale(options.locale);
                java.util.Locale.setDefault(preferredLocale);
            }
            var nativeDatePicker = DateTimePicker._createNativeDatePicker(options);
            var nativeDialog = DateTimePicker._createNativeDialog(nativeDatePicker, options, options.date, function (result) {
                if (originalLocale) {
                    java.util.Locale.setDefault(originalLocale);
                }
                resolve(result);
            });
            DateTimePicker._showNativeDialog(nativeDialog, nativeDatePicker, style);
        });
        return pickDate;
    };
    DateTimePicker.pickTime = function (options, style) {
        var pickTime = new Promise(function (resolve) {
            var originalLocale;
            if (options.locale) {
                originalLocale = options.context.getResources().getConfiguration().locale;
                var preferredLocale = localization_utils_1.LocalizationUtils.createNativeLocale(options.locale);
                options.context.getResources().getConfiguration().locale = preferredLocale;
            }
            var nativeTimePicker = DateTimePicker._createNativeTimePicker(options);
            var nativeDialog = DateTimePicker._createNativeDialog(nativeTimePicker, options, options.time, function (result) {
                if (originalLocale) {
                    options.context.getResources().getConfiguration().locale = originalLocale;
                }
                resolve(result);
            });
            DateTimePicker._showNativeDialog(nativeDialog, nativeTimePicker, style);
        });
        return pickTime;
    };
    DateTimePicker._createNativeDatePicker = function (options) {
        var date = options.date ? new Date(options.date.getTime()) : date_utils_1.getDateToday();
        var context = options.context;
        var datePicker = new android.widget.DatePicker(context);
        datePicker.init(date.getFullYear(), date.getMonth(), date.getDate(), null);
        datePicker.setCalendarViewShown(false);
        if (options.maxDate) {
            datePicker.setMaxDate(options.maxDate.getTime());
        }
        if (options.minDate) {
            datePicker.setMinDate(options.minDate.getTime());
        }
        return datePicker;
    };
    DateTimePicker._createNativeTimePicker = function (options) {
        var time = options.time ? new Date(options.time.getTime()) : date_utils_1.getDateNow();
        var context = options.context;
        var timePicker = new android.widget.TimePicker(context);
        if (options.is24Hours) {
            timePicker.setIs24HourView(new java.lang.Boolean(options.is24Hours));
        }
        timePicker.setCurrentHour(new java.lang.Integer(time.getHours()));
        timePicker.setCurrentMinute(new java.lang.Integer(time.getMinutes()));
        return timePicker;
    };
    DateTimePicker._createNativeDialog = function (nativePicker, options, value, callback) {
        initializeDialogListener();
        initializeAppCompatNamespace();
        DateTimePicker._initializeTextResources(options.context);
        var context = options.context;
        var dateTime;
        if (value) {
            dateTime = new Date(value.getTime());
        }
        else {
            dateTime = (nativePicker instanceof android.widget.DatePicker) ? date_utils_1.getDateToday() : date_utils_1.getDateNow();
        }
        var alertDialog = new android.app.AlertDialog.Builder(context);
        var dialogListener = new DialogListener(nativePicker, dateTime, callback);
        if (options.title) {
            alertDialog.setTitle(options.title);
        }
        alertDialog.setOnDismissListener(dialogListener);
        var cancelButtonText = options.cancelButtonText ? options.cancelButtonText : this._defaultCancelText;
        var okButtonText = options.okButtonText ? options.okButtonText : this._defaultOkText;
        alertDialog.setNegativeButton(cancelButtonText, dialogListener);
        alertDialog.setPositiveButton(okButtonText, dialogListener);
        alertDialog.setView(nativePicker);
        return alertDialog;
    };
    DateTimePicker._showNativeDialog = function (nativePickerBuilder, nativePicker, style) {
        var nativeDialog = nativePickerBuilder.show();
        if (style) {
            var buttonOkTextColor = style.buttonOkTextColor ? style.buttonOkTextColor : style.buttonsTextColor;
            var buttonOkBackgroundColor = style.buttonOkBackgroundColor ? style.buttonOkBackgroundColor : style.buttonsBackgroundColor;
            var buttonCancelTextColor = style.buttonCancelTextColor ? style.buttonCancelTextColor : style.buttonsTextColor;
            var buttonCancelBackgroundColor = style.buttonCancelBackgroundColor ? style.buttonCancelBackgroundColor : style.buttonsBackgroundColor;
            DateTimePicker._applyDialogColors(nativeDialog, style.titleTextColor, style.dialogBackgroundColor);
            DateTimePicker._applyDialogSpinnersColors(nativePicker, style.spinnersTextColor, style.spinnersBackgroundColor);
            DateTimePicker._applyDialogOkButtonColors(nativeDialog, buttonOkTextColor, buttonOkBackgroundColor);
            DateTimePicker._applyDialogCancelButtonColors(nativeDialog, buttonCancelTextColor, buttonCancelBackgroundColor);
        }
    };
    DateTimePicker._applyDialogColors = function (nativeDialog, color, backgroundColor) {
        if (backgroundColor) {
            nativeDialog.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(backgroundColor.android));
        }
        if (color) {
            var label = DateTimePicker._findViewById(nativeDialog, "android:id/alertTitle");
            if (label) {
                label.setTextColor(color.android);
            }
        }
    };
    DateTimePicker._applyDialogSpinnersColors = function (nativePicker, color, backgroundColor) {
        if (backgroundColor) {
            nativePicker.setBackgroundColor(backgroundColor.android);
        }
        if (color) {
            if (nativePicker instanceof android.widget.DatePicker) {
                var yearView = DateTimePicker._findViewById(nativePicker, "android:id/year");
                DateTimePicker._applyNumberPickerColor(yearView, color);
                var monthView = DateTimePicker._findViewById(nativePicker, "android:id/month");
                DateTimePicker._applyNumberPickerColor(monthView, color);
                var dayView = DateTimePicker._findViewById(nativePicker, "android:id/day");
                DateTimePicker._applyNumberPickerColor(dayView, color);
            }
            else if (nativePicker instanceof android.widget.TimePicker) {
                var hourView = DateTimePicker._findViewById(nativePicker, "android:id/hour");
                DateTimePicker._applyNumberPickerColor(hourView, color);
                var dividerView = DateTimePicker._findViewById(nativePicker, "android:id/divider");
                DateTimePicker._applyTextViewColor(dividerView, color);
                var minuteView = DateTimePicker._findViewById(nativePicker, "android:id/minute");
                DateTimePicker._applyNumberPickerColor(minuteView, color);
                var amPmView = DateTimePicker._findViewById(nativePicker, "android:id/amPm");
                DateTimePicker._applyNumberPickerColor(amPmView, color);
            }
        }
    };
    DateTimePicker._applyDialogOkButtonColors = function (nativePicker, color, backgroundColor) {
        if (backgroundColor) {
            nativePicker.getButton(android.content.DialogInterface.BUTTON_POSITIVE).setBackgroundColor(backgroundColor.android);
        }
        if (color) {
            nativePicker.getButton(android.content.DialogInterface.BUTTON_POSITIVE).setTextColor(color.android);
        }
    };
    DateTimePicker._applyDialogCancelButtonColors = function (nativePicker, color, backgroundColor) {
        if (backgroundColor) {
            nativePicker.getButton(android.content.DialogInterface.BUTTON_NEGATIVE).setBackgroundColor(backgroundColor.android);
        }
        if (color) {
            nativePicker.getButton(android.content.DialogInterface.BUTTON_NEGATIVE).setTextColor(color.android);
        }
    };
    DateTimePicker._applyTextViewColor = function (textView, color) {
        if (!textView || !color) {
            return;
        }
        textView.setTextColor(color.android);
    };
    DateTimePicker._applyNumberPickerColor = function (numberPicker, color) {
        var wheelPaint = DateTimePicker._findFieldByName(numberPicker, "mSelectorWheelPaint");
        var selectionDividerDrawable = DateTimePicker._findFieldByName(numberPicker, "mSelectionDivider");
        if (!wheelPaint || !selectionDividerDrawable ||
            !(wheelPaint instanceof android.graphics.Paint) ||
            !(selectionDividerDrawable instanceof android.graphics.drawable.Drawable)) {
            return;
        }
        wheelPaint.setColor(color.android);
        var childCount = numberPicker.getChildCount();
        for (var i = 0; i < childCount; i++) {
            var child = numberPicker.getChildAt(i);
            if (child instanceof android.widget.EditText) {
                child.setTextColor(color.android);
            }
        }
        var filter = AppCompatNamespace.widget.AppCompatDrawableManager.getPorterDuffColorFilter(color.android, android.graphics.PorterDuff.Mode.SRC_IN);
        selectionDividerDrawable.setColorFilter(filter);
        numberPicker.invalidate();
    };
    DateTimePicker._findViewById = function (view, id) {
        var searchId = view.getContext().getResources().getIdentifier(id, null, null);
        var searchView = view.findViewById(searchId);
        return searchView;
    };
    DateTimePicker._findFieldByName = function (view, name) {
        try {
            var field = view.getClass().getDeclaredField(name);
            field.setAccessible(true);
            return field.get(view);
        }
        catch (e) {
            return null;
        }
    };
    DateTimePicker._initializeTextResources = function (context) {
        if (DateTimePicker._defaultsInitialized) {
            return;
        }
        var resources = context.getResources();
        var okId = resources.getIdentifier("ok", "string", "android");
        var cancelId = resources.getIdentifier("cancel", "string", "android");
        DateTimePicker._defaultOkText = context.getString(okId);
        DateTimePicker._defaultCancelText = context.getString(cancelId);
        DateTimePicker._defaultsInitialized = true;
    };
    DateTimePicker._defaultOkText = "OK";
    DateTimePicker._defaultCancelText = "Cancel";
    DateTimePicker._defaultsInitialized = false;
    return DateTimePicker;
}(datetimepicker_common_1.DateTimePickerBase));
exports.DateTimePicker = DateTimePicker;
//# sourceMappingURL=datetimepicker.android.js.map