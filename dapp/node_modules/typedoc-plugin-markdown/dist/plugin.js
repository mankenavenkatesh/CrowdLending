"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var components_1 = require("typedoc/dist/lib/converter/components");
var converter_1 = require("typedoc/dist/lib/converter/converter");
var events_1 = require("typedoc/dist/lib/output/events");
var options_1 = require("typedoc/dist/lib/utils/options");
var _1 = require("./theme/");
var MarkdownPlugin = (function (_super) {
    __extends(MarkdownPlugin, _super);
    function MarkdownPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.THEME_NAME = 'markdown';
        return _this;
    }
    MarkdownPlugin.prototype.initialize = function () {
        this.listenTo(this.owner, (_a = {},
            _a[converter_1.Converter.EVENT_RESOLVE_BEGIN] = this.onBegin,
            _a));
        this.listenTo(this.application.renderer, (_b = {},
            _b[events_1.PageEvent.END] = this.onPageEnd,
            _b));
        var _a, _b;
    };
    MarkdownPlugin.prototype.onBegin = function (context, reflection) {
        var renderer = this.application.renderer;
        var options = this.application.options;
        options.read({}, options_1.OptionsReadMode.Prefetch);
        var themeName = options.getValue('theme');
        var themePath = this.getThemeDirectory();
        if (themeName === this.THEME_NAME) {
            var markdownTheme = new _1.MarkdownTheme(renderer, themePath, options.getRawValues());
            renderer.theme = renderer.addComponent('theme', markdownTheme);
        }
        else {
            this.application.logger.log('To generate markdown please set option --theme markdown');
        }
    };
    MarkdownPlugin.prototype.onPageEnd = function (page) {
        page.contents = page.contents.replace(/\n{3,}/g, '\n\n');
    };
    MarkdownPlugin.prototype.getThemeDirectory = function () {
        return path.join(__dirname, './theme/');
    };
    MarkdownPlugin = __decorate([
        components_1.Component({ name: 'markdown' })
    ], MarkdownPlugin);
    return MarkdownPlugin;
}(components_1.ConverterComponent));
exports.MarkdownPlugin = MarkdownPlugin;
