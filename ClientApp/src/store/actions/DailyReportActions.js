import * as constants from '../Constants';

export const addDailyReport = (fieldName, fieldValue) => ({
    type: constants.ADD_DAILY_REPORT,
    fieldName,
    fieldValue
});

export const setNewDailyReportEditableForm = dailyReport => ({
    type: constants.SET_UP_DAILY_REPORT_EDIT_FORM,
    dailyReport
});

export const getDailyReportByID = (dailyReport) => ({
    type: constants.GET_DAILY_REPORT_BY_ID,
    dailyReport
});

export const editDailyReportPending = () => ({
    type: constants.EDIT_DAILY_REPORT_FORM_PENDING,
});

export const editDailyReportSuccess = dailyReport => ({
    type: constants.EDIT_FORM_DAILY_REPORT_SUCCESS,
    dailyReport
});

export const dailyReportDashboard = (results) => ({
    type: constants.DAILY_REPORT_DASHBOARD,
    results
});