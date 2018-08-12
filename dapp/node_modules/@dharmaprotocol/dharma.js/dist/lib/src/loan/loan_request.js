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
var bignumber_1 = require("../../utils/bignumber");
var constants_1 = require("../../utils/constants");
var types_1 = require("../types");
var LoanRequest = /** @class */ (function (_super) {
    __extends(LoanRequest, _super);
    function LoanRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Eventually returns an instance of a loan request signed by the debtor.
     *
     * @example
     * const loanRequest = await LoanRequest.create(dharma, {
     *      principalAmount: 5,
     *      principalToken: "REP",
     *      collateralAmount: 10,
     *      collateralToken: "MKR",
     *      interestRate: 12.3,
     *      termDuration: 6,
     *      termUnit: "months",
     *      debtorAddress: debtor.address,
     *      expiresInDuration: 5,
     *      expiresInUnit: "days",
     *  });
     *
     * @returns {Promise<LoanRequest>}
     */
    LoanRequest.create = function (dharma, params) {
        return __awaiter(this, void 0, void 0, function () {
            var principalAmount, principalToken, collateralAmount, collateralToken, interestRate, termDuration, termUnit, debtorAddress, expiresInDuration, expiresInUnit, principal, collateral, interestRateTyped, termLength, debtorAddressTyped, expiresIn, currentBlocktime, _a, expirationTimestampInSec, loanRequestConstructorParams, loanOrder, data, debtKernel, repaymentRouter, salt, loanRequest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        principalAmount = params.principalAmount, principalToken = params.principalToken, collateralAmount = params.collateralAmount, collateralToken = params.collateralToken, interestRate = params.interestRate, termDuration = params.termDuration, termUnit = params.termUnit, debtorAddress = params.debtorAddress, expiresInDuration = params.expiresInDuration, expiresInUnit = params.expiresInUnit;
                        principal = new types_1.TokenAmount(principalAmount, principalToken);
                        collateral = new types_1.TokenAmount(collateralAmount, collateralToken);
                        interestRateTyped = new types_1.InterestRate(interestRate);
                        termLength = new types_1.TimeInterval(termDuration, termUnit);
                        debtorAddressTyped = new types_1.EthereumAddress(debtorAddress);
                        expiresIn = new types_1.TimeInterval(expiresInDuration, expiresInUnit);
                        _a = bignumber_1.BigNumber.bind;
                        return [4 /*yield*/, dharma.blockchain.getCurrentBlockTime()];
                    case 1:
                        currentBlocktime = new (_a.apply(bignumber_1.BigNumber, [void 0, _b.sent()]))();
                        expirationTimestampInSec = expiresIn.fromTimestamp(currentBlocktime);
                        loanRequestConstructorParams = {
                            principal: principal,
                            collateral: collateral,
                            interestRate: interestRateTyped,
                            termLength: termLength,
                            debtorAddress: debtorAddressTyped,
                            expiresAt: expirationTimestampInSec.toNumber(),
                        };
                        loanOrder = {
                            principalAmount: principal.rawAmount,
                            principalTokenSymbol: principal.tokenSymbol,
                            interestRate: interestRateTyped.raw,
                            amortizationUnit: termLength.getAmortizationUnit(),
                            termLength: new bignumber_1.BigNumber(termLength.amount),
                            collateralTokenSymbol: collateral.tokenSymbol,
                            collateralAmount: collateral.rawAmount,
                            gracePeriodInDays: new bignumber_1.BigNumber(0),
                            expirationTimestampInSec: expirationTimestampInSec,
                        };
                        return [4 /*yield*/, dharma.adapters.collateralizedSimpleInterestLoan.toDebtOrder(loanOrder)];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, dharma.contracts.loadDebtKernelAsync()];
                    case 3:
                        debtKernel = _b.sent();
                        return [4 /*yield*/, dharma.contracts.loadRepaymentRouterAsync()];
                    case 4:
                        repaymentRouter = _b.sent();
                        salt = this.generateSalt();
                        data.debtor = debtorAddressTyped.toString();
                        data.kernelVersion = debtKernel.address;
                        data.issuanceVersion = repaymentRouter.address;
                        data.salt = salt;
                        loanRequest = new LoanRequest(dharma, loanRequestConstructorParams, data);
                        return [4 /*yield*/, loanRequest.signAsDebtor()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, loanRequest];
                }
            });
        });
    };
    LoanRequest.load = function (dharma, data) {
        return __awaiter(this, void 0, void 0, function () {
            var loanOrder, principal, collateral, interestRate, termLength, debtorAddress, loanRequestParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dharma.adapters.collateralizedSimpleInterestLoan.fromDebtOrder(data)];
                    case 1:
                        loanOrder = _a.sent();
                        principal = types_1.TokenAmount.fromRaw(loanOrder.principalAmount, loanOrder.principalTokenSymbol);
                        collateral = types_1.TokenAmount.fromRaw(loanOrder.collateralAmount, loanOrder.collateralTokenSymbol);
                        interestRate = types_1.InterestRate.fromRaw(loanOrder.interestRate);
                        termLength = new types_1.TimeInterval(loanOrder.termLength.toNumber(), loanOrder.amortizationUnit);
                        debtorAddress = new types_1.EthereumAddress(loanOrder.debtor);
                        loanRequestParams = {
                            principal: principal,
                            collateral: collateral,
                            termLength: termLength,
                            interestRate: interestRate,
                            expiresAt: loanOrder.expirationTimestampInSec.toNumber(),
                            debtorAddress: debtorAddress,
                        };
                        return [2 /*return*/, new LoanRequest(dharma, loanRequestParams, data)];
                }
            });
        });
    };
    /**
     * Eventually returns an instance of a loan iff the loan is filled.
     *
     * @example
     * const loan = await LoanRequest.generateLoan();
     *
     * @returns {Promise<Loan>}
     */
    LoanRequest.prototype.generateLoan = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isFilled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isFilled()];
                    case 1:
                        isFilled = _a.sent();
                        if (!isFilled) {
                            throw new Error("The loan request has yet to be filled on the blockchain.");
                        }
                        return [2 /*return*/, new types_1.Loan(this.dharma, this.params, this.data)];
                }
            });
        });
    };
    /**
     * Eventually enables the account at the default address to transfer the collateral token
     * on Dharma Protocol.
     *
     * @example
     * await loanRequest.allowCollateralTransfer();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    LoanRequest.prototype.allowCollateralTransfer = function (debtorAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var debtor, ethereumAddress, tokenSymbol;
            return __generator(this, function (_a) {
                debtor = debtorAddress || this.params.debtorAddress.toString();
                ethereumAddress = new types_1.EthereumAddress(debtor);
                tokenSymbol = this.params.collateral.tokenSymbol;
                return [2 /*return*/, this.enableTokenTransfers(ethereumAddress, tokenSymbol)];
            });
        });
    };
    /**
     * Eventually enables the account at the default address to transfer the principal token
     * on Dharma Protocol.
     *
     * @example
     * await loanRequest.allowPrincipalTransfer();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    LoanRequest.prototype.allowPrincipalTransfer = function (creditorAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var creditor, _a, ethereumAddress, networkId, tokenSymbol;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = creditorAddress;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCurrentUser()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        creditor = _a;
                        ethereumAddress = new types_1.EthereumAddress(creditor);
                        return [4 /*yield*/, this.dharma.blockchain.getNetworkId()];
                    case 3:
                        networkId = _b.sent();
                        if (networkId === 1 &&
                            ethereumAddress.toString() === this.params.debtorAddress.toString()) {
                            throw new Error("The creditor's address cannot be the same as the debtor's address.");
                        }
                        tokenSymbol = this.params.principal.tokenSymbol;
                        return [2 /*return*/, this.enableTokenTransfers(ethereumAddress, tokenSymbol)];
                }
            });
        });
    };
    /**
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @example
     * await loanRequest.isExpired();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    LoanRequest.prototype.isExpired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var expirationTimestamp, latestBlockTime, approximateNextBlockTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expirationTimestamp = this.data.expirationTimestampInSec;
                        return [4 /*yield*/, this.getCurrentBlocktime()];
                    case 1:
                        latestBlockTime = _a.sent();
                        approximateNextBlockTime = latestBlockTime + constants_1.BLOCK_TIME_ESTIMATE_SECONDS;
                        return [2 /*return*/, expirationTimestamp.lt(approximateNextBlockTime)];
                }
            });
        });
    };
    LoanRequest.prototype.isSignedByDebtor = function () {
        return this.data.debtorSignature !== constants_1.NULL_ECDSA_SIGNATURE;
    };
    LoanRequest.prototype.signAsDebtor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isSignedByDebtor()) {
                            return [2 /*return*/];
                        }
                        _a = this.data;
                        return [4 /*yield*/, this.dharma.sign.asDebtor(this.data, false)];
                    case 1:
                        _a.debtorSignature = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Eventually returns true if the current debt order has been cancelled.
     *
     * @example
     * await loanRequest.isCancelled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    LoanRequest.prototype.isCancelled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.order.isCancelled(this.data)];
            });
        });
    };
    /**
     * Eventually attempts to cancel the current debt order. A debt order can be cancelled by the debtor
     * if it is open and unfilled.
     *
     * @example
     * await loanRequest.cancelAsDebtor();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to cancel the debt order
     */
    LoanRequest.prototype.cancelAsDebtor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.order.cancelOrderAsync(this.data, {
                        from: this.data.debtor,
                    })];
            });
        });
    };
    /**
     * Eventually returns true if the current debt order has been filled by a creditor.
     *
     * @example
     * await loanRequest.isFilled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    LoanRequest.prototype.isFilled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.order.checkOrderFilledAsync(this.data)];
            });
        });
    };
    /**
     * Eventually fills the debt order, transferring the principal to the debtor.
     *
     * @example
     * order.fill();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to fill the debt order
     */
    LoanRequest.prototype.fill = function (creditorAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var creditor, _a, creditorAddressTyped;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = creditorAddress;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCurrentUser()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        creditor = _a;
                        creditorAddressTyped = new types_1.EthereumAddress(creditor);
                        this.data.creditor = creditorAddressTyped.toString();
                        return [4 /*yield*/, this.signAsCreditor()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, this.dharma.order.fillAsync(this.data, { from: this.data.creditor })];
                }
            });
        });
    };
    LoanRequest.prototype.isSignedByCreditor = function () {
        return this.data.creditorSignature !== constants_1.NULL_ECDSA_SIGNATURE;
    };
    LoanRequest.prototype.signAsCreditor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isSignedByCreditor()) {
                            return [2 /*return*/];
                        }
                        _a = this.data;
                        return [4 /*yield*/, this.dharma.sign.asCreditor(this.data, false)];
                    case 1:
                        _a.creditorSignature = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoanRequest;
}(base_loan_1.BaseLoan));
exports.LoanRequest = LoanRequest;
//# sourceMappingURL=loan_request.js.map