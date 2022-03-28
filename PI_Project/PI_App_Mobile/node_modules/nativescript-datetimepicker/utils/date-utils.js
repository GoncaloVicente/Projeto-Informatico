"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDateNow() {
    var date = new Date();
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
exports.getDateNow = getDateNow;
function getDateToday() {
    var date = getDateNow();
    date.setMinutes(0);
    date.setHours(0);
    return date;
}
exports.getDateToday = getDateToday;
function clearTime(date) {
    if (!date) {
        return date;
    }
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
exports.clearTime = clearTime;
function dateComparer(x, y) {
    if (x === undefined && y === undefined) {
        return true;
    }
    if (x === null && y === null) {
        return true;
    }
    return x <= y && x >= y;
}
exports.dateComparer = dateComparer;
//# sourceMappingURL=date-utils.js.map