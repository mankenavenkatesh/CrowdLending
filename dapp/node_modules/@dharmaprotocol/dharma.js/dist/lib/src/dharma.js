"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var apis_1 = require("./apis");
var DharmaTypes = require("./types");
var Dharma = /** @class */ (function () {
    function Dharma(blockchainHost, addressBook) {
        if (addressBook === void 0) { addressBook = {}; }
        /**
         * There are two ways we can access a web3 provider:
         * 1. We pass in the address of an Eth node, e.g. https://localhost:8545
         * 2. Web3 has been injected into the browser window (e.g. via Metamask.)
         */
        if (blockchainHost) {
            // If a host is specified, instantiate web3 with it as the provider.
            var web3Provider = new Web3.providers.HttpProvider(blockchainHost);
            this.web3 = new Web3(web3Provider);
        }
        else if (typeof window.web3 !== "undefined") {
            // If web3 is available via the browser window, instantiate web3 via the current provider.
            this.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            // Otherwise throw...
            throw new Error("Pass in the address of your blockchain node.");
        }
        this.contracts = new apis_1.ContractsAPI(this.web3, addressBook);
        this.servicing = new apis_1.ServicingAPI(this.web3, this.contracts);
        this.sign = new apis_1.SignerAPI(this.web3, this.contracts);
        this.adapters = new apis_1.AdaptersAPI(this.web3, this.contracts);
        this.order = new apis_1.OrderAPI(this.web3, this.contracts, this.adapters);
        this.token = new apis_1.TokenAPI(this.web3, this.contracts);
        this.blockchain = new apis_1.BlockchainAPI(this.web3, this.contracts);
        this.logs = new apis_1.LogsAPI(this.web3, this.contracts);
    }
    Dharma.Types = DharmaTypes;
    return Dharma;
}());
exports.Dharma = Dharma;
//# sourceMappingURL=dharma.js.map