"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMemberSymbol(kindString) {
    var symbol = '';
    switch (kindString) {
        case 'Constructor signature':
            symbol = '⊕ ';
            break;
        case 'Call signature':
            symbol = '▸ ';
            break;
        case 'Type alias':
            symbol = 'Τ';
            break;
        case 'Property':
        case 'Variable':
            symbol = '● ';
            break;
        default:
    }
    return symbol;
}
exports.getMemberSymbol = getMemberSymbol;
