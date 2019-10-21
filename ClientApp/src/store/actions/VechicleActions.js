import * as constants from '../Constants';

export const addVechicle = (fieldName, fieldValue) => ({
    type: constants.ADD_VECHICLE,
    fieldName,
    fieldValue
});

export const setNewVechicleEditableForm = vechicle => ({
    type: constants.SET_UP_VECHICLE_EDIT_FORM,
    vechicle
});


export const editVechiclePending = () => ({
    type: constants.EDIT_VECHICLE_FORM_PENDING,
});

export const editVechicleSuccess = vechicle => ({
    type: constants.EDIT_FORM_VECHICLE_SUCCESS,
    vechicle
});

export const searchVechiclesList = (results, term) => ({
    type: constants.SEARCH_VECHICLES,
    results,
    term
});

export const vechicleDashboard = (results) => ({
    type: constants.VECHICLE_DASHBOARD,
    results
});

export const getVechicleByID = (vechicle) => ({
    type: constants.GET_VECHICLE_BY_ID,
    vechicle
});