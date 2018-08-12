"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var theme_service_1 = require("../theme.service");
function compileGroup(group, parentKind) {
    var options = theme_service_1.ThemeService.getOptions();
    var md = '';
    if (!options.excludePrivate || !group.allChildrenArePrivate) {
        md = theme_service_1.ThemeService.compilePartial('members.group.hbs', __assign({}, group));
    }
    return md;
}
exports.compileGroup = compileGroup;
