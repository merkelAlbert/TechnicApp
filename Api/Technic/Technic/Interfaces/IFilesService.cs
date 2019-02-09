using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Technic.Interfaces
{
    public interface IFilesService
    {
        Task<List<Guid>> Upload(List<IFormFile> images);
        Task<FileStreamResult> Download(Guid imageId);
    }
}