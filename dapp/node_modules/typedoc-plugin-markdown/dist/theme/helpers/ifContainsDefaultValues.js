"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ifContainsDefaultValues(parameters) {
    var hasDefaultValues = false;
    parameters.forEach(function (param) {
        if (param.defaultValue) {
            hasDefaultValues = true;
            return;
        }
    });
    return hasDefaultValues;
}
exports.ifContainsDefaultValues = ifContainsDefaultValues;
