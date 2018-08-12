"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHierachySymbol(item) {
    var symbol = '';
    if (item.reflection) {
        symbol = item.reflection.extendedTypes ? '↳ ' : '';
    }
    return symbol;
}
exports.getHierachySymbol = getHierachySymbol;
