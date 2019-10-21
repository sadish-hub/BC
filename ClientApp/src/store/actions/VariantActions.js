import * as constants from '../Constants';

export const addVariant = (fieldName, fieldValue) => ({
    type: constants.ADD_VARIANT,
    fieldName,
    fieldValue
});

export const setNewVariantEditableForm = variant => ({
    type: constants.SET_UP_VARIANT_EDIT_FORM,
    variant
});

export const getVariantByID = (variant) => ({
    type: constants.GET_VARIANT_BY_ID,
    variant
});

export const editVariantPending = () => ({
    type: constants.EDIT_VARIANT_FORM_PENDING,
});

export const editVariantSuccess = variant => ({
    type: constants.EDIT_FORM_VARIANT_SUCCESS,
    variant
});

export const variantDashboard = (results) => ({
    type: constants.VARIANT_DASHBOARD,
    results
});