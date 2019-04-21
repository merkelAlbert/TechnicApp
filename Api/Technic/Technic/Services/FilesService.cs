using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Technic.DAL;
using Technic.Interfaces;

namespace Technic.Services
{
    public class FilesService : IFilesService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        private const string Imagesfolder = "wwwroot/Images";

        public FilesService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<List<Guid>> UploadFile(List<IFormFile> files)
        {
            var guids = new List<Guid>();

            var path = Path.Combine(Directory.GetCurrentDirectory(), Imagesfolder);
            Directory.CreateDirectory(path);

            foreach (var file in files)
            {
                var fileId = Guid.NewGuid();
                using (var fileStream = new FileStream(Path.Combine(path, fileId.ToString()), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                guids.Add(fileId);
            }

            return guids;
        }

        public async Task<FileStreamResult> DownloadFile(Guid fileId)
        {
            var memory = new MemoryStream();
            using (var stream =
                new FileStream(Path.Combine(Directory.GetCurrentDirectory(), Imagesfolder, fileId.ToString()),
                    FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return new FileStreamResult(memory, "application/octet-stream");
        }

        public void DeleteFile(Guid fileId)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), Imagesfolder, fileId.ToString());
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }
    }
}