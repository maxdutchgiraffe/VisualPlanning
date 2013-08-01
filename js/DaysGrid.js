(function(window) {
	function DaysGrid(_pixelsADay, _startDate, _endDate, _daysGrid, _todayLine) {
		var __pixelsADay = _pixelsADay;
		var __startDate = _startDate;
		var __endDate = _endDate;
		var __days = (_endDate - _startDate) / DateUtils.DayInMilliseconds;
		var __element = _daysGrid;
		var __todayLine = _todayLine;
		var scope = this;
		this.getDays = function() {
			return __days;
		};
		this.getPixelsADay = function() {
			return __pixelsADay;
		};
		this.setPixelsADay = function(_pixelsADay) {
			__pixelsADay = _pixelsADay;
		};
		this.getStartDate = function() {
			return __startDate;
		};
		this.getEndDate = function() {
			return __endDate;
		};
		this.getElement = function() {
			return __element;
		};
		this.getTodayLine = function() {
			return __todayLine;
		};
		this.initDays();
	}

	function initDays() {
		var n = this.getDays();
		var todayLine = this.getTodayLine();
		var pad = this.getPixelsADay();
		var today = new Date();
		var element = this.getElement();
		for (var i = 0; i < n; i++) {
			var day = new Date(this.getStartDate() + (i * DateUtils.DayInMilliseconds));
			var weeknr = DateUtils.getWeekNumber(day);
			var isOdd = weeknr % 2;
			var left = (i * pad);
			var bgClass = isOdd ? "daysGridBGOdd" : "daysGridBGEven";
			if (day.getUTCDate() == today.getUTCDate() && day.getUTCMonth() == today.getUTCMonth() && day.getUTCFullYear() == today.getUTCFullYear()) {
				bgClass = "daysGridBGToday";
				todayLine.css("left", left);
			}
			if (day.getUTCDate() == 1)
				bgClass = bgClass + " daysGridMonth";
			element.append("<div class='" + bgClass + "' style='left:" + left + "px; width:" + pad + "px'></div>");
		};
	}

	function updateSize(_pixelsADay) {
		this.setPixelsADay(_pixelsADay);
		var pad = this.getPixelsADay();
		var element = this.getElement();
		element
			.find(" > div").each(function(index) {
				$(this).css("left", index * pad)
					.css("width", pad);
			});
	}
	DaysGrid.prototype = {
		constructor: DaysGrid,
		initDays: initDays,
		updateSize: updateSize
	}
	window.DaysGrid = DaysGrid;
})(window);