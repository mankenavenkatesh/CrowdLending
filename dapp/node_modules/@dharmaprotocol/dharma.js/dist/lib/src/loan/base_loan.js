"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("../../utils/bignumber");
var wrappers_1 = require("../wrappers");
var SALT_DECIMALS = 20;
var BaseLoan = /** @class */ (function () {
    function BaseLoan(dharma, params, data) {
        this.dharma = dharma;
        this.params = params;
        this.data = data;
    }
    BaseLoan.generateSalt = function () {
        return bignumber_1.BigNumber.random(SALT_DECIMALS).times(new bignumber_1.BigNumber(10).pow(SALT_DECIMALS));
    };
    BaseLoan.prototype.enableTokenTransfers = function (address, tokenSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dharma.contracts.getTokenAddressBySymbolAsync(tokenSymbol)];
                    case 1:
                        tokenAddress = _a.sent();
                        return [2 /*return*/, this.dharma.token.setUnlimitedProxyAllowanceAsync(tokenAddress, {
                                from: address.toString(),
                            })];
                }
            });
        });
    };
    BaseLoan.prototype.getAgreementId = function () {
        return new wrappers_1.DebtOrderDataWrapper(this.data).getIssuanceCommitmentHash();
    };
    BaseLoan.prototype.serialize = function () {
        return this.data;
    };
    BaseLoan.prototype.getCurrentBlocktime = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.blockchain.getCurrentBlockTime()];
            });
        });
    };
    BaseLoan.prototype.getCurrentUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dharma.blockchain.getAccounts()];
                    case 1:
                        accounts = _a.sent();
                        return [2 /*return*/, accounts[0]];
                }
            });
        });
    };
    return BaseLoan;
}());
exports.BaseLoan = BaseLoan;
//# sourceMappingURL=base_loan.js.map