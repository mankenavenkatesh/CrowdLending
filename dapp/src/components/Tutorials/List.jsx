import React, { Component } from "react";
import Popup from "reactjs-popup";
import RequestLoanFormInput from "../RequestLoanForm/Input/RequestLoanFormInput";
import RequestLoanFormSubmit from "../RequestLoanForm/Submit/RequestLoanFormSubmit";

// Constants
import { creditorAddress, debtorAddress } from "../../constants";
// import Modal, {closeStyle} from 'simple-react-modal'

export default class List extends Component {

    constructor(){
        super()
        
        this.state = {
            lentamount: 0,
            lenderAddress: null,  
            lenders : []          
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
    show(){
        this.setState({show: true})
      }
     
      close(){
        this.setState({show: false})
      }
 
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        // await this.props.createLoanRequest(this.state);
        this.setState();
    }

      
    render() {
        const { listLoanRequest, isAwaitingBlockchain, isCreated } = this.props;
        const { lentamount, lenderAddress } = this.state;
    
        const isDisabled = isAwaitingBlockchain || isCreated;

        return (
            <div>
                <h2>Loan Requests</h2>
                <table className="table table-bordered table-hover">
                    <tbody>
                    <tr>
                        <th>Debitor</th>                        
                        <td>Principal</td>
                        <td>Interest</td>
                        <td>Duration</td>
                        <td>Current Status</td>
                    </tr>      
                    <tr>
                        <th>debtorAddress</th>
                        <td>100</td>
                        <td>10%</td>
                        <td>2 months</td>                        
                        <td>    
                            <Popup trigger={<button> Lend Money</button>} position="right center">
                                <div>
                                <form className="request-form" onSubmit={this.handleSubmit}>
                                    <RequestLoanFormInput
                                        label="Lending Amount (WETH)"
                                        name="lentamount"
                                        value={lentamount}                                        
                                        handleInputChange={this.handleInputChange}
                                    />
                                     <RequestLoanFormInput
                                        label="Lender Address"
                                        name="lenderAddress"
                                        value={lenderAddress}                                        
                                        handleInputChange={this.handleInputChange}
                                    />
                                    <RequestLoanFormSubmit />
                                </form>
                                </div>
                            </Popup>
                        </td>                                                
                    </tr>  
                    {/* <h5>Lenders</h5> */}
                    <tr>                    
                        <table className="table table-bordered table-hover">
                            <tbody>
                            <tr>
                                <th>Lender</th>                        
                                <td>Lent Amount</td>
                                <td>Interest</td>
                                <td>Will Receive</td>                        
                            </tr>      
                            <tr>
                                <th>creditorAddress1</th>
                                <td>100 Weth</td>
                                <td>10% Weth</td>
                                <td>110 Weth</td>                                                                                             
                            </tr>    
                            <tr>
                                <th>creditorAddress2</th>
                                <td>200 Weth</td>
                                <td>10% Weth</td>
                                <td>220 Weth</td>                                                                                             
                            </tr>                  
                            </tbody>
                        </table>                        
                    </tr>  

                    </tbody>
                </table>                        
            </div>
        );
    }
}
