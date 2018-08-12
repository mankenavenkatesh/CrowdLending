import React, { Component } from "react";

import "./Balances.css";

export default class Balances extends Component {
    render() {
        const {
            debtorREP,
            debtorWETH,
            creditorREP,
            creditorWETH,
            collateralizerREP,
            collateralizerWETH
        } = this.props.balances;

        return (
            <div className="Balances">
                <h4>Balances</h4>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>WETH</th>
                            <th>REP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Borrower</th>
                            <td>{debtorWETH}</td>
                            <td>{debtorREP}</td>
                        </tr>
                        <tr>
                            <th>Lender</th>
                            <td>{creditorWETH}</td>
                            <td>{creditorREP}</td>
                        </tr>
                        <tr>
                            <th>Collateral Smart Contract</th>
                            <td>{collateralizerWETH}</td>
                            <td>{collateralizerREP}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
