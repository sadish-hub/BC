import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLandmark } from '@fortawesome/free-solid-svg-icons'
import filter from 'lodash/filter';

const BankDetail = ({ addCustomerVechicle, customerEdit }) => {
    let customerVechicleEdit = customerEdit && customerEdit.customerVechicles ? filter(customerEdit.customerVechicles, (item) => { if (item.id === (customerEdit.selectedVechicleNumber || item.id)) return item; })[0] : {};
    return (
        <div>
            <h5 className="text-info">Loan Details <FontAwesomeIcon icon={faLandmark} /></h5>
            <TextInput
                handleChange={(newValue) => addCustomerVechicle('bank', newValue)}
                title="Bank"
                value={customerVechicleEdit.bank? customerVechicleEdit.bank : ''}
                id="bank"
            />
            <TextInput
                handleChange={(newValue) => addCustomerVechicle('loanAmount', newValue)}
                title="Loan amount"
                value={customerVechicleEdit.loanAmount}
                id="loanAmount"
                type="number"
            />
            <TextInput
                handleChange={(newValue) => addCustomerVechicle('bankAccNo', newValue)}
                title="Account no."
                value={customerVechicleEdit.bankAccNo}
                id="bankAccNo"
                type="number"
            />
            <TextInput
                handleChange={(newValue) => addCustomerVechicle('tenor', newValue)}
                title="Tenor"
                value={customerVechicleEdit.tenor}
                id="tenor"
                type="number"
            />
            <TextInput
                handleChange={(newValue) => addCustomerVechicle('emi', newValue)}
                title="EMI"
                value={customerVechicleEdit.emi}
                id="emi"
                type="number"
            />
            <TextInput
                handleChange={(newValue) => addCustomerVechicle('emiDate', newValue)}
                title="EMI date"
                value={customerVechicleEdit.emiDate}
                id="emiDate"
                type="date"
            />
        </div>
    );
}
BankDetail.propTypes = {
    addCustomerVechicle: PropTypes.func.isRequired,
    customerEdit: PropTypes.shape({
        customerVechicles: PropTypes.array
    })
};
export default BankDetail;