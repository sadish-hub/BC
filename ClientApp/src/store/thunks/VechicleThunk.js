import { getVechicleView, getVechicleEdit } from '../Selectors';
import { editVechicleSuccess, editVechiclePending, setNewVechicleEditableForm, searchVechiclesList, vechicleDashboard, getVechicleByID } from '../actions/VechicleActions';
import axios from 'axios';
import * as api from '../EndPoint';
import filter from 'lodash/filter';
import options from '../../components/constants/VechicleStatus';
import inventoryOptions from '../../components/constants/CarInventory';

export function setupVechicle(id) {
  return function _resetVechicle(dispatch, getState) {
    if (id) {
      getVechicleById(id, dispatch);
    }
    else {
      const vechicle = getVechicleView(getState());
      dispatch(setNewVechicleEditableForm(vechicle));
    }
  }
}

const getVechicleById = (id, dispatch) => {
  const endPoint = api.API_CONSTANT_MAP.GetVechicleById;
  axios.get(`${endPoint}?Id=${id}`)
    .then(res => {
      let vechicle = res.data;
      vechicle.isEdit = true;
      vechicle.newVechicle = true;
      dispatch(getVechicleByID(vechicle));
    })
    .catch((error) => {
      console.warn(error);
    });
}

export const getVechicleDashboard = () => dispatch => {
  // const endPoint = api.API_CONSTANT_MAP.GetVechicle;
  // axios.get(endPoint)
  //   .then(res => {
  //     let vechs = res.data;
  //     vechs = vechs.map(j => {
  //       j.variantDetails = `${j.vechicleVariant.make} ${j.vechicleVariant.model} ${j.vechicleVariant.variant}`;
  //       j.status = filter(options, (item) => { if (item.value === j.status) return item; })[0].label;
  //       jinventory = filter(inventoryOptions, (item) => { if (item.value === j.inventory) return item; })[0].label;
  //       return j;
  //     });
  //     dispatch(vechicleDashboard(vechs));
  //   })
  //   .catch((error) => {
  //     console.warn(error);
  //   });

  const endPoint = api.API_CONSTANT_MAP.GetVechicle;

  let search = {};
  let body = JSON.stringify(search);
  axios({
    "method": "POST",
    "url": endPoint,
    "data": body,
    "headers": {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      let vechs = res.data;
      vechs = vechs.map(j => {
        j.variantDetails = `${j.vechicleVariant.make} ${j.vechicleVariant.model} ${j.vechicleVariant.variant}`;
        j.status = filter(options, (item) => { if (item.value === j.status) return item; })[0].label;
        j.inventory = filter(inventoryOptions, (item) => { if (item.value === j.inventory) return item; })[0].label;
        return j;
      });
      dispatch(vechicleDashboard(vechs));
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const searchVariants = term => async dispatch => {
  const endPoint = api.API_CONSTANT_MAP.GetVariant;
  let res = await axios.get(`${endPoint}?make=${term}`);
  dispatch(searchVechiclesList((res && res.data) || [], term));
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