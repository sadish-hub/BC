using System;
using AutoMapper;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context.Models;
using bright_choice.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bright_choice.Controllers {

    [Route ("api/[controller]")]
    public class EnquiryController : Controller {
        private readonly IMapper mapper;
        private readonly IEnquiryRepository enquiryRepository;

        public EnquiryController (IMapper mapper, IEnquiryRepository enquiryRepository) {
            this.mapper = mapper;
            this.enquiryRepository = enquiryRepository;
        }

        [HttpPost ("[action]")]
        [AllowAnonymous]
        public IActionResult AddUpdate ([FromBody] EnquiryDTO enquiry) {
            var enq = mapper.Map<Enquiry> (enquiry);
            var insertedEnquiry = enquiry.Id != Guid.Empty ? enquiryRepository.Update (enq) : enquiryRepository.Insert (enq);
            return Ok (insertedEnquiry);
        }

        [HttpGet ("[action]")]
        public IActionResult Get (Guid Id) => Ok (enquiryRepository.GetEnquiry (Id));

        [HttpGet ("[action]")]
        public IActionResult GetEnquiries () => Ok (enquiryRepository.GetEnquiries ());

        [HttpGet ("[action]")]
        public IActionResult GetLeads (string name) => Ok (enquiryRepository.GetLeads (name));
    }
}