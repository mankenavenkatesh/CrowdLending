import React, { Component } from "react";
import Create from "./Create";
import Fill from "./Fill";
import Repay from "./Repay";
import Collateral from "./Collateral";

import "./Tutorials.css";

export default class Tutorials extends Component {
    render() {
        const {
            // networking
            isAwaitingBlockchain,
            // create
            createLoanRequest,
            isCreated,
            // fill
            allowPrincipalTransfer,
            hasAllowedPrincipalTransfer,
            fillLoanRequest,
            isFilled,
            // repayment
            hasAllowedRepayments,
            allowRepayments,
            makeRepayment,
            isRepaid,
            // collateral
            returnCollateral,
            isCollateralReturnable,
        } = this.props;

        return (
            <div>
                <Create
                    createLoanRequest={createLoanRequest}
                    isCreated={isCreated}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
                <Fill
                    allowPrincipalTransfer={allowPrincipalTransfer}
                    hasAllowedPrincipalTransfer={hasAllowedPrincipalTransfer}
                    fillLoanRequest={fillLoanRequest}
                    isFilled={isFilled}
                    isCreated={isCreated}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
                <Repay
                    makeRepayment={makeRepayment}
                    allowRepayments={allowRepayments}
                    hasAllowedRepayments={hasAllowedRepayments}
                    isFilled={isFilled}
                    isRepaid={isRepaid}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
                <Collateral
                    returnCollateral={returnCollateral}
                    isCollateralReturnable={isCollateralReturnable}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
            </div>
        );
    }
}
