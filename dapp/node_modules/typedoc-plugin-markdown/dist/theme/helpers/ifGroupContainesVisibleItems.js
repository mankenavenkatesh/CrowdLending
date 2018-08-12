"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var theme_service_1 = require("../theme.service");
function ifGroupContainesVisibleItems(group, opts) {
    var options = theme_service_1.ThemeService.getOptions();
    if (!options.excludePrivate || !group.allChildrenArePrivate) {
        return opts.fn(this);
    }
    else {
        return opts.inverse(this);
    }
}
exports.ifGroupContainesVisibleItems = ifGroupContainesVisibleItems;
