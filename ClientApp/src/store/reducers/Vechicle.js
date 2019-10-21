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
    vechicleSearch: {
        detail: {},
        search: {},
        selected: null
    },
    dashboard: {
        data: null,
        message: null
    }
}

function viewReducer(state = initialState.view, action) {
    switch (action.type) {
        case constants.VIEW_VECHICLE:
            return {
                ...state,
                status: constants.VIEW_VECHICLE,
                data: action.vechicle,
            };
        default:
            return state;
    }
}

function searchVechicleReducer(state = initialState.vechicleSearch, action) {
    switch (action.type) {
        case constants.SEARCH_VECHICLES:
            const detail = {
                ...state.detail
            };
            action.results.forEach((item) => {
                detail[item.id] = item;
            });

            return {
                detail,
                search: {
                    ...state.search,
                    [action.term]: action.results.map((item) => item.id),
                },
            };
        default:
            return state;
    }
}

const dashboardReducer = (state = initialState.dashboard, action) => {
    switch (action.type) {
        case constants.VECHICLE_DASHBOARD:

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
        case constants.GET_VECHICLE_LIST:
        case constants.GET_VECHICLE_BY_ID:
            return {
                ...state,
                data: action.vechicle
            };

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
    vechicleItems: searchVechicleReducer,
    dashboard: dashboardReducer
});

