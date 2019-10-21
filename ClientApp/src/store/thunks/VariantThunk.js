import {
    getVariantEdit
} from '../Selectors';
import {
    setNewVariantEditableForm,
    getVariantByID,
    editVariantPending,
    editVariantSuccess,
    variantDashboard
} from '../actions/VariantActions';
import axios from 'axios';
import * as api from '../EndPoint';

export function setupVariant(id) {
    return function _resetVariant(dispatch, getState) {
        if (id) {
            getVariantById(id, dispatch);
        }
        else {
            dispatch(setNewVariantEditableForm(null));
        }
    }
}

const getVariantById = (id, dispatch) => {
    const endPoint = api.API_CONSTANT_MAP.GetVariantById;
    axios.get(`${endPoint}?Id=${id}`)
        .then(res => {
            let rep = res.data;
            rep.newVariant = true;
            rep.isEdit = true;
            rep.createdDate = new Date(rep.createdDate).toLocaleDateString().split(/\//).reverse().join('-');
            dispatch(getVariantByID(rep));
        })
        .catch((error) => {
            console.warn(error);
        });
}

export function saveVariant() {
    return function _saveVariant(dispatch, getState) {
        dispatch(editVariantPending());
        const rep = getVariantEdit(getState());
        AddUpdateVariant(rep, dispatch);
    }
}
const AddUpdateVariant = (variant, dispatch) => {
    const endPoint = api.API_CONSTANT_MAP.PostPutVariant;
    const body = JSON.stringify(variant);

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
            dispatch(editVariantSuccess(response.data));
        })
        .catch((error) => {
            console.warn(error);
        });
}

export const getVariantDashboard = () => dispatch => {
    const endPoint = api.API_CONSTANT_MAP.GetVariant;
    axios.get(endPoint)
        .then(res => {
            let variants = res.data;
            variants = variants.map(j => {
                j.createdDate = new Date(j.createdDate).toLocaleDateString().split(/\//).reverse().join('-');
                return j;
            });
            dispatch(variantDashboard(variants));
        })
        .catch((error) => {
            console.warn(error);
        });

};