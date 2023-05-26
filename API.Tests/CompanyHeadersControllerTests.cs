using System;
using System.Net;
//using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistance;

using NUnit.Framework;
using Persistance;
//using Application;
using MediatR;
//using API.Controllers;

[TestFixture]
public class CompanyHeadersControllerTests
{
    private readonly IMediator _mediator;
    public CompanyHeadersControllerTests(IMediator mediator)
    {
        _mediator = mediator;
    }

    public DataContext GetDbContext()
    {
        var builder = new DbContextOptionsBuilder<DataContext>();

        // Copied the orginally seeded db into our Test folder
        string path = "D:\\Development\\React\\Study\\CPU Onboarding\\WatchList\\API.Tests\\Watchlist.db";
        builder.UseSqlite($"Data Source={path}");
        
        var dbContext = new DataContext(builder.Options);
        dbContext.Database.OpenConnection();

        return dbContext;
    }

    [TestCase]
    public void GetTests()
    {
        // var context = GetDbContext();
        
        // CompanyHeadersController controller = new CompanyHeadersController(context);

        //new UserQueryHandlerAsync();
     
        var result = _mediator.Send(new Application.CompanyHeaders.List.Query()).Result;

        string test = "hello";
        // var headers = controller.GetCompanyHeaders().Result;
        // CompanyHeader header = headers.Value[0];
        // Console.WriteLine($"Response from CompanyHeadersController is DisplayName[0]: {header.DisplayName}, Symbol: {header.Symbol}");

        // Assert.IsNotNull(headers.Value);

        // Assert.That(headers.Value.Count, Is.EqualTo(4));
        // Assert.That(headers.Value[0].Symbol, Is.EqualTo("CPU"));
    }
}

