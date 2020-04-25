﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using plodo.Backend.API.Models;
using plodo.Backend.API.Validation;

namespace plodo.Backend.API.Controllers
{
    [Route("v{version:apiVersion}/app")]
    [ApiController]
    [ApiVersion("1")]
    public class AppController
    {
        /// <summary>
        /// Get app configuration
        /// </summary>
        /// <param name="appVersion">The app version, defaults to latest</param>
        /// <returns></returns>
        [HttpGet]
        [Route("{appVersion}")]
        [ResponseCache(Duration = 60)]
        public async Task<ActionResult<GetAppVersionResponse>> GetVersion(string appVersion = "latest")
        {
            try
            {
                var ghRelease = appVersion == "latest"
                    ? "https://github.com/larsbaunwall/plodo/releases/latest/download"
                    : $"https://github.com/larsbaunwall/plodo/releases/download/{appVersion}";
                    
                
                using var client = new HttpClient();
                var winRelease =
                    await client.GetStringAsync(
                        $"{ghRelease}/latest.yml");

                var macRelease =
                    await client.GetStringAsync(
                        $"{ghRelease}/latest-mac.yml");
            
                var yamlSerializer = new YamlDotNet.Serialization.Deserializer();
                var win = yamlSerializer.Deserialize<Dictionary<string, object>>(winRelease);
                var mac = yamlSerializer.Deserialize<Dictionary<string, object>>(macRelease);

                return new GetAppVersionResponse
                {
                    Version = win["version"].ToString(),
                    Windows = new GetAppVersionResponse.Asset
                    {
                        Path = $"{ghRelease}/{win["path"]}",
                        ReleaseDate = DateTimeOffset.Parse(win["releaseDate"].ToString())
                    },
                    MacOS = new GetAppVersionResponse.Asset
                    {
                        Path = $"{ghRelease}/{mac["path"]}",
                        ReleaseDate = DateTimeOffset.Parse(mac["releaseDate"].ToString())
                    }
                };

            }
            catch (HttpRequestException e)
            {
                throw new NotFoundException($"App version '{appVersion}' not found.", e.InnerException);
            }
        }
    }
}