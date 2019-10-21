using System;
using System.Collections.Generic;
using bright_choice.Context.Models;
namespace bright_choice.BusinessLogic.Interfaces {
    public interface IDailyStatusReportRepository {
        DailyStatusReport Insert (DailyStatusReport dailyStatusReport);
        DailyStatusReport Update (DailyStatusReport dailyStatusReport);
        DailyStatusReport Get (Guid Id);
        IEnumerable<DailyStatusReport> GetDailyStatusReports ();
    }
}