"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var theme_service_1 = require("../theme.service");
function compileSources(sources) {
    var options = theme_service_1.ThemeService.getOptions();
    var md = '';
    if (!options.mdHideSources) {
        md = theme_service_1.ThemeService.compilePartial('member.sources.hbs', sources);
    }
    return md;
}
exports.compileSources = compileSources;
