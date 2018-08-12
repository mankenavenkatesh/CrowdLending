import { BaseLoan } from "./base_loan";
import { Dharma } from "../dharma";
import { DebtOrderData, DurationUnit, Loan } from "../types";
export interface LoanRequestParams {
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
export declare class LoanRequest extends BaseLoan {
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
    static create(dharma: Dharma, params: LoanRequestParams): Promise<LoanRequest>;
    static load(dharma: Dharma, data: DebtOrderData): Promise<LoanRequest>;
    /**
     * Eventually returns an instance of a loan iff the loan is filled.
     *
     * @example
     * const loan = await LoanRequest.generateLoan();
     *
     * @returns {Promise<Loan>}
     */
    generateLoan(): Promise<Loan>;
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
    allowCollateralTransfer(debtorAddress?: string): Promise<string>;
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
    allowPrincipalTransfer(creditorAddress?: string): Promise<string>;
    /**
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @example
     * await loanRequest.isExpired();
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
     * await loanRequest.isCancelled();
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
     * await loanRequest.cancelAsDebtor();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to cancel the debt order
     */
    cancelAsDebtor(): Promise<string>;
    /**
     * Eventually returns true if the current debt order has been filled by a creditor.
     *
     * @example
     * await loanRequest.isFilled();
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
    private isSignedByCreditor();
    private signAsCreditor();
}
