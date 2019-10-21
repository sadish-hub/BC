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
        case constants.DAILY_REPORT_DASHBOARD:

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
        case constants.GET_DAILY_REPORT_BY_ID:
            return {
                ...state,
                data: action.dailyReport
            };

        case constants.ADD_DAILY_REPORT:
            const newReport = { ...state.data };
            newReport[action.fieldName] = action.fieldValue;
            return {
                ...state,
                data: newReport,
            };
        case constants.SET_UP_DAILY_REPORT_EDIT_FORM:
            return {
                ...state,
                data: action.dailyReport,
            };
        case constants.EDIT_DAILY_REPORT_FORM_PENDING:
            return {
                ...state,
                status: constants.EDIT_DAILY_REPORT_FORM_PENDING,
            };
        case constants.EDIT_FORM_DAILY_REPORT_SUCCESS:
            return {
                ...state,
                data: action.dailyReport,
                status: constants.EDIT_FORM_DAILY_REPORT_SUCCESS,
            };
        default:
            return state;
    }
}

export default combineReducers({
    edit: editReducer,
    dashboard: dashboardReducer
});

