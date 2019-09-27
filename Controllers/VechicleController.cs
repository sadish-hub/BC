using System;
using AutoMapper;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context.Models;
using bright_choice.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bright_choice.Controllers {

    [Route ("api/[controller]")]
    public class VechicleController : Controller {
        private readonly IMapper mapper;
        private readonly IVechicleRepository vechicleRepository;

        public VechicleController (IMapper mapper, IVechicleRepository vechicleRepository) {
            this.mapper = mapper;
            this.vechicleRepository = vechicleRepository;
        }

        [HttpPost ("[action]")]
        [AllowAnonymous]
        public IActionResult AddUpdate ([FromBody] VechicleDTO vechicle) {
            var vech = mapper.Map<Vechicle> (vechicle);
            var insertedVechicle = vechicle.Id != Guid.Empty ? vechicleRepository.Update (vech) : vechicleRepository.Insert (vech);
            return Ok (insertedVechicle);
        }

        [HttpGet ("[action]")]
        public IActionResult Get (Guid Id) => Ok (vechicleRepository.GetVechicle (Id));

        [HttpGet ("[action]")]
        public IActionResult GetVechicles (string make) => Ok (vechicleRepository.GetVechicles (make));
    }
}