﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistance;

#nullable disable

namespace Persistance.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220709132816_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.6");

            modelBuilder.Entity("Domain.CompanyHeader", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("DateListed")
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Sector")
                        .HasColumnType("TEXT");

                    b.Property<string>("Symbol")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("CompanyHeaders");
                });
#pragma warning restore 612, 618
        }
    }
}
