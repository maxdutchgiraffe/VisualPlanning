(function(window) {
	function DateUtils() {}
	DateUtils.DayInMilliseconds = 1000 * 60 * 60 * 24;
	DateUtils.WeekInMilliseconds = DateUtils.DayInMilliseconds * 7;
	DateUtils.MonthsOfTheYearNL = [ "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December" ];
	DateUtils.getWeekArray = function(d, w) {
		var ar = [];
		var dn = d.getDay() == 0 ? d.getDay() + 6 : d.getDay() - 1;
		for (var i = 0; i < 7 * w; i++) {
			var n = (i * DateUtils.DayInMilliseconds) - (dn * DateUtils.DayInMilliseconds);
			var newD = new Date(d.valueOf() + n);
			ar.push(newD);
		}
		return ar;
	}
	DateUtils.getMonthArray = function(d) {
		var ar = [];
		var n = 6;
		for (var i = 0; i < n; i++) {
			var newA = DateUtils.getWeekArray(new Date(d.valueOf() + (i * DateUtils.WeekInMilliseconds)));
			ar = ar.concat(newA);
		}
		return ar;
	}

	DateUtils.getWeekNumber = function(d) {
		var Y = d.getFullYear();
		var M = d.getMonth();
		var D = d.getDate();
		var isLeapYear = (Y % 4 == 0 && Y % 100 != 0) || Y % 400 == 0;
		var lastYear = Y - 1;
		var lastYearIsLeap = (lastYear % 4 == 0 && lastYear % 100 != 0) || lastYear % 400 == 0;
		var month = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
		var DayOfYearNumber = D + month[M];
		if (isLeapYear && M > 1)
			DayOfYearNumber++;
		var YY = (Y - 1) % 100;
		var C = (Y - 1) - YY;
		var G = YY + YY / 4;
		var Jan1Weekday = Math.floor(1 + (((((C / 100) % 4) * 5) + G) % 7));
		var H = DayOfYearNumber + (Jan1Weekday - 1);
		var Weekday = Math.floor(1 + ((H - 1) % 7));
		var YearNumber = Y;
		var WeekNumber;
		if (DayOfYearNumber <= (8 - Jan1Weekday) && Jan1Weekday > 4) {
			YearNumber = Y - 1;
			if (Jan1Weekday == 5 || (Jan1Weekday == 6 && isLeapYear)) {
				WeekNumber = 53;
			} else {
				WeekNumber = 52;
			}
		}
		if (YearNumber == Y) {
			var I = 365;
			if (isLeapYear) {
				I = 366;
			}
			if (I - DayOfYearNumber < 4 - Weekday) {
				YearNumber = Y + 1;
				WeekNumber = 1;
			}
		}
		if (YearNumber == Y) {
			var J = DayOfYearNumber + (7 - Weekday) + (Jan1Weekday - 1);
			WeekNumber = J / 7;
			if (Jan1Weekday > 4) {
				WeekNumber--;
			}
		}
		return WeekNumber;
	}
	window.DateUtils = DateUtils;
})(window);