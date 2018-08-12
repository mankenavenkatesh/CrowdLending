import { BigNumber } from "../../utils/bignumber";
import { DebtOrderData, EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../types";
import { Dharma } from "../dharma";
export interface BaseLoanConstructorParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    debtorAddress: EthereumAddress;
    expiresAt: number;
}
export declare abstract class BaseLoan {
    dharma: Dharma;
    params: BaseLoanConstructorParams;
    data: DebtOrderData;
    static generateSalt(): BigNumber;
    constructor(dharma: Dharma, params: BaseLoanConstructorParams, data: DebtOrderData);
    enableTokenTransfers(address: EthereumAddress, tokenSymbol: string): Promise<string>;
    getAgreementId(): string;
    serialize(): DebtOrderData;
    getCurrentBlocktime(): Promise<number>;
    getCurrentUser(): Promise<string>;
}
