/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SaveBar from './SaveBar';
import TextInput from './TextInput';
import VechicleBasicDetail from './VechicleBasicDetail';
import ViewVechicle from './ViewVechicle';

class Vechicle extends Component {
    componentDidMount() {
        this.props.setUpVechicleEditableForm();
    }

    render() {
        const {
            addVechicle,
            discardVechicleChanges,
            vechicleView,
            vechicleEdit,
            saveVechicleChanges,
        } = this.props;

        return (
            vechicleView ? <ViewVechicle {...this.props} /> :
                <div style={{ width: "90%" }}>
                    <h2>Add/Edit Vechicle</h2>

                    <VechicleBasicDetail {...this.props} />

                    <TextInput
                        handleChange={(newValue) => addVechicle('year', newValue)}
                        title="Year"
                        value={vechicleEdit ? vechicleEdit.year : ''}
                        id="year"
                        type="number"
                    />
                    <TextInput
                        handleChange={(newValue) => addVechicle('vechicleNumber', newValue)}
                        title="Vechicle Number"
                        value={vechicleEdit ? vechicleEdit.vechicleNumber : ''}
                        id="vechicleNumber"
                    />
                    <TextInput
                        handleChange={(newValue) => addVechicle('price', newValue)}
                        title="Price"
                        value={vechicleEdit ? vechicleEdit.price : ''}
                        id="price"
                        type="number"
                    />
                    <TextInput
                        handleChange={(newValue) => addVechicle('offer', newValue)}
                        title="Offer"
                        value={vechicleEdit ? vechicleEdit.offer : ''}
                        id="offer"
                    />
                    <TextInput
                        handleChange={(newValue) => addVechicle('city', newValue)}
                        title="City"
                        value={vechicleEdit ? vechicleEdit.city : ''}
                        id="city"
                    />
                    <TextInput
                        handleChange={(newValue) => addVechicle('exShowRoomPrice', newValue)}
                        title="Ex Showroom Price"
                        value={vechicleEdit ? vechicleEdit.exShowRoomPrice : ''}
                        id="exShowRoomPrice"
                        type="number"
                    />
                    <TextInput
                        handleChange={(newValue) => addVechicle('onRoadPrice', newValue)}
                        title="On Road Price"
                        value={vechicleEdit ? vechicleEdit.onRoadPrice : ''}
                        id="onRoadPrice"
                        type="number"
                    />
                    <TextInput
                        handleChange={(newValue) => addVechicle('currentPrice', newValue)}
                        title="Current Price"
                        value={vechicleEdit ? vechicleEdit.currentPrice : ''}
                        id="currentPrice"
                        type="number"
                    />
                    <SaveBar
                        onDiscardAction={discardVechicleChanges}
                        onSaveAction={saveVechicleChanges}
                    />
                </div>
        );
    }
}

Vechicle.propTypes = {
    addVechicle: PropTypes.func.isRequired,
    discardVechicleChanges: PropTypes.func.isRequired,
    vechicleView: PropTypes.shape({
        id: PropTypes.string,
        make: PropTypes.string,
        model: PropTypes.string,
        variant: PropTypes.string,
        vechicleNumber: PropTypes.string,
        year: PropTypes.number,
        price: PropTypes.number,
        offer: PropTypes.string,
        city: PropTypes.string,
        exShowRoomPrice: PropTypes.number,
        onRoadPrice: PropTypes.number,
        currentPrice: PropTypes.number
    }),
    vechicleEdit: PropTypes.shape({
        id: PropTypes.string,
        make: PropTypes.string,
        model: PropTypes.string,
        variant: PropTypes.string,
        vechicleNumber: PropTypes.string,
        year: PropTypes.string,
        price: PropTypes.string,
        offer: PropTypes.string,
        city: PropTypes.string,
        exShowRoomPrice: PropTypes.string,
        onRoadPrice: PropTypes.string,
        currentPrice: PropTypes.string
    }),
    saveVechicleChanges: PropTypes.func.isRequired,
    setUpVechicleEditableForm: PropTypes.func.isRequired,
};

Vechicle.defaultProps = {
    customerView: null,
    customerEdit: null
};

export default Vechicle;