"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var markdown_engine_enum_1 = require("./enums/markdown-engine.enum");
var ThemeService = (function () {
    function ThemeService() {
    }
    ThemeService.getOptions = function () {
        return this.options;
    };
    ThemeService.getResources = function () {
        return this.resources;
    };
    ThemeService.getMarkdownEngine = function () {
        var specifiedEngine = this.options.mdEngine || this.options.mdFlavour || markdown_engine_enum_1.MarkdownEngine.GITHUB;
        return specifiedEngine;
    };
    ThemeService.compilePartial = function (partialName, data) {
        var template = ThemeService.getResources().partials.getResource(partialName).getTemplate();
        return template(data);
    };
    ThemeService.compileTemplate = function (templateName, data) {
        var template = ThemeService.getResources().templates.getResource(templateName).getTemplate();
        return template(data);
    };
    ThemeService.getAnchorRef = function (ref) {
        return ref.replace(/_|\/|\.| /g, '-').replace(/"/g, '').replace(/ /g, '-').toLowerCase();
    };
    return ThemeService;
}());
exports.ThemeService = ThemeService;
