import { Dharma } from "../dharma";
import { DebtOrderData, DurationUnit } from "../types";
export interface DebtOrderParams {
    principalAmount: number;
    principalToken: string;
    collateralAmount: number;
    collateralToken: string;
    interestRate: number;
    termDuration: number;
    termUnit: DurationUnit;
    debtorAddress: string;
    expiresInDuration: number;
    expiresInUnit: DurationUnit;
}
export declare class DebtOrder {
    private dharma;
    private params;
    private data;
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
    static create(dharma: Dharma, params: DebtOrderParams): Promise<DebtOrder>;
    static load(dharma: Dharma, data: DebtOrderData): Promise<DebtOrder>;
    private static generateSalt();
    private constructor();
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
    allowCollateralTransfer(debtorAddress?: string): Promise<string>;
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
    allowPrincipalTransfer(creditorAddress?: string): Promise<string>;
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
    allowRepayments(debtorAddress?: string): Promise<string>;
    /**
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @example
     * await debtOrder.isExpired();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    isExpired(): Promise<boolean>;
    isSignedByDebtor(): boolean;
    signAsDebtor(): Promise<void>;
    /**
     * Eventually returns true if the current debt order has been cancelled.
     *
     * @example
     * await debtOrder.isCancelled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    isCancelled(): Promise<boolean>;
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
    cancelAsDebtor(): Promise<string>;
    /**
     * Eventually returns true if the current debt order has been filled by a creditor.
     *
     * @example
     * await debtOrder.isFilled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    isFilled(): Promise<boolean>;
    /**
     * Eventually fills the debt order, transferring the principal to the debtor.
     *
     * @example
     * order.fill();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to fill the debt order
     */
    fill(creditorAddress?: string): Promise<string>;
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
    makeRepayment(repaymentAmount?: number): Promise<string>;
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
    isCollateralWithdrawn(): Promise<boolean>;
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
    isCollateralSeizable(): Promise<boolean>;
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
    isCollateralReturnable(): Promise<boolean>;
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
    returnCollateral(): Promise<string>;
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
    seizeCollateral(): Promise<string>;
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
    getCurrentCollateralAmount(): Promise<number>;
    /**
     * Eventually returns the total amount expected to be repaid.
     *
     * @example
     * await order.getTotalExpectedRepaymentAmount();
     * => 13.5
     *
     * @returns {Promise<number>}
     */
    getTotalExpectedRepaymentAmount(): Promise<number>;
    /**
     * Returns the symbol of the token to be repaid.
     *
     * @returns {string}
     */
    getRepaymentTokenSymbol(): string;
    /**
     * Eventually returns the outstanding balance of the loan.
     *
     * @example
     * order.getOutstandingAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    getOutstandingAmount(): Promise<number>;
    /**
     * Eventually returns the total amount repaid so far.
     *
     * @example
     * order.getRepaidAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    getRepaidAmount(): Promise<number>;
    private enableTokenTransfers(address, tokenSymbol);
    private isSignedByCreditor();
    private signAsCreditor();
    private getAgreementId();
    private serialize();
    private getCurrentBlocktime();
    private getCurrentUser();
}
