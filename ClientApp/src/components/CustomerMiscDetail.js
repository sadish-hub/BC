import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import { Typeahead } from 'react-bootstrap-typeahead';
import religionOptions from './constants/CustomerReligion';
import nativeOptions from './constants/CustomerNative';
import filter from 'lodash/filter';


const CustomerMiscDetail = ({ addCustomer, customerEdit }) => {

    const handleSelectChange = (selectedOption, addCustomer, property) => {
        if (selectedOption && selectedOption.length > 0) {
            addCustomer(property, selectedOption[0].value);
        }
    };

    let cusReligion = customerEdit && customerEdit.religion ? filter(religionOptions, (item) => { if (item.value === customerEdit.religion) return item; }) : [];
    let cusNative = customerEdit && customerEdit.native ? filter(nativeOptions, (item) => { if (item.value === customerEdit.native) return item; }) : [];
    return (
        <div>
            <TextInput
                handleChange={(newValue) => addCustomer('dob', newValue)}
                title="DOB"
                value={customerEdit ? customerEdit.dob  || '': ''}
                id="dob"
                type="date"
            />
            <TextInput
                handleChange={(newValue) => addCustomer('weddingAnniversary', newValue)}
                title="Wedding Anniversary"
                value={customerEdit ? customerEdit.weddingAnniversary  || '': ''}
                id="weddingAnniversary"
                type="date"
            />
            <div className="form-group">
                <label htmlFor="customerReligion">Religion</label>
                <Typeahead
                    id="customerReligion"
                    labelKey="label"
                    options={religionOptions}
                    placeholder="Choose a religion..."
                    selected= {cusReligion}
                    onChange={value => handleSelectChange(value, addCustomer, "religion")}
                />
            </div>
            <div className="form-group">
                <label htmlFor="customerNative">Native</label>
                <Typeahead
                    id="customerNative"
                    labelKey="label"
                    options={nativeOptions}
                    placeholder="Choose a native..."
                    selected= {cusNative}
                    onChange={value => handleSelectChange(value, addCustomer, "native")}
                />
            </div>
        </div>
    );
}

CustomerMiscDetail.propTypes = {
    addCustomer: PropTypes.func.isRequired,
    customerEdit: PropTypes.shape({
        dob: PropTypes.string,
        weddingAnniversary: PropTypes.string,
        festivals: PropTypes.string,
        general: PropTypes.string
    })
};
export default CustomerMiscDetail;