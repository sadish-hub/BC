using System;
using AutoMapper;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context.Models;
using bright_choice.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bright_choice.Controllers {

    [Route ("api/[controller]")]
    public class DailyStatusReportController : Controller {
        private readonly IMapper mapper;
        private readonly IDailyStatusReportRepository dailyStatusReportRepository;

        public DailyStatusReportController (IMapper mapper, IDailyStatusReportRepository dailyStatusReportRepository) {
            this.dailyStatusReportRepository = dailyStatusReportRepository;
            this.mapper = mapper;
        }

        [HttpPost ("[action]")]
        [AllowAnonymous]
        public IActionResult AddUpdate ([FromBody] DailyStatusReportDTO report) {
            var rep = mapper.Map<DailyStatusReport> (report);
            var insertedReport = report.Id != Guid.Empty ? dailyStatusReportRepository.Update (rep) : dailyStatusReportRepository.Insert (rep);
            return Ok (insertedReport);
        }

        [HttpGet ("[action]")]
        public IActionResult Get (Guid Id) => Ok (dailyStatusReportRepository.Get (Id));

        [HttpGet ("[action]")]
        public IActionResult GetReports () => Ok (dailyStatusReportRepository.GetDailyStatusReports ());
    }
}