import * as constants from '../Constants';

export const addCustomer = (fieldName, fieldValue) => ({
    type: constants.ADD_CUSTOMER,
    fieldName,
    fieldValue
});

export const addCustomerVechicle = (fieldName, fieldValue) => ({
    type: constants.ADD_CUSTOMER_VECHICLE,
    fieldName,
    fieldValue
});

export const addCustomerMessage = (fieldName, fieldValue) => ({
    type: constants.SEND_CUSTOMER_MESSAGE,
    fieldName,
    fieldValue
});

export const getCustomer = customer => ({
    type: constants.GET_CUSTOMER_LIST,
    customer
});

export const setNewCustomerEditableForm = customer => ({
    type: constants.SET_UP_CUTOMER_EDIT_FORM,
    customer
});

export const editCustomerPending = () => ({
    type: constants.EDIT_CUSTOMER_FORM_PENDING,
});

export const editCustomerSuccess = customer => ({
    type: constants.EDIT_FORM_CUSTOMER_SUCCESS,
    customer
});

export const searchCustomersList = (results, term) => ({
    type: constants.SEARCH_CUSTOMERS,
    results,
    term
});

export const selectCustomerList = (id = null) => ({
    type: constants.SELECT_CUSTOMER,
    id
});

export const searchVechiclesList = (results, term) => ({
    type: constants.SEARCH_VECHICLENUMBERS,
    results,
    term
});

export const customerDashboard = (results) => ({
    type: constants.CUSTOMER_DASHBOARD,
    results
});

export const getCustomerByID = (customer) => ({
    type: constants.GET_CUSTOMER_BY_ID,
    customer
});