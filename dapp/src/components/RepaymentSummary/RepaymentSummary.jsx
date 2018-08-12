import React, { Component } from "react";

export default class RepaymentSummary extends Component {
    render() {
        const { totalAmount, amountRepaid, amountOutstanding, tokenSymbol } = this.props;

        return (
            <div>
                <h4>Repayment Summary</h4>

                <table className="table table-bordered table-hover">
                    <tbody>
                    <tr>
                        <th>Principal + Interest</th>
                        <td className="check-box-row">
                            {`${totalAmount} ${tokenSymbol}`}
                        </td>
                    </tr>
                    <tr>
                        <th>Amount Repaid</th>
                        <td className="check-box-row">
                            {`${amountRepaid} ${tokenSymbol}`}
                        </td>
                    </tr>
                    <tr>
                        <th>Amount Outstanding</th>
                        <td className="check-box-row">
                            {`${amountOutstanding} ${tokenSymbol}`}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
