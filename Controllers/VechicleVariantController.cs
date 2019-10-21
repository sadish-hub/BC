using System;
using System.Collections.Generic;
using AutoMapper;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context.Models;
using bright_choice.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bright_choice.Controllers {

    [Route ("api/[controller]")]
    public class VechicleVariantController : Controller {
        private readonly IMapper mapper;
        private readonly IVechicleVariantRepository vechicleVariantRepository;

        public VechicleVariantController (IMapper mapper, IVechicleVariantRepository vechicleVariantRepository) {
            this.mapper = mapper;
            this.vechicleVariantRepository = vechicleVariantRepository;
        }

        [HttpPost ("[action]")]
        [AllowAnonymous]
        public IActionResult AddUpdate ([FromBody] VechicleVariantDTO vechicle) {
            var vech = mapper.Map<VechicleVariant> (vechicle);
            var insertedVechicle = vechicle.Id != Guid.Empty ? vechicleVariantRepository.Update (vech) : vechicleVariantRepository.Insert (vech);
            return Ok (insertedVechicle);
        }

        [HttpGet ("[action]")]
        [AllowAnonymous]
        public IActionResult Get (Guid Id) => Ok (vechicleVariantRepository.GetVechicleVariant (Id));

        [HttpGet ("[action]")]
        [AllowAnonymous]
        public IActionResult GetVechicleVariants (string make) => Ok (vechicleVariantRepository.GetVechicleVariants (make));
    }
}