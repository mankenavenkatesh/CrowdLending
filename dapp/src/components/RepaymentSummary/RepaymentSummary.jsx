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
                        <th>Creditor Address</th>
                        <th>Lent Amount</th>
                        <th>Amount Repaid</th>                                                
                    </tr>
                    <tr>
                    <td className="check-box-row">
                            Creditor Address 1
                        </td>
                        <td className="check-box-row">
                            100
                        </td>

                        <td className="check-box-row">
                            110
                        </td>
                    </tr>
                    <tr>
                    <td className="check-box-row">
                            Creditor Address 2
                        </td>
                        <td className="check-box-row">
                            200
                        </td>

                        <td className="check-box-row">
                            220
                        </td>
                    </tr>
                    </tbody>
                </table>

                {/* <table className="table table-bordered table-hover">
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
                </table> */}
            </div>
        );
    }
}
