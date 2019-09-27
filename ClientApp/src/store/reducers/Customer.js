import {
    combineReducers
} from 'redux';
import * as constants from '../Constants';
import findIndex from 'lodash/findIndex';

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
    customerSearch: {
        detail: {},
        search: {},
        selected: null
    },
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
        case constants.VIEW_CUSTOMER:
            return {
                ...state,
                status: constants.VIEW_CUSTOMER,
                data: action.customer,
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

function searchCustomerReducer(state = initialState.customerSearch, action) {
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

const dashboardReducer = (state = initialState.dashboard, action) => {
    switch (action.type) {
        case constants.CUSTOMER_DASHBOARD:

            return {
                ...state,
                data: action.results
            };
        case constants.SEND_CUSTOMER_MESSAGE:
            const newMessage = {
                ...state.message
            };
            newMessage[action.fieldName] = action.fieldValue;
            return {
                ...state,
                message: newMessage,
            };

        default:
            return state;
    }
};

function editReducer(state = initialState.edit, action) {
    switch (action.type) {
        case constants.GET_CUSTOMER_LIST:
        case constants.GET_CUSTOMER_BY_ID:
            return {
                ...state,
                data: action.customer
            };

        case constants.ADD_CUSTOMER:
            const newCustomer = {
                ...state.data
            };
            newCustomer[action.fieldName] = action.fieldValue;
            return {
                ...state,
                changed: true,
                data: newCustomer,
            };
        case constants.ADD_CUSTOMER_VECHICLE:
            const newCust = {
                ...state.data
            };
            if (!newCust.customerVechicles) {
                newCust.customerVechicles = [];
            }
            let custvech = {};
            custvech[action.fieldName] = action.fieldValue;
            if (newCust.customerVechicles.length > 0) {
                if (newCust.selectedVechicleNumber) {
                    let selectedIndex = findIndex(newCust.customerVechicles,
                        (item) => { if (item.id === newCust.selectedVechicleNumber) return item; });
                    newCust.customerVechicles[selectedIndex][action.fieldName] = action.fieldValue;
                }
                else {
                    newCust.customerVechicles[0][action.fieldName] = action.fieldValue;
                }
            } else {
                newCust.customerVechicles.push(custvech);
            }

            return {
                ...state,
                changed: true,
                data: newCust,
            };
        case constants.SET_UP_CUTOMER_EDIT_FORM:
            return {
                ...state,
                changed: false,
                data: action.customer,
            };
        case constants.EDIT_CUSTOMER_FORM_PENDING:
            return {
                ...state,
                status: constants.EDIT_CUSTOMER_FORM_PENDING,
            };
        case constants.EDIT_FORM_CUSTOMER_SUCCESS:
            return {
                ...state,
                changed: false,
                data: action.customer,
                status: constants.EDIT_FORM_CUSTOMER_SUCCESS,
            };
        default:
            return state;
    }
}

export default combineReducers({
    view: viewReducer,
    edit: editReducer,
    items: searchCustomerReducer,
    vechicleItems: searchVechicleReducer,
    dashboard: dashboardReducer
});
