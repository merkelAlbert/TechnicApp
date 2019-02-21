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
        Task<List<Guid>> UploadFile(List<IFormFile> files);
        Task<FileStreamResult> DownloadFile(Guid fileId);
        void DeleteFile(Guid fileId);
    }
}