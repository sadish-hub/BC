import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';

const OfficeDetail = ({ addCustomer, customerEdit }) => (
    <div>
        <TextInput
            handleChange={(newValue) => addCustomer('officeName', newValue)}
            title="Office Name"
            value={customerEdit ? customerEdit.officeName  || '': ''}
            id="officeName"
        />
        <TextAreaInput
            handleChange={(newValue) => addCustomer('officeAddress', newValue)}
            title="Office Address"
            value={customerEdit ? customerEdit.officeAddress  || '': ''}
            id="officeAddress"
        />
        <TextInput
            handleChange={(newValue) => addCustomer('officeLandline', newValue)}
            title="Office Landline no."
            value={customerEdit ? customerEdit.officeLandline  || '': ''}
            id="officeLandline"
            type="number"
        />
        <TextInput
            handleChange={(newValue) => addCustomer('officeEmail', newValue)}
            title="Office Email"
            value={customerEdit ? customerEdit.officeEmail  || '': ''}
            id="officeEmail"
            type="email"
        />
    </div>
);

OfficeDetail.propTypes = {
    addCustomer: PropTypes.func.isRequired,
    customerEdit: PropTypes.shape({
        officeName: PropTypes.string,
        officeAddress: PropTypes.string,
        officeLandline: PropTypes.string,
        officeEmail: PropTypes.string
    })
};

export default OfficeDetail;