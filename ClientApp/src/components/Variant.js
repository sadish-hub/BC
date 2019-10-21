import React, { Component } from 'react';
import SaveBar from './SaveBar';
import TextInput from './TextInput';
import queryString from 'query-string';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

class Variant extends Component {

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log(values.id);
        this.props.setUpVariantEditableForm(values.id || null);
    }
    saveRedirectDashboard = () => {
        this.props.saveVariantChanges();
        confirmAlert({
            title: 'Confirm to switch',
            message: 'Data saved successfully! Do you want to go to Dashboard?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.history.push('/variantdashboard')
                },
                {
                    label: 'No',
                    onClick: () => this.props.discardVariantChanges()
                }
            ]
        });
    };
    render() {
        const {
            addVariant,
            discardVariantChanges,
            variantEdit
        } = this.props;
        return (
            <div style={{ width: "90%" }}>
                <h4 className="text-info">Add/Edit Variant <FontAwesomeIcon icon={faCar} /></h4>
                <div>
                    <TextInput
                        handleChange={(newValue) => addVariant('make', newValue)}
                        title="Make"
                        value={variantEdit ? variantEdit.make : ''}
                        id="make"
                    />
                    <TextInput
                        handleChange={(newValue) => addVariant('model', newValue)}
                        title="Model"
                        value={variantEdit ? variantEdit.model : ''}
                        id="model"
                    />
                    <TextInput
                        handleChange={(newValue) => addVariant('variant', newValue)}
                        title="Variant"
                        value={variantEdit ? variantEdit.variant : ''}
                        id="variant"
                    />
                </div>
                <SaveBar
                    onDiscardAction={discardVariantChanges}
                    onSaveAction={this.saveRedirectDashboard}
                />
            </div>);
    }

}
export default Variant;