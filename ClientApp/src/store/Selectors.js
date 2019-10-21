// SELECTORS are used to retrieve data from the state tree.
//Customer
export function getCustomerView(state) {
  return state.customer.view.data;
}

export function getCustomerEdit(state) {
  return state.customer.edit.data;
}

export function getHasCustomerChanged(state) {
  return state.customer.edit.changed;
}

export function getCustomers(state) {
  return state.customer.items;
}

export const getCustomerDashboardData = (state) => state.customer.dashboard.data;

export const getCustomerMessageData = (state) => state.customer.dashboard.message;

//Vechicle
export function getVechicleView(state) {
  return state.vechicle.view.data;
}

export function getVechicleEdit(state) {
  return state.vechicle.edit.data;
}

export function getHasVechicleChanged(state) {
  return state.vechicle.edit.changed;
}

export function getVariants(state) {
  return state.vechicle.vechicleItems;
}

export const getVechicleDashboardData = (state) => state.vechicle.dashboard.data;

export function getVechicles(state) {
  return state.customer.vechicleItems;
}

//Enquiry
export function getEnquiryView(state) {
  return state.enquiry.view.data;
}

export function getEnquiryEdit(state) {
  return state.enquiry.edit.data;
}

export function getEnquiryVechicles(state) {
  return state.enquiry.vechicleItems;
}

export function getEnquiryCustomers(state) {
  return state.enquiry.items;
}

export const getEnquiryDashboardData = (state) => state.enquiry.dashboard.data;

//DaliyReport
export function getDailyReportEdit(state) {
  return state.dailyReport.edit.data;
}

export const getDailyReportDashboardData = (state) => state.dailyReport.dashboard.data;

//Variant
export function getVariantEdit(state) {
  return state.variant.edit.data;
}

export const getVariantDashboardData = (state) => state.variant.dashboard.data;