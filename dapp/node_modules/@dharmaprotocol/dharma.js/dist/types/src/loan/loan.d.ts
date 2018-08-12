import { BaseLoan } from "./base_loan";
export declare class Loan extends BaseLoan {
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
    allowRepayments(debtorAddress?: string): Promise<string>;
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
     * Eventually returns true if the loan's collateral has been either seized
     * by the creditor or returned to the debtor.
     *
     * @example
     * await loan.isCollateralWithdrawn();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    isCollateralWithdrawn(): Promise<boolean>;
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
    isCollateralSeizable(): Promise<boolean>;
    /**
     * Eventually returns true if the loan has been fully repaid.
     *
     * @example
     * await loan.isRepaid();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    isRepaid(): Promise<boolean>;
    /**
     * Eventually returns true if the loan's collateral is returnable to the debtor.
     *
     * @example
     * await loan.isCollateralReturnable();
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
     * @returns {Promise<number>}
     */
    getOutstandingAmount(): Promise<number>;
    /**
     * Eventually returns the total amount repaid so far.
     *
     * @example
     * order.getRepaidAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<number>}
     */
    getRepaidAmount(): Promise<number>;
}
