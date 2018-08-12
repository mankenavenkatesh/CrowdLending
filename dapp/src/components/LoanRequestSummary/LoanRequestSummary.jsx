import React, { Component } from "react";

import "./LoanRequestSummary.css";

import { dangerClass, successClass } from "../../constants";

export default class LoanRequestSummary extends Component {
    render() {
        const { isFilled, isCreated } = this.props;

        return (
            <div>
                <h4>Loan Request Summary</h4>

                <table className="table table-bordered table-hover">
                    <tbody>
                    <tr>
                        <th>Created</th>
                        <td className="check-box-row">
                            <i className={`summary-check fa fa-${isCreated ? successClass : dangerClass }`}/>
                        </td>
                    </tr>
                    <tr>
                        <th>Filled</th>
                        <td className="check-box-row">
                            <i className={`summary-check fa fa-${isFilled ? successClass : dangerClass}`}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
