import { connect } from 'react-redux';
import Enquiry from '../Enquiry';
import { getEnquiryView, getEnquiryEdit, getEnquiryVechicles, getEnquiryCustomers } from "../../store/Selectors";
import { setupEnquiry, saveEnquiry, searchCustomers, searchVechicles, selectCustomer, mapVechicles } from '../../store/thunks/EnquiryThunk';
import { addEnquiry, addEnquiryCustomer, addEnquirySearch } from '../../store/actions/EnquiryActions';

const mapStateToProps = state => ({
    enquiryView: getEnquiryView(state),
    enquiryEdit: getEnquiryEdit(state),
    items: getEnquiryCustomers(state),
    vechicleItems: getEnquiryVechicles(state)
});

const mapDispatchToProps = dispatch => ({
    addEnquiry: (fieldName, fieldValue) => dispatch(addEnquiry(fieldName, fieldValue)),
    addEnquiryCustomer: (fieldName, fieldValue) => dispatch(addEnquiryCustomer(fieldName, fieldValue)),
    addEnquirySearch: (fieldName, fieldValue) => dispatch(addEnquirySearch(fieldName, fieldValue)),
    discardEnquiryChanges: () => dispatch(setupEnquiry()),
    saveEnquiryChanges: () => dispatch(saveEnquiry()),
    setUpEnquiryEditableForm: (id = null) => dispatch(setupEnquiry(id)),
    fetchItems: value => dispatch(searchCustomers(value)),
    selectItem: ([item]) => dispatch(selectCustomer(item && item.id)),
    fetchVechicleItems: value => dispatch(searchVechicles(value)),
    mapVechicles: () => dispatch(mapVechicles())
});

export default connect(mapStateToProps, mapDispatchToProps)(Enquiry);
