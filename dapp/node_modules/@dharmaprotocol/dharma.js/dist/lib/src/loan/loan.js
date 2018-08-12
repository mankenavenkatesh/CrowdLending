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
var base_loan_1 = require("./base_loan");
var types_1 = require("../types");
var Loan = /** @class */ (function (_super) {
    __extends(Loan, _super);
    function Loan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Eventually enables the account at the default address to make repayments
     * on Dharma Protocol.
     *
     * @example
     * await loan.allowRepayments();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    Loan.prototype.allowRepayments = function (debtorAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var debtor, ethereumAddress, tokenSymbol;
            return __generator(this, function (_a) {
                debtor = debtorAddress || this.params.debtorAddress.toString();
                ethereumAddress = new types_1.EthereumAddress(debtor);
                tokenSymbol = this.params.principal.tokenSymbol;
                return [2 /*return*/, this.enableTokenTransfers(ethereumAddress, tokenSymbol)];
            });
        });
    };
    /**
     * Eventually makes a repayment on the loan, with the default payment amount being the
     * expected size of a single installment given the principal, interest rate,
     * and terms.
     *
     * @example
     * order.makeRepayment();
     * => Promise<string>
     *
     * const outstandingAmount = await order.getOutstandingAmount();
     * order.makeRepayment(outstandingAmount);
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to make the repayment
     */
    Loan.prototype.makeRepayment = function (repaymentAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var agreementId, tokenSymbol, principalTokenAddressString, rawRepaymentAmount, repaymentAmountType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agreementId = this.getAgreementId();
                        tokenSymbol = this.params.principal.tokenSymbol;
                        return [4 /*yield*/, this.dharma.contracts.getTokenAddressBySymbolAsync(tokenSymbol)];
                    case 1:
                        principalTokenAddressString = _a.sent();
                        if (!repaymentAmount) return [3 /*break*/, 2];
                        repaymentAmountType = new types_1.TokenAmount(repaymentAmount, tokenSymbol);
                        rawRepaymentAmount = repaymentAmountType.rawAmount;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.dharma.servicing.getExpectedAmountPerRepayment(agreementId)];
                    case 3:
                        rawRepaymentAmount = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, this.dharma.servicing.makeRepayment(agreementId, rawRepaymentAmount, principalTokenAddressString)];
                }
            });
        });
    };
    /**
     * Eventually returns true if the loan's collateral has been either seized
     * by the creditor or returned to the debtor.
     *
     * @example
     * await loan.isCollateralWithdrawn();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    Loan.prototype.isCollateralWithdrawn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.isCollateralWithdrawn(this.getAgreementId())];
            });
        });
    };
    /**
     * Eventually returns true if the loan's collateral is seizable
     * by the creditor.
     *
     * @example
     * await loan.isCollateralSeizable();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    Loan.prototype.isCollateralSeizable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.canSeizeCollateral(this.getAgreementId())];
            });
        });
    };
    /**
     * Eventually returns true if the loan has been fully repaid.
     *
     * @example
     * await loan.isRepaid();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    Loan.prototype.isRepaid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var outstandingAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOutstandingAmount()];
                    case 1:
                        outstandingAmount = _a.sent();
                        return [2 /*return*/, outstandingAmount <= 0];
                }
            });
        });
    };
    /**
     * Eventually returns true if the loan's collateral is returnable to the debtor.
     *
     * @example
     * await loan.isCollateralReturnable();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    Loan.prototype.isCollateralReturnable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.canReturnCollateral(this.getAgreementId())];
            });
        });
    };
    /**
     * Eventually returns the collateral and sends it to the debtor.
     * This will fail if the collateral is not returnable.
     *
     * @example
     * order.returnCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to return the collateral
     */
    Loan.prototype.returnCollateral = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.returnCollateralAsync(this.getAgreementId())];
            });
        });
    };
    /**
     * Eventually seizes the collateral and sends it to the creditor.
     * This will fail if the collateral is not seizable.
     *
     * @example
     * order.seizeCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to seize the collateral
     */
    Loan.prototype.seizeCollateral = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.seizeCollateralAsync(this.getAgreementId())];
            });
        });
    };
    /**
     * Eventually returns the amount held as collateral for this loan.
     *
     * This will return 0 if the loan's collateral is withdrawn.
     *
     * @example
     * order.getCurrentCollateralAmount();
     * => Promise<number>
     *
     * @returns {Promise<number>} the amount currently held as collateral for the loan
     */
    Loan.prototype.getCurrentCollateralAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isCollateralWithdrawn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isCollateralWithdrawn()];
                    case 1:
                        isCollateralWithdrawn = _a.sent();
                        if (isCollateralWithdrawn) {
                            return [2 /*return*/, 0];
                        }
                        return [2 /*return*/, this.params.collateral.decimalAmount];
                }
            });
        });
    };
    /**
     * Eventually returns the total amount expected to be repaid.
     *
     * @example
     * await order.getTotalExpectedRepaymentAmount();
     * => 13.5
     *
     * @returns {Promise<number>}
     */
    Loan.prototype.getTotalExpectedRepaymentAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var agreementId, totalExpectedRepaymentAmount, tokenSymbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agreementId = this.getAgreementId();
                        return [4 /*yield*/, this.dharma.servicing.getTotalExpectedRepayment(agreementId)];
                    case 1:
                        totalExpectedRepaymentAmount = _a.sent();
                        tokenSymbol = this.params.principal.tokenSymbol;
                        return [2 /*return*/, types_1.TokenAmount.fromRaw(totalExpectedRepaymentAmount, tokenSymbol).decimalAmount];
                }
            });
        });
    };
    /**
     * Returns the symbol of the token to be repaid.
     *
     * @returns {string}
     */
    Loan.prototype.getRepaymentTokenSymbol = function () {
        return this.params.principal.tokenSymbol;
    };
    /**
     * Eventually returns the outstanding balance of the loan.
     *
     * @example
     * order.getOutstandingAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<number>}
     */
    Loan.prototype.getOutstandingAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repaymentToken, totalExpectedRepaymentAmount, _a, repaidAmount, _b, outstandingAmount, tokenSymbol;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        repaymentToken = this.getRepaymentTokenSymbol();
                        _a = types_1.TokenAmount.bind;
                        return [4 /*yield*/, this.getTotalExpectedRepaymentAmount()];
                    case 1:
                        totalExpectedRepaymentAmount = new (_a.apply(types_1.TokenAmount, [void 0, _c.sent(),
                            repaymentToken]))();
                        _b = types_1.TokenAmount.bind;
                        return [4 /*yield*/, this.getRepaidAmount()];
                    case 2:
                        repaidAmount = new (_b.apply(types_1.TokenAmount, [void 0, _c.sent(), repaymentToken]))();
                        outstandingAmount = totalExpectedRepaymentAmount.rawAmount.minus(repaidAmount.rawAmount);
                        tokenSymbol = this.params.principal.tokenSymbol;
                        return [2 /*return*/, types_1.TokenAmount.fromRaw(outstandingAmount, tokenSymbol).decimalAmount];
                }
            });
        });
    };
    /**
     * Eventually returns the total amount repaid so far.
     *
     * @example
     * order.getRepaidAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<number>}
     */
    Loan.prototype.getRepaidAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var agreementId, repaidAmount, tokenSymbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agreementId = this.getAgreementId();
                        return [4 /*yield*/, this.dharma.servicing.getValueRepaid(agreementId)];
                    case 1:
                        repaidAmount = _a.sent();
                        tokenSymbol = this.params.principal.tokenSymbol;
                        return [2 /*return*/, types_1.TokenAmount.fromRaw(repaidAmount, tokenSymbol).decimalAmount];
                }
            });
        });
    };
    return Loan;
}(base_loan_1.BaseLoan));
exports.Loan = Loan;
//# sourceMappingURL=loan.js.map