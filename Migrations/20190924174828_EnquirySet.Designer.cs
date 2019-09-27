﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using bright_choice.Context;

namespace bright_choice.Migrations
{
    [DbContext(typeof(BrightChoiceContext))]
    [Migration("20190924174828_EnquirySet")]
    partial class EnquirySet
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("bright_choice.Context.Models.Customer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("newid()");

                    b.Property<string>("ACFormat")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<int>("ACNo");

                    b.Property<string>("Address");

                    b.Property<bool?>("AnyOtherCar");

                    b.Property<DateTime?>("CreatedDate")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("DOB");

                    b.Property<string>("EmailId")
                        .HasMaxLength(255);

                    b.Property<string>("InsuranceDetails")
                        .HasMaxLength(2000);

                    b.Property<string>("LandlineNumber")
                        .HasMaxLength(20);

                    b.Property<string>("MobileNumber")
                        .HasMaxLength(20);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<int>("Native");

                    b.Property<string>("NextCarDetails")
                        .HasMaxLength(2000);

                    b.Property<string>("OfficeAddress");

                    b.Property<string>("OfficeEmail")
                        .HasMaxLength(255);

                    b.Property<string>("OfficeLandline")
                        .HasMaxLength(20);

                    b.Property<string>("OfficeName")
                        .HasMaxLength(200);

                    b.Property<int>("Religion");

                    b.Property<string>("ServiceDetails")
                        .HasMaxLength(1000);

                    b.Property<bool?>("ThankYou");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<DateTime?>("WeddingAnniversary");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("bright_choice.Context.Models.CustomerVechicle", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("newid()");

                    b.Property<string>("Bank")
                        .HasMaxLength(200);

                    b.Property<string>("BankAccNo")
                        .HasMaxLength(100);

                    b.Property<decimal?>("Budget")
                        .HasColumnType("decimal(18, 6)");

                    b.Property<DateTime?>("CreatedDate")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CustomerId");

                    b.Property<decimal?>("EMI")
                        .HasColumnType("decimal(18, 6)");

                    b.Property<DateTime?>("EMIDate");

                    b.Property<bool?>("Insurance");

                    b.Property<decimal?>("LoanAmount")
                        .HasColumnType("decimal(18, 6)");

                    b.Property<bool?>("RC");

                    b.Property<string>("SellerContactNumber")
                        .HasMaxLength(20);

                    b.Property<string>("SellerName")
                        .HasMaxLength(100);

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("0");

                    b.Property<int?>("Tenor");

                    b.Property<int>("Type");

                    b.Property<DateTime?>("UpdatedDate")
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("VechicleId");

                    b.Property<string>("VechicleNumber")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("VechicleId");

                    b.ToTable("CustomerVechicles");
                });

            modelBuilder.Entity("bright_choice.Context.Models.Enquiry", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("newid()");

                    b.Property<string>("AlternateCar");

                    b.Property<decimal?>("Budget")
                        .HasColumnType("decimal(18, 6)");

                    b.Property<int>("CallStatus");

                    b.Property<string>("Comments");

                    b.Property<DateTime?>("CreatedDate")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CustomerId");

                    b.Property<string>("ExactRequirement");

                    b.Property<DateTime?>("NextFollowUp");

                    b.Property<bool>("ProvidedDetails");

                    b.Property<int>("SourcingPoint");

                    b.Property<int>("Status");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<Guid>("VechicleId");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("VechicleId");

                    b.ToTable("Enquiries");
                });

            modelBuilder.Entity("bright_choice.Context.Models.Vechicle", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("newid()");

                    b.Property<DateTime?>("CreatedDate")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Inventory");

                    b.Property<string>("Make")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<string>("Variant");

                    b.Property<int?>("Year");

                    b.HasKey("Id");

                    b.ToTable("Vechicles");
                });

            modelBuilder.Entity("bright_choice.Context.Models.CustomerVechicle", b =>
                {
                    b.HasOne("bright_choice.Context.Models.Customer", "Customer")
                        .WithMany("CustomerVechicles")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("bright_choice.Context.Models.Vechicle", "Vechicle")
                        .WithMany("CustomerVechicles")
                        .HasForeignKey("VechicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("bright_choice.Context.Models.Enquiry", b =>
                {
                    b.HasOne("bright_choice.Context.Models.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("bright_choice.Context.Models.Vechicle", "Vechicle")
                        .WithMany()
                        .HasForeignKey("VechicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
