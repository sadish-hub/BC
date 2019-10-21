import { combineReducers } from 'redux';
import * as constants from '../Constants';

const initialState = {
    edit: {
        status: null,
        data: null
    },
    dashboard: {
        data: null,
        message: null
    }
}

const dashboardReducer = (state = initialState.dashboard, action) => {
    switch (action.type) {
        case constants.VARIANT_DASHBOARD:

            return {
                ...state,
                data: action.results
            };
        default:
            return state;
    }
};

function editReducer(state = initialState.edit, action) {
    switch (action.type) {
        case constants.GET_VARIANT_BY_ID:
            return {
                ...state,
                data: action.variant
            };
        case constants.ADD_VARIANT:
            const newVariant = { ...state.data };
            newVariant[action.fieldName] = action.fieldValue;
            return {
                ...state,
                data: newVariant,
            };
        case constants.SET_UP_VARIANT_EDIT_FORM:
            return {
                ...state,
                data: action.variant,
            };
        case constants.EDIT_VARIANT_FORM_PENDING:
            return {
                ...state,
                status: constants.EDIT_VARIANT_FORM_PENDING,
            };
        case constants.EDIT_FORM_VARIANT_SUCCESS:
            return {
                ...state,
                data: action.variant,
                status: constants.EDIT_FORM_VARIANT_SUCCESS,
            };
        default:
            return state;
    }
}

export default combineReducers({
    edit: editReducer,
    dashboard: dashboardReducer
});

