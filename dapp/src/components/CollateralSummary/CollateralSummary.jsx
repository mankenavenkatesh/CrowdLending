import React, { Component } from "react";

import { dangerClass, successClass } from "../../constants";

export default class CollateralSummary extends Component {
    render() {
        const { isCollateralWithdrawn, isCollateralSeizable, isCollateralReturnable } = this.props;

        return (
            <div>
                <h4>Collateral Summary</h4>

                <table className="table table-bordered table-hover">
                    <tbody>
                    <tr>
                        <th>Withdrawn</th>
                        <td className="check-box-row">
                            <i className={`summary-check fa fa-${isCollateralWithdrawn ? successClass : dangerClass }`}/>
                        </td>
                    </tr>
                    <tr>
                        <th>Seizable</th>
                        <td className="check-box-row">
                            <i className={`summary-check fa fa-${isCollateralSeizable ? successClass : dangerClass }`}/>
                        </td>
                    </tr>
                    <tr>
                        <th>Returnable</th>
                        <td className="check-box-row">
                            <i className={`summary-check fa fa-${isCollateralReturnable ? successClass : dangerClass }`}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
