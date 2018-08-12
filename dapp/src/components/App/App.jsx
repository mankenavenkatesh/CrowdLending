import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";
import CrowdfundingTokenRegistryContract from "@dharmaprotocol/contracts/build/contracts/CrowdfundingTokenRegistry.json";
import DebtToken from "@dharmaprotocol/contracts/build/contracts/DebtToken.json";

import Web3 from "web3";


// Constants
import { creditorAddress, debtorAddress } from "../../constants";

// BlockchainStatus
import Header from "../Header/Header";

import Tutorials from "../Tutorials/Tutorials";
import TutorialStatus from "../TutorialStatus/TutorialStatus";
const contract = require('truffle-contract')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Instantiate a new instance of Dharma, passing in the host of the local blockchain.
const dharma = new Dharma("http://localhost:8545");

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAwaitingBlockchain: false,
            balances: {},
            isCreated: false,
            isFilled: false,
            totalAmount: 0,
            amountRepaid: 0,
            amountOutstanding: 0,
            tokenSymbol: "",
            isRepaid: false,
            isCollateralWithdrawn: false,
            isCollateralSeizable: false,
            isCollateralReturnable: false,
            crowdFundingTokenRegistryInstance : null,
        };

        this.reloadData = this.reloadData.bind(this);
        this.reloadCollateralStatus = this.reloadCollateralStatus.bind(this);
        this.reloadRepaymentStatus = this.reloadRepaymentStatus.bind(this);
        this.reloadBalances = this.reloadBalances.bind(this);

        this.createLoanRequest = this.createLoanRequest.bind(this);
        this.allowPrincipalTransfer = this.allowPrincipalTransfer.bind(this);
        this.allowRepayments = this.allowRepayments.bind(this);
        this.makeRepayment = this.makeRepayment.bind(this);
        this.returnCollateral = this.returnCollateral.bind(this);
        this.fillLoanRequest = this.fillLoanRequest.bind(this);
    }

    async componentDidMount() {
        this.reloadData();
    }

    async reloadCollateralStatus() {
        const { loan } = this.state;

        if (!loan) {
            return;
        }

        const isCollateralWithdrawn = await loan.isCollateralWithdrawn();
        const isCollateralSeizable = await loan.isCollateralSeizable();
        const isCollateralReturnable = await loan.isCollateralReturnable();

        this.setState({
            isCollateralWithdrawn,
            isCollateralSeizable,
            isCollateralReturnable,
        });
    }

    async reloadRepaymentStatus() {
        const { loan } = this.state;

        if (!loan) {
            return;
        }

        const totalAmount = await loan.getTotalExpectedRepaymentAmount();
        const amountRepaid = await loan.getRepaidAmount();
        const amountOutstanding = await loan.getOutstandingAmount();
        const tokenSymbol = await loan.getRepaymentTokenSymbol();
        const isRepaid = await loan.isRepaid();

        this.setState({
            totalAmount,
            amountRepaid,
            amountOutstanding,
            tokenSymbol,
            isRepaid,
        });
    }

    async reloadBalances() {
        const { loan } = this.state;

        const repAddress = await dharma.contracts.getTokenAddressBySymbolAsync("REP");
        const wethAddress = await dharma.contracts.getTokenAddressBySymbolAsync("WETH");

        const debtorREP = await dharma.token.getBalanceAsync(repAddress, debtorAddress);
        const debtorWETH = await dharma.token.getBalanceAsync(wethAddress, debtorAddress);

        const creditorREP = await dharma.token.getBalanceAsync(repAddress, creditorAddress);
        const creditorWETH = await dharma.token.getBalanceAsync(wethAddress, creditorAddress);

        const collateralizerREP = loan ? await loan.getCurrentCollateralAmount() : 0;

        // WETH never gets collateralized in this example.
        const collateralizerWETH = 0;

        this.setState({
            balances: {
                debtorREP: this.toString(debtorREP),
                debtorWETH: this.toString(debtorWETH),
                creditorREP: this.toString(creditorREP),
                creditorWETH: this.toString(creditorWETH),
                collateralizerREP,
                collateralizerWETH,
            }
        });
    }

    async reloadData() {
        this.reloadRepaymentStatus();
        this.reloadCollateralStatus();
        this.reloadBalances();
    }

    async allowPrincipalTransfer() {
        this.setState({
            isAwaitingBlockchain: true
        });

        const { loanRequest } = this.state;

        await loanRequest.allowPrincipalTransfer(creditorAddress);

        this.setState({
            isAwaitingBlockchain: false,
            hasAllowedPrincipalTransfer: true,
        });

        this.reloadData();
    }

    async allowRepayments() {
        this.setState({
            isAwaitingBlockchain: true,
        });

        const { loan } = this.state;

        /*
         * Step 1:
         * In the second tutorial, we authorized the Dharma smart contracts to transfer
         * the borrower's collateral and the lender's principal. Before making repayments
         * on their loan, the borrower needs to do something similar, authorizing the
         * Dharma smart contracts to transfer the repayments.
         */

        // your code here

        this.setState({
            isAwaitingBlockchain: false,
            hasAllowedRepayments: true,
        });

        this.reloadData();
    }

    async fillLoanRequest() {
        this.setState({
            isAwaitingBlockchain: true,
        });

        const { loanRequest } = this.state;

        try {
            const debtTokenId = await loanRequest.fill(creditorAddress);
            console.log("Debt Token Id - "+debtTokenId);
            const loan = await loanRequest.generateLoan();
            console.log(loan);
            console.log("Loan Object-"+loan.dharma.contracts.cache.DebtToken.address);

            // Create CrowdFundingRegistryContract Object

            const crowdfundingTokenRegistry = contract(CrowdfundingTokenRegistryContract);
            crowdfundingTokenRegistry.setProvider(web3.currentProvider);   
            let _self = this;         
            let instance = await crowdfundingTokenRegistry.deployed();
            console.log("crowdfundingTokenRegistry Instance- "+instance);
            _self.setState({crowdFundingTokenRegistryInstance: instance});
            
            // TBD - Deploy and Get CrowdFundingTokenRegistry
            var cfrcAddress = instance.address;
            console.log("cfrc Address-"+ cfrcAddress);
            // TBD - Get Weth index
            // console.log("dharma object - "+dharma)
            // console.log(dharma.contracts.cache.DebtToken);
            // console.log(dharma.contracts.cache.DebtToken.abi);

            // const debtTokenContract = contract(DebtToken);
            // debtTokenContract.setProvider(web3.currentProvider);            
            // let debtTokenContractInstance = await debtTokenContract.deployed();
            // console.log("debtTokenContract Instance- ");
            // console.log(debtTokenContractInstance);
            // await debtTokenContractInstance.safeTransferFrom(creditorAddress,cfrcAddress, debtTokenId, 1);

            // await dharma.contracts.cache.DebtToken.safeTransferFrom.sendTransactionAsync(creditorAddress, cfrcAddress, debtTokenId, 0, {from : creditorAddress});
            
            this.setState({
                isAwaitingBlockchain: false,
                isFilled: true,
                loan,
            });

            this.reloadData();
        } catch (e) {
            console.error(e);

            this.setState({
                isAwaitingBlockchain: false,
            });
        }
    }

    async makeRepayment() {
        this.setState({
            isAwaitingBlockchain: true,
        });

        const { loan } = this.state;

        /*
         * Step 2:
         * Having authorized the borrower to make repayments, let's start paying off this loan. 
         *
         * Add code to enable the borrower to start paying back their loan, one installment at a time.
         */

        // your code here

        this.setState({
            isAwaitingBlockchain: false,
        });

        this.reloadData();
    }

    async returnCollateral() {
        this.setState({
            isAwaitingBlockchain: true,
        });

        const { loan } = this.state;

        /*
         * Step 3:
         *
         * Let's add the final line of code that will enable the borrower to reclaim their collateral.
         */

        // your code here

        this.setState({
            isAwaitingBlockchain: false,
        });

        this.reloadData();
    }

    async createLoanRequest(formData) {
        this.setState({
            isAwaitingBlockchain: true,
        });

        const { LoanRequest } = Dharma.Types;

        const { principal, collateral, termLength, interestRate } = formData;

        try {
            const loanRequest = await LoanRequest.create(dharma, {
                principalAmount: 0,
                principalToken: "WETH",
                collateralAmount: collateral,
                collateralToken: "REP",
                interestRate: interestRate,
                termDuration: termLength,
                termUnit: "months",
                debtorAddress: debtorAddress,
                expiresInDuration: 1,
                expiresInUnit: "weeks",
            });

            await loanRequest.allowCollateralTransfer(debtorAddress);            
            this.setState({
                isAwaitingBlockchain: false,
                hasAllowedCollateralTransfer: true,
                isCreated: true,
                loanRequest,
            });

            await this.allowPrincipalTransfer();
            await this.fillLoanRequest();   
            
            console.log("Fill Loan Request Completed.....Debt Token should be created");
            this.reloadData();
        } catch (e) {
            console.error(e);

            this.setState({
                isAwaitingBlockchain: false,
            });
        }
    }

    toString(balance) {
        return balance
            .div(10 ** 18)
            .toNumber()
            .toLocaleString();
    }

    render() {
        const {
            // networking
            isAwaitingBlockchain,
            // balances
            balances,
            // Loan Request
            isCreated,
            isFilled,
            // Collateral
            isCollateralWithdrawn,
            isCollateralSeizable,
            isCollateralReturnable,
            // Repayments
            totalAmount,
            amountRepaid,
            amountOutstanding,
            tokenSymbol,
            isRepaid,
            // Authorizations
            hasAllowedPrincipalTransfer,
            // hasAllowedCollateralTransfer, TODO(kayvon): incorporate in authorizations summmary
            hasAllowedRepayments,
        } = this.state;

        return (
            <div className="App">
                <Header />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-7">
                            <Tutorials
                                isAwaitingBlockchain={isAwaitingBlockchain}
                                createLoanRequest={this.createLoanRequest}
                                isCreated={isCreated}
                                hasAllowedPrincipalTransfer={hasAllowedPrincipalTransfer}
                                allowPrincipalTransfer={this.allowPrincipalTransfer}
                                isFilled={isFilled}
                                fillLoanRequest={this.fillLoanRequest}
                                hasAllowedRepayments={hasAllowedRepayments}
                                makeRepayment={this.makeRepayment}
                                allowRepayments={this.allowRepayments}
                                isRepaid={isRepaid}
                                isCollateralReturnable={isCollateralReturnable}
                                returnCollateral={this.returnCollateral}
                            />
                        </div>

                        <div className="col-sm-5">
                            <TutorialStatus
                                balances={balances}
                                isFilled={isFilled}
                                isCreated={isCreated}
                                isCollateralWithdrawn={isCollateralWithdrawn}
                                isCollateralSeizable={isCollateralSeizable}
                                isCollateralReturnable={isCollateralReturnable}
                                totalAmount={totalAmount}
                                amountRepaid={amountRepaid}
                                amountOutstanding={amountOutstanding}
                                tokenSymbol={tokenSymbol}
                                isRepaid={isRepaid}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
