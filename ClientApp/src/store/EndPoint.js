const BASE_API = "/api"
const BASE_API_ALL = {
    "CUSTOMER_BASE_API": `${BASE_API}/Customer`,
    "VECHICLE_BASE_API": `${BASE_API}/Vechicle`,
    "ENQUIRY_BASE_API": `${BASE_API}/Enquiry`
}

export const API_CONSTANT_MAP = {
    //Customer
    "PostPutCustomer": `${BASE_API_ALL.CUSTOMER_BASE_API}/AddUpdate/`,
    "GetCustomer": `${BASE_API_ALL.CUSTOMER_BASE_API}/GetCustomersNames`,
    "CustomerDashboard": `${BASE_API_ALL.CUSTOMER_BASE_API}/GetCustomers/`,
    "PostMessageCustomer": `${BASE_API_ALL.CUSTOMER_BASE_API}/SendMessage/`,
    "GetCustomerById": `${BASE_API_ALL.CUSTOMER_BASE_API}/Get`,

    //Vechicle
    "PostPutVechicle": `${BASE_API_ALL.VECHICLE_BASE_API}/AddUpdate/`,
    "GetVechicle": `${BASE_API_ALL.VECHICLE_BASE_API}/GetVechicles`,

    //Enquiry
    "GetEnquiryById": `${BASE_API_ALL.ENQUIRY_BASE_API}/Get`,
    "PostPutEnquiry": `${BASE_API_ALL.ENQUIRY_BASE_API}/AddUpdate/`,
    "EnquiryDashboard": `${BASE_API_ALL.ENQUIRY_BASE_API}/GetEnquiries/`,
    "GetLeads": `${BASE_API_ALL.ENQUIRY_BASE_API}/GetLeads/`
}