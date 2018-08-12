import React, { Component } from "react";
import Balances from "../Balances/Balances";
import LoanRequestSummary from "../LoanRequestSummary/LoanRequestSummary";
import RepaymentSummary from "../RepaymentSummary/RepaymentSummary";
import CollateralSummary from "../CollateralSummary/CollateralSummary"

import "./TutorialStatus.css";

export default class TutorialStatus extends Component {
    render() {
        const {
            balances,
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
            tokenSymbol
        } = this.props;

        return (
            <div className="TutorialStatus">
                <Balances balances={balances} />
                <LoanRequestSummary
                    isCreated={isCreated}
                    isFilled={isFilled}
                />
                <RepaymentSummary
                    totalAmount={totalAmount}
                    amountRepaid={amountRepaid}
                    amountOutstanding={amountOutstanding}
                    tokenSymbol={tokenSymbol}
                />
                <CollateralSummary
                    isCollateralWithdrawn={isCollateralWithdrawn}
                    isCollateralSeizable={isCollateralSeizable}
                    isCollateralReturnable={isCollateralReturnable}
                />
            </div>
        );
    }
}
