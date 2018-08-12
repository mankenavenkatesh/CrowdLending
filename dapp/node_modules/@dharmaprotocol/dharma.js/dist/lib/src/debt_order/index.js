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
var constants_1 = require("../../utils/constants");
var types_1 = require("../types");
var wrappers_1 = require("../wrappers");
var SALT_DECIMALS = 20;
var DebtOrder = /** @class */ (function () {
    function DebtOrder(dharma, params, data) {
        this.dharma = dharma;
        this.params = params;
        this.data = data;
    }
    /**
     * Eventually returns an instance of an open DebtOrder signed by the debtor.
     *
     * @example
     * const debtOrder = await Types.DebtOrder.create(dharma, {
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
     * @returns {Promise<DebtOrder>}
     */
    DebtOrder.create = function (dharma, params) {
        return __awaiter(this, void 0, void 0, function () {
            var principalAmount, principalToken, collateralAmount, collateralToken, interestRate, termDuration, termUnit, debtorAddress, expiresInDuration, expiresInUnit, principal, collateral, interestRateTyped, termLength, debtorAddressTyped, expiresIn, currentBlocktime, _a, expirationTimestampInSec, debtOrderConstructorParams, loanOrder, data, debtKernel, repaymentRouter, salt, debtOrder;
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
                        debtOrderConstructorParams = {
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
                        debtOrder = new DebtOrder(dharma, debtOrderConstructorParams, data);
                        return [4 /*yield*/, debtOrder.signAsDebtor()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, debtOrder];
                }
            });
        });
    };
    DebtOrder.load = function (dharma, data) {
        return __awaiter(this, void 0, void 0, function () {
            var loanOrder, principal, collateral, interestRate, termLength, debtorAddress, debtOrderParams;
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
                        debtOrderParams = {
                            principal: principal,
                            collateral: collateral,
                            termLength: termLength,
                            interestRate: interestRate,
                            expiresAt: loanOrder.expirationTimestampInSec.toNumber(),
                            debtorAddress: debtorAddress,
                        };
                        return [2 /*return*/, new DebtOrder(dharma, debtOrderParams, data)];
                }
            });
        });
    };
    DebtOrder.generateSalt = function () {
        return bignumber_1.BigNumber.random(SALT_DECIMALS).times(new bignumber_1.BigNumber(10).pow(SALT_DECIMALS));
    };
    /**
     * Eventually enables the account at the default address to transfer the collateral token
     * on Dharma Protocol.
     *
     * @example
     * await debtOrder.allowCollateralTransfer();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    DebtOrder.prototype.allowCollateralTransfer = function (debtorAddress) {
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
     * await debtOrder.allowPrincipalTransfer();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    DebtOrder.prototype.allowPrincipalTransfer = function (creditorAddress) {
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
     * Eventually enables the account at the default address to make repayments
     * on Dharma Protocol.
     *
     * @example
     * await debtOrder.allowRepayments();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    DebtOrder.prototype.allowRepayments = function (debtorAddress) {
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
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @example
     * await debtOrder.isExpired();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    DebtOrder.prototype.isExpired = function () {
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
    DebtOrder.prototype.isSignedByDebtor = function () {
        return this.data.debtorSignature !== constants_1.NULL_ECDSA_SIGNATURE;
    };
    DebtOrder.prototype.signAsDebtor = function () {
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
     * await debtOrder.isCancelled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    DebtOrder.prototype.isCancelled = function () {
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
     * await debtOrder.cancelAsDebtor();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to cancel the debt order
     */
    DebtOrder.prototype.cancelAsDebtor = function () {
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
     * await debtOrder.isFilled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    DebtOrder.prototype.isFilled = function () {
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
    DebtOrder.prototype.fill = function (creditorAddress) {
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
    DebtOrder.prototype.makeRepayment = function (repaymentAmount) {
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
     * Eventually returns true if the debt order's collateral has been either seized
     * by the creditor or returned to the debtor.
     *
     * @example
     * await debtOrder.isCollateralWithdrawn();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    DebtOrder.prototype.isCollateralWithdrawn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.isCollateralWithdrawn(this.getAgreementId())];
            });
        });
    };
    /**
     * Eventually returns true if the debt order's collateral is seizable
     * by the creditor.
     *
     * @example
     * await debtOrder.isCollateralSeizable();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    DebtOrder.prototype.isCollateralSeizable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.canSeizeCollateral(this.getAgreementId())];
            });
        });
    };
    /**
     * Eventually returns true if the debt order's collateral is returnable
     * to the debtor.
     *
     * @example
     * await debtOrder.isCollateralReturnable();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    DebtOrder.prototype.isCollateralReturnable = function () {
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
    DebtOrder.prototype.returnCollateral = function () {
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
    DebtOrder.prototype.seizeCollateral = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.seizeCollateralAsync(this.getAgreementId())];
            });
        });
    };
    /**
     * Eventually returns the amount held as collateral for this debt order.
     * This will return 0 if the loan order has not yet been filled, or the collateral has already been seized.
     *
     * @example
     * order.getCurrentCollateralAmount();
     * => Promise<number>
     *
     * @returns {Promise<number>} the amount currently held as collateral for the debt order
     */
    DebtOrder.prototype.getCurrentCollateralAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isFilled, isCollateralWithdrawn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isFilled()];
                    case 1:
                        isFilled = _a.sent();
                        if (!isFilled) {
                            return [2 /*return*/, 0];
                        }
                        return [4 /*yield*/, this.isCollateralWithdrawn()];
                    case 2:
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
    DebtOrder.prototype.getTotalExpectedRepaymentAmount = function () {
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
    DebtOrder.prototype.getRepaymentTokenSymbol = function () {
        return this.params.principal.tokenSymbol;
    };
    /**
     * Eventually returns the outstanding balance of the loan.
     *
     * @example
     * order.getOutstandingAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    DebtOrder.prototype.getOutstandingAmount = function () {
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
     * @returns {Promise<TokenAmount>}
     */
    DebtOrder.prototype.getRepaidAmount = function () {
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
    DebtOrder.prototype.enableTokenTransfers = function (address, tokenSymbol) {
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
    DebtOrder.prototype.isSignedByCreditor = function () {
        return this.data.creditorSignature !== constants_1.NULL_ECDSA_SIGNATURE;
    };
    DebtOrder.prototype.signAsCreditor = function () {
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
    DebtOrder.prototype.getAgreementId = function () {
        return new wrappers_1.DebtOrderDataWrapper(this.data).getIssuanceCommitmentHash();
    };
    DebtOrder.prototype.serialize = function () {
        return this.data;
    };
    DebtOrder.prototype.getCurrentBlocktime = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.blockchain.getCurrentBlockTime()];
            });
        });
    };
    DebtOrder.prototype.getCurrentUser = function () {
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
    return DebtOrder;
}());
exports.DebtOrder = DebtOrder;
//# sourceMappingURL=index.js.map