import { combineReducers } from 'redux';
import * as constants from '../Constants';

const initialState = {
    view: {
        status: null,
        data: null
    },
    edit: {
        status: null,
        data: null,
        changed: null,
    },
    detail: {},
    search: {},
    selected: null,
}

function viewReducer(state = initialState.view, action) {
    switch (action.type) {
        case constants.EDIT_FORM_VECHICLE_SUCCESS:
            return {
                ...state,
                status: constants.EDIT_FORM_VECHICLE_SUCCESS,
                data: action.vechicle,
            };
        default:
            return state;
    }
}


function editReducer(state = initialState.edit, action) {
    switch (action.type) {
        case constants.ADD_VECHICLE:
            const newVechicle = { ...state.data };
            newVechicle[action.fieldName] = action.fieldValue;
            console.log(action.fieldName);
            console.log(newVechicle[action.fieldName]);
            return {
                ...state,
                changed: true,
                data: newVechicle,
            };
        case constants.SET_UP_VECHICLE_EDIT_FORM:
            return {
                ...state,
                changed: false,
                data: action.vechicle,
            };
        case constants.EDIT_VECHICLE_FORM_PENDING:
            return {
                ...state,
                status: constants.EDIT_VECHICLE_FORM_PENDING,
            };
        case constants.EDIT_FORM_VECHICLE_SUCCESS:
            return {
                ...state,
                changed: false,
                data: action.vechicle,
                status: constants.EDIT_FORM_VECHICLE_SUCCESS,
            };
        default:
            return state;
    }
}

export default combineReducers({
    view: viewReducer,
    edit: editReducer,
});

