import {
    combineReducers
} from 'redux';
import * as constants from '../Constants';

const initialState = {
    view: {
        status: null,
        data: null
    },
    edit: {
        status: null,
        data: null
    },
    vechicleSearch: {
        detail: {},
        search: {},
        selected: null
    },
    customerSearch: {
        detail: {},
        search: {},
        selected: null
    },
    dashboard: {
        data: null,
        message: null
    }
};


const dashboardReducer = (state = initialState.dashboard, action) => {
    switch (action.type) {
        case constants.ENQUIRY_DASHBOARD:

            return {
                ...state,
                data: action.results
            };
        default:
            return state;
    }
};


const searchCustomerReducer = (state = initialState.customerSearch, action) => {
    switch (action.type) {
        case constants.SEARCH_CUSTOMERS:
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
        case constants.SELECT_CUSTOMER:
            return {
                ...state,
                selected: action.id,
            };
        default:
            return state;
    }
}

const searchVechicleReducer = (state = initialState.vechicleSearch, action) => {
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

const viewReducer = (state = initialState.view, action) => {
    switch (action.type) {
        case constants.VIEW_ENQUIRY:
            return {
                ...state,
                status: constants.VIEW_ENQUIRY,
                data: action.enquiry,
            };
        default:
            return state;
    }
}


const editReducer = (state = initialState.edit, action) => {
    switch (action.type) {
        case constants.MAP_VECHICLES:
            const newMap = {
                ...state.data
            };
            newMap.mapVechicles = action.mapVechicles
            return {
                ...state,
                data: newMap
            };
        case constants.GET_ENQUIRY_BY_ID:
            return {
                ...state,
                data: action.enquiry
            };
        case constants.ADD_ENQUIRY:
            const newEnquiry = {
                ...state.data
            };
            newEnquiry[action.fieldName] = action.fieldValue;
            return {
                ...state,
                data: newEnquiry,
            };
        case constants.ADD_ENQUIRY_SEARCH:
            const newEnqSearch = {
                ...state.data
            };
            if (!newEnqSearch.mapSearch) {
                newEnqSearch.mapSearch = {};
            }
            newEnqSearch.mapSearch[action.fieldName] = action.fieldValue;
            newEnqSearch[action.fieldName] = action.fieldValue;
            return {
                ...state,
                data: newEnqSearch,
            };
        case constants.ADD_ENQUIRY_CUSTOMER:
            const newEnq = {
                ...state.data
            };
            if (!newEnq.customer) {
                newEnq.customer = {};
            }
            newEnq.customer[action.fieldName] = action.fieldValue;
            return {
                ...state,
                data: newEnq,
            };
        case constants.ADD_ENQUIRY_VECHICLE:
            const newEnqV = {
                ...state.data
            };

            newEnqV.enquiryVechicles = [];
            let enqvech = {};
            if (action.enquiryValue) {
                enqvech["enquiryId"] = action.enquiryValue;
            }
            enqvech["vechicleId"] = action.vechicleValue;
            newEnqV.enquiryVechicles.push(enqvech);
            return {
                ...state,
                changed: true,
                data: newEnqV,
            };

        case constants.SET_UP_ENQUIRY_EDIT_FORM:
            return {
                ...state,
                data: action.enquiry,
            };
        case constants.EDIT_ENQUIRY_FORM_PENDING:
            return {
                ...state,
                status: constants.EDIT_ENQUIRY_FORM_PENDING,
            };
        case constants.EDIT_FORM_ENQUIRY_SUCCESS:
            return {
                ...state,
                data: action.enquiry,
                status: constants.EDIT_FORM_ENQUIRY_SUCCESS,
            };
        default:
            return state;
    }
};

export default combineReducers({
    edit: editReducer,
    view: viewReducer,
    vechicleItems: searchVechicleReducer,
    items: searchCustomerReducer,
    dashboard: dashboardReducer
});