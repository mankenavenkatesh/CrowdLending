import React, { Component } from "react";

import { Button } from "../Button/Button";

export default class Repay extends Component {
    constructor(props) {
        super(props);

        this.handleAllowRepayments = this.handleAllowRepayments.bind(this);
        this.handleMakeRepayment = this.handleMakeRepayment.bind(this);
    }

    async handleAllowRepayments(event) {
        event.preventDefault();

        const { allowRepayments } = this.props;

        await allowRepayments();
    }

    async handleMakeRepayment(event) {
        event.preventDefault();

        const { makeRepayment } = this.props;

        await makeRepayment();
    }

    render() {
        const { isFilled, isRepaid, hasAllowedRepayments, isAwaitingBlockchain } = this.props;

        const disableAllowRepayments = isAwaitingBlockchain || !isFilled || hasAllowedRepayments;
        const disableMakeRepayment = isAwaitingBlockchain || !hasAllowedRepayments || isRepaid;

        return (
            <div className="RepayTutorial container Tutorial" id="fill-loan">
                <header className="App-header">
                    <h3 className="App-title">Make Repayments</h3>
                </header>

                <Button
                    disabled={disableAllowRepayments}
                    label={"Allow Repayments"}
                    onClick={this.handleAllowRepayments}
                />

                <Button disabled={disableMakeRepayment} label={"Make a Repayment"} onClick={this.handleMakeRepayment} />
            </div>
        );
    }
}
