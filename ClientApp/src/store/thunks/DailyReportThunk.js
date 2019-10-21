import {
    getDailyReportEdit
} from '../Selectors';
import {
    setNewDailyReportEditableForm,
    getDailyReportByID,
    editDailyReportPending,
    editDailyReportSuccess,
    dailyReportDashboard
} from '../actions/DailyReportActions';
import options from '../../components/constants/InfoVia';
import axios from 'axios';
import * as api from '../EndPoint';
import filter from 'lodash/filter';

export function setupDailyReport(id) {
    return function _resetDailyReport(dispatch, getState) {
        if (id) {
            getDailyStatusReportById(id, dispatch);
        }
        else {
            dispatch(setNewDailyReportEditableForm(null));
        }
    }
}

const getDailyStatusReportById = (id, dispatch) => {
    const endPoint = api.API_CONSTANT_MAP.GetDailyReportById;
    axios.get(`${endPoint}?Id=${id}`)
        .then(res => {
            let rep = res.data;
            rep.newReport = true;
            rep.isEdit = true;
            rep.createdDate = new Date(rep.createdDate).toLocaleDateString().split(/\//).reverse().join('-');
            dispatch(getDailyReportByID(rep));
        })
        .catch((error) => {
            console.warn(error);
        });
}

export function saveDailyReport() {
    return function _saveDailyReport(dispatch, getState) {
        dispatch(editDailyReportPending());
        const rep = getDailyReportEdit(getState());
        AddUpdateDailyReport(rep, dispatch);
    }
}
const AddUpdateDailyReport = (report, dispatch) => {
    const endPoint = api.API_CONSTANT_MAP.PostPutDailyReport;
    const body = JSON.stringify(report);

    axios({
        "method": "POST",
        "url": endPoint,
        "data": body,
        "headers": {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => {
            console.log(response);
            dispatch(editDailyReportSuccess(response.data));
        })
        .catch((error) => {
            console.warn(error);
        });
}

export const getDailyReportDashboard = () => dispatch => {
    const endPoint = api.API_CONSTANT_MAP.DailyReportDashboard;
    axios.get(endPoint)
        .then(res => {
            let dailyReports = res.data;
            dailyReports = dailyReports.map(j => {
                j.InfoVia = filter(options, (item) => { if (item.value === j.infoVia) return item; })[0].label;
                j.createdDate = new Date(j.createdDate).toLocaleDateString().split(/\//).reverse().join('-');
                return j;
            });
            dispatch(dailyReportDashboard(dailyReports));
        })
        .catch((error) => {
            console.warn(error);
        });

};