using System;
using System.Collections.Generic;
using System.Linq;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context;
using bright_choice.Context.Models;

namespace bright_choice.BusinessLogic.Objects {

    public class DailyStatusReportRepository : IDailyStatusReportRepository {
        private readonly BrightChoiceContext context;
        public DailyStatusReportRepository (BrightChoiceContext brightChoice) {
            this.context = brightChoice;
        }

        public DailyStatusReport Get (Guid Id) => context.DailyStatusReports.Find (Id);

        public IEnumerable<DailyStatusReport> GetDailyStatusReports () => context.DailyStatusReports;

        public DailyStatusReport Insert (DailyStatusReport dailyStatusReport) {
            context.Database.EnsureCreated ();
            context.DailyStatusReports.Add (dailyStatusReport);
            context.SaveChanges ();
            return dailyStatusReport;
        }

        public DailyStatusReport Update (DailyStatusReport dailyStatusReport) {
            var report = context.DailyStatusReports.Find (dailyStatusReport.Id);
            if (report != null) {
                report.DealerCall = report.DealerCall;
                report.FreshCall = report.FreshCall;
                report.InfoVia = dailyStatusReport.InfoVia;
                report.MoreThan30Days = dailyStatusReport.MoreThan30Days;
                report.NoOfAdvanceRecd = dailyStatusReport.NoOfAdvanceRecd;
                report.NoOfAppointment = dailyStatusReport.NoOfAppointment;
                report.NoOfCarsSold = dailyStatusReport.NoOfCarsSold;
                report.OldCall = dailyStatusReport.OldCall;
                report.TotalCall = dailyStatusReport.TotalCall;
                report.TotalNoOfCar = dailyStatusReport.TotalNoOfCar;
                report.WebStatus = dailyStatusReport.WebStatus;
                report.WithPhotos = dailyStatusReport.WithPhotos;
                report.UpdatedDate = DateTime.UtcNow;

                context.SaveChanges ();
            }
            return dailyStatusReport;
        }
    }
}