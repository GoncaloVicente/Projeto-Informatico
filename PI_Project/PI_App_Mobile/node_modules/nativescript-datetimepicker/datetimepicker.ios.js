"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color");
var view_1 = require("tns-core-modules/ui/core/view");
var datetimepicker_common_1 = require("./datetimepicker.common");
var localization_utils_1 = require("./utils/localization-utils");
var date_utils_1 = require("./utils/date-utils");
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
            var nativeDatePicker = DateTimePicker._createNativeDatePicker(options);
            var nativeDialog = DateTimePicker._createNativeDialog(nativeDatePicker, options, style, function (result) {
                resolve(result);
            });
            DateTimePicker._showNativeDialog(nativeDialog, nativeDatePicker, style);
        });
        return pickDate;
    };
    DateTimePicker.pickTime = function (options, style) {
        var pickTime = new Promise(function (resolve) {
            var nativeTimePicker = DateTimePicker._createNativeTimePicker(options);
            var nativeDialog = DateTimePicker._createNativeDialog(nativeTimePicker, options, style, function (result) {
                resolve(result);
            });
            DateTimePicker._showNativeDialog(nativeDialog, nativeTimePicker, style);
        });
        return pickTime;
    };
    DateTimePicker._createNativeDatePicker = function (options) {
        var pickerView = UIDatePicker.alloc().initWithFrame(CGRectZero);
        pickerView.datePickerMode = 1;
        var date = options.date ? options.date : date_utils_1.getDateToday();
        pickerView.date = date;
        if (options.maxDate) {
            pickerView.maximumDate = options.maxDate;
        }
        if (options.minDate) {
            pickerView.minimumDate = options.minDate;
        }
        if (options.locale) {
            pickerView.locale = localization_utils_1.LocalizationUtils.createNativeLocale(options.locale);
        }
        return pickerView;
    };
    DateTimePicker._createNativeTimePicker = function (options) {
        var pickerView = UIDatePicker.alloc().initWithFrame(CGRectZero);
        pickerView.datePickerMode = 0;
        var time = options.time ? options.time : date_utils_1.getDateNow();
        pickerView.date = time;
        if (options.locale) {
            pickerView.locale = localization_utils_1.LocalizationUtils.createNativeLocale(options.locale);
        }
        return pickerView;
    };
    DateTimePicker._createNativeDialog = function (nativePicker, options, style, callback) {
        var alertTitle = options.title ? options.title : "";
        var alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(alertTitle, DateTimePicker.PICKER_DEFAULT_MESSAGE, 0);
        var alertSize = Math.min(alertController.view.frame.size.width, alertController.view.frame.size.height);
        var pickerViewWidth = UIDevice.currentDevice.userInterfaceIdiom === 1 ?
            DateTimePicker.PICKER_WIDTH_PAD : alertSize - DateTimePicker.PICKER_WIDTH_INSETS;
        var pickerContainerFrameTop = DateTimePicker.PICKER_DEFAULT_TITLE_OFFSET;
        if (options.title) {
            pickerContainerFrameTop += DateTimePicker.PICKER_DEFAULT_TITLE_HEIGHT;
        }
        var pickerViewHeight = DateTimePicker.PICKER_DEFAULT_MESSAGE_HEIGHT;
        var pickerContainer = UIView.alloc().init();
        var spinnersBackgroundColor = new color_1.Color("transparent");
        var spinnersTextColor = null;
        if (style) {
            spinnersBackgroundColor = style.spinnersBackgroundColor ? style.spinnersBackgroundColor : spinnersBackgroundColor;
            spinnersTextColor = style.spinnersTextColor;
        }
        DateTimePicker._applyDialogSpinnersColors(nativePicker, pickerContainer, spinnersTextColor, spinnersBackgroundColor);
        var pickerView = nativePicker;
        pickerView.frame = CGRectMake(0, 0, pickerViewWidth, pickerViewHeight);
        pickerContainer.addSubview(pickerView);
        DateTimePicker._clearVibrancyEffects(alertController.view);
        var messageLabel = DateTimePicker._findLabelWithText(alertController.view, DateTimePicker.PICKER_DEFAULT_MESSAGE);
        var messageLabelContainer = DateTimePicker._getLabelContainer(messageLabel);
        messageLabelContainer.clipsToBounds = true;
        messageLabelContainer.addSubview(pickerContainer);
        pickerContainer.translatesAutoresizingMaskIntoConstraints = false;
        pickerContainer.topAnchor.constraintEqualToAnchorConstant(alertController.view.topAnchor, pickerContainerFrameTop).active = true;
        pickerContainer.leftAnchor.constraintEqualToAnchor(alertController.view.leftAnchor).active = true;
        pickerContainer.rightAnchor.constraintEqualToAnchor(alertController.view.rightAnchor).active = true;
        pickerContainer.bottomAnchor.constraintEqualToAnchor(alertController.view.bottomAnchor).active = true;
        pickerView.leftAnchor.constraintLessThanOrEqualToAnchorConstant(pickerContainer.leftAnchor, DateTimePicker.PICKER_WIDTH_INSETS).active = true;
        pickerView.rightAnchor.constraintLessThanOrEqualToAnchorConstant(pickerContainer.rightAnchor, DateTimePicker.PICKER_WIDTH_INSETS).active = true;
        var cancelButtonText = options.cancelButtonText ? options.cancelButtonText : "Cancel";
        var okButtonText = options.okButtonText ? options.okButtonText : "OK";
        var cancelActionStyle = (style && style.buttonCancelBackgroundColor) ? 0 : 1;
        var cancelAction = UIAlertAction.actionWithTitleStyleHandler(cancelButtonText, cancelActionStyle, function () {
            callback(null);
        });
        var okAction = UIAlertAction.actionWithTitleStyleHandler(okButtonText, 0, function () {
            callback(pickerView.date);
        });
        alertController.addAction(okAction);
        if (cancelButtonText) {
            alertController.addAction(cancelAction);
        }
        if (style) {
            var buttonOkTextColor = style.buttonOkTextColor ? style.buttonOkTextColor : style.buttonsTextColor;
            var buttonCancelTextColor = style.buttonCancelTextColor ? style.buttonCancelTextColor : style.buttonsTextColor;
            DateTimePicker._applyDialogButtonTextColor(okAction, buttonOkTextColor);
            DateTimePicker._applyDialogButtonTextColor(cancelAction, buttonCancelTextColor);
            DateTimePicker._applyDialogTitleTextColor(alertController, style.titleTextColor);
            DateTimePicker._applyBackgroundColors(messageLabelContainer, style);
        }
        return alertController;
    };
    DateTimePicker._showNativeDialog = function (nativeDialog, nativePicker, style) {
        var currentPage = datetimepicker_common_1.getCurrentPage();
        if (currentPage) {
            var view = currentPage;
            var viewController = currentPage.ios;
            if (currentPage.modal) {
                view = currentPage.modal;
                if (view.ios instanceof UIViewController) {
                    viewController = view.ios;
                }
                else {
                    var parentWithController = view_1.ios.getParentWithViewController(view);
                    viewController = parentWithController ? parentWithController.viewController : undefined;
                }
            }
            if (viewController) {
                if (nativeDialog.popoverPresentationController) {
                    nativeDialog.popoverPresentationController.sourceView = viewController.view;
                    nativeDialog.popoverPresentationController.sourceRect = CGRectMake(viewController.view.bounds.size.width / 2.0, viewController.view.bounds.size.height / 2.0, 1.0, 1.0);
                    nativeDialog.popoverPresentationController.permittedArrowDirections = 0;
                }
                viewController.presentViewControllerAnimatedCompletion(nativeDialog, true, function () {
                });
            }
        }
    };
    DateTimePicker._applyDialogTitleTextColor = function (nativeDialog, color) {
        var _a;
        if (color) {
            if (nativeDialog.title) {
                var title = NSAttributedString.alloc().initWithStringAttributes(nativeDialog.title, (_a = {}, _a[NSForegroundColorAttributeName] = color.ios, _a));
                nativeDialog.setValueForKey(title, "attributedTitle");
            }
        }
    };
    DateTimePicker._applyDialogSpinnersColors = function (nativePicker, nativeContainer, color, backgroundColor) {
        if (backgroundColor) {
            nativeContainer.backgroundColor = backgroundColor.ios;
        }
        if (color) {
            nativePicker.setValueForKey(color.ios, "textColor");
            nativePicker.setValueForKey(false, "highlightsToday");
        }
    };
    DateTimePicker._applyDialogButtonTextColor = function (action, textColor) {
        if (textColor) {
            action.setValueForKey(textColor.ios, "titleTextColor");
        }
    };
    DateTimePicker._applyBackgroundColors = function (labelContainer, style) {
        if (!labelContainer || !style) {
            return;
        }
        if (labelContainer.superview && labelContainer.superview.superview) {
            var mainContainer = labelContainer.superview.superview;
            if (style.dialogBackgroundColor) {
                mainContainer.backgroundColor = style.dialogBackgroundColor.ios;
            }
            var buttonsContainer = mainContainer.subviews.lastObject;
            var buttonsBackground = style.buttonCancelBackgroundColor;
            if (!buttonsBackground) {
                buttonsBackground = style.buttonOkBackgroundColor;
                if (!buttonsBackground) {
                    buttonsBackground = style.buttonsBackgroundColor;
                }
            }
            if (buttonsContainer && buttonsBackground) {
                buttonsContainer.backgroundColor = buttonsBackground.ios;
            }
        }
    };
    DateTimePicker._clearVibrancyEffects = function (uiView) {
        if (uiView instanceof UIVisualEffectView && uiView.effect instanceof UIVibrancyEffect) {
            uiView.effect = null;
        }
        var subViewsCount = uiView.subviews.count;
        for (var i = 0; i < subViewsCount; i++) {
            DateTimePicker._clearVibrancyEffects(uiView.subviews[i]);
        }
    };
    DateTimePicker._getLabelContainer = function (uiView) {
        if (uiView.superview.class() === (UIView.class())) {
            return uiView.superview;
        }
        return DateTimePicker._getLabelContainer(uiView.superview);
    };
    DateTimePicker._findLabelWithText = function (uiView, text) {
        if ((uiView instanceof UILabel) && uiView.text === text) {
            return uiView;
        }
        var subViewsCount = uiView.subviews.count;
        for (var i = 0; i < subViewsCount; i++) {
            var label = DateTimePicker._findLabelWithText(uiView.subviews[i], text);
            if (label) {
                return label;
            }
        }
        return null;
    };
    DateTimePicker.PICKER_DEFAULT_MESSAGE_HEIGHT = 192;
    DateTimePicker.PICKER_WIDTH_INSETS = 16;
    DateTimePicker.PICKER_WIDTH_PAD = 304;
    DateTimePicker.PICKER_DEFAULT_TITLE_OFFSET = 26.5;
    DateTimePicker.PICKER_DEFAULT_TITLE_HEIGHT = 16;
    DateTimePicker.PICKER_DEFAULT_MESSAGE = "\n\n\n\n\n\n\n\n\n";
    return DateTimePicker;
}(datetimepicker_common_1.DateTimePickerBase));
exports.DateTimePicker = DateTimePicker;
//# sourceMappingURL=datetimepicker.ios.js.map