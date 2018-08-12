"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TurndownService = require('@forked/turndown');
var turndownService = new TurndownService({
    codeBlockStyle: 'fenced',
});
function getMarkdownFromHtml(options) {
    return turndownService.turndown(options.fn(this));
}
exports.getMarkdownFromHtml = getMarkdownFromHtml;
