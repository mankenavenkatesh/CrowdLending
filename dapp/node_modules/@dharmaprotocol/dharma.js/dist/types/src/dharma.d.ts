import { AdaptersAPI, BlockchainAPI, ContractsAPI, LogsAPI, OrderAPI, ServicingAPI, SignerAPI, TokenAPI } from "./apis";
import * as DharmaTypes from "./types";
declare class Dharma {
    static Types: typeof DharmaTypes;
    sign: SignerAPI;
    order: OrderAPI;
    contracts: ContractsAPI;
    adapters: AdaptersAPI;
    servicing: ServicingAPI;
    token: TokenAPI;
    blockchain: BlockchainAPI;
    logs: LogsAPI;
    private readonly web3;
    constructor(blockchainHost?: string, addressBook?: DharmaTypes.AddressBook);
}
export { Dharma };
