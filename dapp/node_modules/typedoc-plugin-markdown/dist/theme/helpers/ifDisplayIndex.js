"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("typedoc/dist/lib/models/reflections/index");
var markdown_engine_enum_1 = require("../enums/markdown-engine.enum");
var theme_service_1 = require("../theme.service");
function ifDisplayIndex(member, opts) {
    var isGitBook = theme_service_1.ThemeService.getMarkdownEngine() === markdown_engine_enum_1.MarkdownEngine.GITBOOK;
    var classModule = member.children && member.children.length ? member.children[0].kind === index_1.ReflectionKind.Class : false;
    var enumModule = member.children && member.children.length ? member.children[0].kind === index_1.ReflectionKind.Enum : false;
    if (member.displayReadme && isGitBook ||
        (isGitBook && member.kind === index_1.ReflectionKind.Class) ||
        (isGitBook && member.kind === index_1.ReflectionKind.Interface)
        ||
            ((isGitBook && member.kind === index_1.ReflectionKind.ExternalModule && !classModule) &&
                (isGitBook && member.kind === index_1.ReflectionKind.ExternalModule && !enumModule))) {
        return opts.inverse(this);
    }
    else {
        return opts.fn(this);
    }
}
exports.ifDisplayIndex = ifDisplayIndex;
