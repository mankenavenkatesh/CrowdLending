"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getParametersTableHeaders(parameters) {
    var headers = ['Param', 'Type', 'Default value', 'Description'];
    var hasDefaultValues = parameters.find(function (param) {
        return param.defaultValue;
    });
    var hasComments = parameters.find(function (param) {
        return param.comment;
    });
    if (!hasDefaultValues) {
        headers = headers.filter(function (header) {
            return header !== 'Default value';
        });
    }
    else {
        parameters.forEach(function (param) {
            param.defaultValue = param.defaultValue ? param.defaultValue : '-';
        });
    }
    if (!hasComments) {
        headers = headers.filter(function (header) {
            return header !== 'Description';
        });
    }
    var md = '|';
    headers.forEach(function (header) {
        md += " " + header + " |";
    });
    md += '\n';
    md += '|';
    headers.forEach(function () {
        md += " ------ |";
    });
    return md;
}
exports.getParametersTableHeaders = getParametersTableHeaders;
