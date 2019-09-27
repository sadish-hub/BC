import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import Search from './Search';
import CustomerIdentityDetail from './CustomerIdentityDetail';


const CustomerBasicDetail = ({ addCustomer, customerEdit, items, fetchItems, handleCustomerBasicSelectChange, onCustomerBasicAdd }) => {
    return (
        <div>
            {!(customerEdit && customerEdit.newCustomer) ?
                <div>
                    <Search items={items} fetchItems={fetchItems} title="Name" id="customerName" labelKey="name" selectItem={handleCustomerBasicSelectChange} placeholder="Search for a Customer.." minLength={3} />
                    {(customerEdit && customerEdit.id) ? <CustomerIdentityDetail items={items} /> : null}
                    <div className="row">
                        <div className="col-sm-5 viewcustomer">
                            <p className="text-secondary">If customer not found, click Add to add a new customer</p>
                        </div>
                        <div className="col-sm-4 viewcustomer">
                            <button onClick={onCustomerBasicAdd} className="btn btn-dark">Add</button>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <TextInput
                        handleChange={(newValue) => addCustomer('name', newValue)}
                        title="Name"
                        value={customerEdit ? customerEdit.name || '' : ''}
                        id="name"
                    />
                    <TextAreaInput
                        handleChange={(newValue) => addCustomer('address', newValue)}
                        title="Address"
                        value={customerEdit ? customerEdit.address || '' : ''}
                        id="address"
                    />
                    <TextInput
                        handleChange={(newValue) => addCustomer('landlineNumber', newValue)}
                        title="Landline no."
                        value={customerEdit ? customerEdit.landlineNumber || '' : ''}
                        id="landlineNumber"
                        type="number"
                    />
                    <TextInput
                        handleChange={(newValue) => addCustomer('mobileNumber', newValue)}
                        title="Mobile no."
                        value={customerEdit ? customerEdit.mobileNumber || '' : ''}
                        id="mobileNumber"
                        type="number"
                    />
                    <TextInput
                        handleChange={(newValue) => addCustomer('emailId', newValue)}
                        title="Email"
                        value={customerEdit ? customerEdit.emailId || '' : ''}
                        id="emailId"
                        type="email"
                    />
                </div>
            }
        </div>
    );
}

CustomerBasicDetail.propTypes = {
    addCustomer: PropTypes.func.isRequired,
    customerEdit: PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
        landlineNumber: PropTypes.string,
        mobileNumber: PropTypes.string,
        emailId: PropTypes.string
    })
};
export default CustomerBasicDetail;