using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO;
using Technic.DTO.Machines;
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

        public async Task<List<Guid>> Upload(List<IFormFile> images)
        {
            var guids = new List<Guid>();

            var path = Path.Combine(Directory.GetCurrentDirectory(), Imagesfolder);
            Directory.CreateDirectory(path);

            foreach (var image in images)
            {
                var imageId = Guid.NewGuid();
                using (var fileStream = new FileStream(Path.Combine(path, imageId.ToString()), FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                guids.Add(imageId);
            }

            return guids;
        }

        public async Task<FileStreamResult> Download(Guid imageId)
        {
            var memory = new MemoryStream();
            using (var stream =
                new FileStream(Path.Combine(Directory.GetCurrentDirectory(), Imagesfolder, imageId.ToString()),
                    FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return new FileStreamResult(memory, "application/octet-stream");
        }
    }
}