using bright_choice.Context.Models;
using Microsoft.EntityFrameworkCore;

namespace bright_choice.Context {
    public class BrightChoiceContext : DbContext {

        public BrightChoiceContext (DbContextOptions<BrightChoiceContext> options) : base (options) { }
        public DbSet<Customer> Customers { get; set; }

        public DbSet<Vechicle> Vechicles { get; set; }

        public DbSet<CustomerVechicle> CustomerVechicles { get; set; }

        public DbSet<Enquiry> Enquiries { get; set; }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {

            modelBuilder.Entity<Customer> ()
                .Property (c => c.Religion)
                .HasConversion<int> ();

            modelBuilder.Entity<Customer> ()
                .Property (c => c.Native)
                .HasConversion<int> ();

            modelBuilder.Entity<Customer> ()
                .Property (h => h.Id)
                .HasDefaultValueSql ("newid()");

            modelBuilder.Entity<Vechicle> ()
                .Property (n => n.Inventory)
                .HasConversion<int> ();

            modelBuilder.Entity<Vechicle> ()
                .Property (h => h.Id)
                .HasDefaultValueSql ("newid()");

            modelBuilder.Entity<CustomerVechicle> ()
                .Property (c => c.Type)
                .HasConversion<int> ();

            modelBuilder.Entity<CustomerVechicle> ()
                .Property (j => j.Status)
                .HasConversion<int> ()
                .HasDefaultValueSql ("0");

            modelBuilder.Entity<CustomerVechicle> ()
                .HasKey (bc => bc.Id);

            modelBuilder.Entity<CustomerVechicle> ()
                .Property (h => h.Id)
                .HasDefaultValueSql ("newid()");

            modelBuilder.Entity<CustomerVechicle> ()
                .HasOne (bc => bc.Customer)
                .WithMany (b => b.CustomerVechicles)
                .HasForeignKey (f => f.CustomerId);

            modelBuilder.Entity<CustomerVechicle> ()
                .HasOne (bc => bc.Vechicle)
                .WithMany (b => b.CustomerVechicles)
                .HasForeignKey (f => f.VechicleId);

            modelBuilder.Entity<Enquiry> ()
                .Property (h => h.Id)
                .HasDefaultValueSql ("newid()");

            modelBuilder.Entity<Enquiry> ()
                .Property (c => c.SourcingPoint)
                .HasConversion<int> ();

            modelBuilder.Entity<Enquiry> ()
                .Property (c => c.CallStatus)
                .HasConversion<int> ();

            modelBuilder.Entity<Enquiry> ()
                .Property (c => c.LeadType)
                .HasConversion<int> ();

            base.OnModelCreating (modelBuilder);
        }
    }
}