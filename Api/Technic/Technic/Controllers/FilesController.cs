using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Technic.Interfaces;

namespace Technic.Controllers
{
    [Route("[controller]")]
    public class FilesController : Controller
    {
        private readonly IFilesService _filesService;

        public FilesController(IFilesService filesService)
        {
            _filesService = filesService;
        }

        [HttpPost]
        //[Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> Upload([FromForm] List<IFormFile> files)
        {
            try
            {
                var ids = await _filesService.UploadFile(files);
                return ids;
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("{fileId}")]
        //[Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> Download([FromRoute] Guid fileId)
        {
            try
            {
                var file = await _filesService.DownloadFile(fileId);
                return file;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}