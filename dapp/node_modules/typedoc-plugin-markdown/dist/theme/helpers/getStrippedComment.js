"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var markdown_engine_enum_1 = require("../enums/markdown-engine.enum");
var theme_service_1 = require("../theme.service");
function getStrippedComment(comment) {
    var lineBreak = theme_service_1.ThemeService.getMarkdownEngine() === markdown_engine_enum_1.MarkdownEngine.BITBUCKET ? ' ' : '<br><br>';
    var newComment = '';
    if (comment) {
        if (comment.text) {
            newComment += comment.text.replace(/\n\n/g, lineBreak);
        }
        if (comment.shortText) {
            newComment += comment.shortText.replace(/\n\n/g, lineBreak);
        }
    }
    return newComment === '' ? '-' : newComment;
}
exports.getStrippedComment = getStrippedComment;
