"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var markdown_engine_enum_1 = require("../enums/markdown-engine.enum");
var theme_service_1 = require("../theme.service");
function ifDisplayMainTitle(item, opts) {
    if (theme_service_1.ThemeService.getMarkdownEngine() === markdown_engine_enum_1.MarkdownEngine.GITBOOK || item.model.displayReadme) {
        return opts.inverse(this);
    }
    else {
        return opts.fn(this);
    }
}
exports.ifDisplayMainTitle = ifDisplayMainTitle;
