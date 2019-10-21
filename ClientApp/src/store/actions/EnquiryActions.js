import * as constants from '../Constants';

export const addEnquiry = (fieldName, fieldValue) => ({
    type: constants.ADD_ENQUIRY,
    fieldName,
    fieldValue
});

export const addEnquiryCustomer = (fieldName, fieldValue) => ({
    type: constants.ADD_ENQUIRY_CUSTOMER,
    fieldName,
    fieldValue
});

export const addEnquirySearch = (fieldName, fieldValue) => ({
    type: constants.ADD_ENQUIRY_SEARCH,
    fieldName,
    fieldValue
});

export const addEnquiryVechicle = (enquiryValue, vechicleValue) => ({
    type: constants.ADD_ENQUIRY_VECHICLE,
    enquiryValue,
    vechicleValue
});

export const setNewEnquiryEditableForm = enquiry => ({
    type: constants.SET_UP_ENQUIRY_EDIT_FORM,
    enquiry
});

export const getEnquiryByID = (enquiry) => ({
    type: constants.GET_ENQUIRY_BY_ID,
    enquiry
});

export const editEnquiryPending = () => ({
    type: constants.EDIT_ENQUIRY_FORM_PENDING,
});

export const editEnquirySuccess = enquiry => ({
    type: constants.EDIT_FORM_ENQUIRY_SUCCESS,
    enquiry
});

export const searchVechiclesList = (results, term) => ({
    type: constants.SEARCH_VECHICLES,
    results,
    term
});

export const mapVechiclesList = (mapVechicles) => ({
    type: constants.MAP_VECHICLES,
    mapVechicles
});

export const selectCustomerList = (id = null) => ({
    type: constants.SELECT_CUSTOMER,
    id
});

export const searchCustomersList = (results, term) => ({
    type: constants.SEARCH_CUSTOMERS,
    results,
    term
});

export const enquiryDashboard = (results) => ({
    type: constants.ENQUIRY_DASHBOARD,
    results
});