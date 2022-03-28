"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exit = function () {
    android.os.Process.killProcess(android.os.Process.myPid());
};
