import {
  getCustomerEdit,
  getCustomerView,
  getCustomerMessageData
} from '../Selectors';
import {
  editCustomerSuccess,
  editCustomerPending,
  setNewCustomerEditableForm,
  getCustomer,
  searchCustomersList,
  selectCustomerList,
  searchVechiclesList,
  customerDashboard,
  getCustomerByID
} from '../actions/CustomerActions';
import axios from 'axios';
import * as api from '../EndPoint';
import filter from 'lodash/filter';
import religionOptions from '../../components/constants/CustomerReligion';
import nativeOptions from '../../components/constants/CustomerNative';

export function setupCustomer(id) {
  return function _resetCustomer(dispatch, getState) {
    if (id) {
      getCustomerById(id, dispatch);
    }
    else {
      const customer = getCustomerView(getState());
      dispatch(setNewCustomerEditableForm(customer));
    }
  }
}

export function getSelectedCustomerList(customer){
  return function _getSelectedCustomer(dispatch, getState){
    const cust = getCustomerEdit(getState());
    customer.selectedVechicleNumber = cust.selectedVechicleNumber || "";
    dispatch(getCustomerByID(customer));
  }
}

export function getCustomerList(str) {
  return function _getCustomer(dispatch, getState) {
    const customer = getCustomerEdit(getState());
    GetCustomerList(customer, str, dispatch);
  }
}

function GetCustomerList(customer, str, dispatch) {
  const endPoint = api.API_CONSTANT_MAP.GetCustomer;
  axios.get(`${endPoint}?name=${str}`)
    .then(res => {
      customer.customerList = res.data.map(cus => ({
        value: cus.id,
        label: cus.name
      }));
      dispatch(getCustomer(customer));
    })
    .catch((error) => {
      console.warn(error);
    });
}

const getCustomerById = (id, dispatch) => {
  const endPoint = api.API_CONSTANT_MAP.GetCustomerById;
  axios.get(`${endPoint}?Id=${id}`)
    .then(res => {
      let customer = res.data;
      customer.vechicleNumbers = customer.customerVechicles.map(v => v.vechicleNumber).join(", ");
      customer.isEdit = true;
      customer.newCustomer = true;
      customer.dob = customer.dob ? new Date(customer.dob).toLocaleDateString().split(/\//).reverse().join('-') : customer.dob;
      customer.weddingAnniversary = customer.weddingAnniversary ? new Date(customer.weddingAnniversary).toLocaleDateString().split(/\//).reverse().join('-') : customer.weddingAnniversary;
      customer.customerVechicles.forEach(g => {
        g.emiDate = g.emiDate ? new Date(g.emiDate).toLocaleDateString().split(/\//).reverse().join('-') : g.emiDate;
      });
      dispatch(getCustomerByID(customer));
    })
    .catch((error) => {
      console.warn(error);
    });
}

export const getCustomerDashboard = () => dispatch => {
  const endPoint = api.API_CONSTANT_MAP.CustomerDashboard;
  axios.get(endPoint)
    .then(res => {
      let customers = res.data;
      customers = customers.map(j => {
        j.vechicleDetails = j.vechicles.map(e => `${e.make} ${e.model} ${e.variant}`).join(", ");
        j.vechicleNumbers = j.customerVechicles.map(v => v.vechicleNumber).join(", ");
        j.custId = `${j.acFormat}-${j.acNo}`
        j.religion = filter(religionOptions, (item) => { if (item.value === j.religion) return item; })[0].label;
        j.native = filter(nativeOptions, (item) => { if (item.value === j.native) return item; })[0].label;
        return j;
      });
      dispatch(customerDashboard(customers));
    })
    .catch((error) => {
      console.warn(error);
    });

};

export const searchCustomers = term => async dispatch => {
  const endPoint = api.API_CONSTANT_MAP.GetCustomer;
  let res = await axios.get(`${endPoint}?name=${term}`);
  dispatch(searchCustomersList((res && res.data) || [], term));
};

export const selectCustomer = (id = null) => dispatch => dispatch(selectCustomerList(id));

export const searchVechicles = term => async dispatch => {
  const endPoint = api.API_CONSTANT_MAP.GetVechicle;
  let res = await axios.get(`${endPoint}?make=${term}`);
  dispatch(searchVechiclesList((res && res.data) || [], term));
};

export function saveCustomer() {
  return function _saveCustomer(dispatch, getState) {
    dispatch(editCustomerPending());
    const customer = getCustomerEdit(getState());
    AddUpdateCustomer(customer, dispatch);
  }
}

export const SendCustomerMessage = () => (dispatch, getState) => {
  const message = getCustomerMessageData(getState());
  SendMessageToCustomer(message, dispatch);
};

const SendMessageToCustomer = (message, dispatch) => {
  console.log(message);

  const endPoint = api.API_CONSTANT_MAP.PostMessageCustomer;
  const body = JSON.stringify(message);
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
    })
    .catch((error) => {
      console.warn(error);
    });
};

function AddUpdateCustomer(customer, dispatch) {
  const endPoint = api.API_CONSTANT_MAP.PostPutCustomer;
  const body = JSON.stringify(customer);

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
      dispatch(editCustomerSuccess(response.data));
    })
    .catch((error) => {
      console.warn(error);
    });
}

// eslint-disable-next-line
// String.prototype.format = function () {
//   let i = 0;
//   const args = arguments;
//   return this.replace(/{}/g, function () {
//     return args[i] !== "undefined" ? args[i++] : "";
//   });
// };