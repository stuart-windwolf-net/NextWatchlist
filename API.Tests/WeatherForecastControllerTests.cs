using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;

using NUnit.Framework;
using Persistance;
using API.Controllers;

     [TestFixture]
    public class WeatherForecastControllerTests
    {
        public WeatherForecastControllerTests() { }

        [TestCase]
        public void GetTest()
        {
            WeatherForecastController controller = new WeatherForecastController();
  
            List<API.WeatherForecast> forecasts = controller.Get().ToList();

            Console.WriteLine($"Response from WeatherForecastController is Date: {forecasts[0].Date}, Temp: {forecasts[0].TemperatureC}, Summary: '{forecasts[0].Summary}'");

            Assert.IsNotNull(forecasts);
            Assert.IsNotEmpty(forecasts);
         }

        private class WeatherForecast
        {
            public DateTime Date {get; set;}
            public int TemperatureC {get; set;}
            public string Summary {get; set;}
        }
    }

