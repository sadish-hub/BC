import {
    getEnquiryEdit,
    getEnquiryView
} from '../Selectors';
import {
    setNewEnquiryEditableForm,
    getEnquiryByID,
    editEnquiryPending,
    editEnquirySuccess,
    searchVechiclesList,
    searchCustomersList,
    selectCustomerList,
    enquiryDashboard
} from '../actions/EnquiryActions';
import options from '../../components/constants/LeadType';
import sourcingOptions from '../../components/constants/SourcingPoint';
import statusOptions from '../../components/constants/EnquiryStatus';
import callStatusOptions from '../../components/constants/CallStatus';
import axios from 'axios';
import * as api from '../EndPoint';
import filter from 'lodash/filter';

export function setupEnquiry(id) {
    return function _resetEnquiry(dispatch, getState) {
        if (id) {
            getEnquiryById(id, dispatch);
        }
        else {
            const enq = getEnquiryView(getState());
            dispatch(setNewEnquiryEditableForm(enq));
        }
    }
}

const getEnquiryById = (id, dispatch) => {
    const endPoint = api.API_CONSTANT_MAP.GetEnquiryById;
    axios.get(`${endPoint}?Id=${id}`)
        .then(res => {
            let enq = res.data;
            enq.customer.newCustomer = true;
            enq.isEdit = true;
            enq.nextFollowUp = enq.nextFollowUp ? new Date(enq.nextFollowUp).toLocaleDateString().split(/\//).reverse().join('-') : enq.nextFollowUp;
            dispatch(getEnquiryByID(enq));
        })
        .catch((error) => {
            console.warn(error);
        });
}

export function saveEnquiry() {
    return function _saveEnquiry(dispatch, getState) {
        dispatch(editEnquiryPending());
        const enq = getEnquiryEdit(getState());
        AddUpdateEnquiry(enq, dispatch);
    }
}

const AddUpdateEnquiry = (enquiry, dispatch) => {
    const endPoint = api.API_CONSTANT_MAP.PostPutEnquiry;
    if (enquiry && enquiry.customerId) {
        delete enquiry.customer;
    }
    const body = JSON.stringify(enquiry);

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
            dispatch(editEnquirySuccess(response.data));
        })
        .catch((error) => {
            console.warn(error);
        });
}

export const searchVechicles = term => async dispatch => {
    const endPoint = api.API_CONSTANT_MAP.GetVechicle;
    let res = await axios.get(`${endPoint}?make=${term}`);
    dispatch(searchVechiclesList((res && res.data) || [], term));
};


export const searchCustomers = term => async dispatch => {
    const endPoint = api.API_CONSTANT_MAP.GetLeads;
    let res = await axios.get(`${endPoint}?name=${term}`);
    dispatch(searchCustomersList((res && res.data) || [], term));
};

export const getEnquiryDashboard = () => dispatch => {
    const endPoint = api.API_CONSTANT_MAP.EnquiryDashboard;
    axios.get(endPoint)
        .then(res => {
            let enquiries = res.data;
            enquiries = enquiries.map(j => {
                let e = j.vechicle;
                j.vechicleDetail = `${e.make} ${e.model} ${e.variant} ${e.year}`;
                j.custId = `${j.customer.acFormat}-${j.customer.acNo}`
                j.status = filter(statusOptions, (item) => { if (item.value === j.status) return item; })[0].label;
                j.leadType = filter(options, (item) => { if (item.value === j.leadType) return item; })[0].label;
                j.nextFollowUp = j.nextFollowUp ? new Date(j.nextFollowUp).toLocaleDateString().split(/\//).reverse().join('-') : j.nextFollowUp;
                return j;
            });
            dispatch(enquiryDashboard(enquiries));
        })
        .catch((error) => {
            console.warn(error);
        });

};

export const selectCustomer = (id = null) => dispatch => dispatch(selectCustomerList(id));