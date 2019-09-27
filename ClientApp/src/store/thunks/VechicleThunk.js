import { getVechicleView, getVechicleEdit } from '../Selectors';
import { editVechicleSuccess, editVechiclePending, setNewVechicleEditableForm } from '../actions/VechicleActions';
import axios from 'axios';
import * as api from '../EndPoint';

export function setupVechicle() {
  return function _resetVechicle(dispatch, getState) {
    const vechicle = getVechicleView(getState());
    dispatch(setNewVechicleEditableForm(vechicle));
  }
}

export function saveVechicle() {
  return function _saveVechicle(dispatch, getState) {
    dispatch(editVechiclePending());
    const vechicle = getVechicleEdit(getState());
    AddUpdateVehicle(vechicle, dispatch);
  }
}

function AddUpdateVehicle(vechicle, dispatch) {
  const endPoint = api.API_CONSTANT_MAP.PostPutVechicle;
  const body = JSON.stringify(vechicle);

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
      dispatch(editVechicleSuccess(response.data));
    })
    .catch((error) => {
      console.warn(error);
    });
}

// eslint-disable-next-line
String.prototype.format = function () {
  let i = 0;
  const args = arguments;
  return this.replace(/{}/g, function () {
    return args[i] !== "undefined" ? args[i++] : "";
  });
};