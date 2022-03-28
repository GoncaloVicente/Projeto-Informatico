"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var grid_view_comp_1 = require("./grid-view-comp");
var GridViewModule = (function () {
    function GridViewModule() {
    }
    GridViewModule = __decorate([
        core_1.NgModule({
            declarations: [
                grid_view_comp_1.GridViewComponent,
            ],
            exports: [
                grid_view_comp_1.GridViewComponent,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA,
            ],
        })
    ], GridViewModule);
    return GridViewModule;
}());
exports.GridViewModule = GridViewModule;
