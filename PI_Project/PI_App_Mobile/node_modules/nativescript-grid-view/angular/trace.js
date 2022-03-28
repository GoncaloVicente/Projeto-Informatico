"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trace_1 = require("tns-core-modules/trace");
var gridViewTraceCategory = "ns-grid-view";
function gridViewLog(message) {
    trace_1.write(message, gridViewTraceCategory);
}
exports.gridViewLog = gridViewLog;
function gridViewError(message) {
    trace_1.write(message, gridViewTraceCategory, trace_1.messageType.error);
}
exports.gridViewError = gridViewError;
