"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var markdown_engine_enum_1 = require("../enums/markdown-engine.enum");
var theme_service_1 = require("../theme.service");
function getSourceFile(fileName, line, url) {
    var options = theme_service_1.ThemeService.getOptions();
    var md = 'Defined in ';
    if (theme_service_1.ThemeService.getMarkdownEngine() === markdown_engine_enum_1.MarkdownEngine.BITBUCKET && options.mdSourceRepo) {
        var bitbucketUrl = options.mdSourceRepo + "/src/master/" + fileName;
        var bitbucketParams = "fileviewer=file-view-default#" + fileName + "-" + line;
        md += "[" + fileName + ":" + line + "](" + bitbucketUrl + "?" + bitbucketParams + ")";
    }
    else if (url) {
        md += "[" + fileName + ":" + line + "](" + url + ")";
    }
    else {
        md += fileName + ":" + line;
    }
    return md;
}
exports.getSourceFile = getSourceFile;
