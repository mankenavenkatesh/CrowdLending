"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("typedoc/dist/lib/models/reflections/index");
var markdown_engine_enum_1 = require("../enums/markdown-engine.enum");
var theme_service_1 = require("../theme.service");
function getMemberHeadingLevel(member) {
    var headingLevel = theme_service_1.ThemeService.getMarkdownEngine() === markdown_engine_enum_1.MarkdownEngine.GITBOOK ? '##' : '###';
    if (member.parent.kind === index_1.ReflectionKind.ObjectLiteral) {
        headingLevel = headingLevel + '#';
    }
    return headingLevel;
}
exports.getMemberHeadingLevel = getMemberHeadingLevel;
