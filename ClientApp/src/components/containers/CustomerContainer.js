import { connect } from 'react-redux';
import Customer from '../Customer';
import { getCustomerView, getCustomerEdit, getHasCustomerChanged, getCustomers, getVechicles } from "../../store/Selectors";
import { setupCustomer, getSelectedCustomerList, saveCustomer, getCustomerList, searchCustomers, selectCustomer, searchVechicles } from '../../store/thunks/CustomerThunk';
import { addCustomer, addCustomerVechicle } from '../../store/actions/CustomerActions';

const mapStateToProps = state => ({
    customerView: getCustomerView(state),
    customerEdit: getCustomerEdit(state),
    hasCustomerChanged: getHasCustomerChanged(state),
    items: getCustomers(state),
    vechicleItems: getVechicles(state)
});

const mapDispatchToProps = dispatch => ({
    addCustomer: (fieldName, fieldValue) => dispatch(addCustomer(fieldName, fieldValue)),
    addCustomerVechicle: (fieldName, fieldValue) => dispatch(addCustomerVechicle(fieldName, fieldValue)),
    discardCustomerChanges: () => dispatch(setupCustomer()),
    saveCustomerChanges: () => dispatch(saveCustomer()),
    setUpCustomerEditableForm: (id = null) => dispatch(setupCustomer(id)),
    getSelectedCustomerById: (customer) => dispatch(getSelectedCustomerList(customer)),
    getCustomerList: () => dispatch(getCustomerList()),
    fetchItems: value => dispatch(searchCustomers(value)),
    selectItem: ([item]) => dispatch(selectCustomer(item && item.id)),
    fetchVechicleItems: value => dispatch(searchVechicles(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
