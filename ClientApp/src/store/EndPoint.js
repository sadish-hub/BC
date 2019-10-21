const BASE_API = "/api"
const BASE_API_ALL = {
    "CUSTOMER_BASE_API": `${BASE_API}/Customer`,
    "VECHICLE_BASE_API": `${BASE_API}/Vechicle`,
    "ENQUIRY_BASE_API": `${BASE_API}/Enquiry`,
    "DAILY_REPORT_API": `${BASE_API}/DailyStatusReport`,
    "VECHICLE_VARIANT_BASE_API": `${BASE_API}/VechicleVariant`
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
    "GetVechicleById": `${BASE_API_ALL.VECHICLE_BASE_API}/Get`,

    //Enquiry
    "GetEnquiryById": `${BASE_API_ALL.ENQUIRY_BASE_API}/Get`,
    "PostPutEnquiry": `${BASE_API_ALL.ENQUIRY_BASE_API}/AddUpdate/`,
    "EnquiryDashboard": `${BASE_API_ALL.ENQUIRY_BASE_API}/GetEnquiries/`,
    "GetLeads": `${BASE_API_ALL.ENQUIRY_BASE_API}/GetLeads/`,

    //DailyStatusReport
    "GetDailyReportById": `${BASE_API_ALL.DAILY_REPORT_API}/Get`,
    "PostPutDailyReport": `${BASE_API_ALL.DAILY_REPORT_API}/AddUpdate/`,
    "DailyReportDashboard": `${BASE_API_ALL.DAILY_REPORT_API}/GetReports/`,

    //VechicleVariant
    "GetVariant": `${BASE_API_ALL.VECHICLE_VARIANT_BASE_API}/GetVechicleVariants`,
    "GetVariantById": `${BASE_API_ALL.VECHICLE_VARIANT_BASE_API}/Get`,
    "PostPutVariant": `${BASE_API_ALL.VECHICLE_VARIANT_BASE_API}/AddUpdate/`,
}