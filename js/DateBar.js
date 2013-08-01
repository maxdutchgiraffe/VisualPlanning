(function(window) {
	function DateBar(_pixelsADay, _startDate, _endDate, _container, _target) {
		MGClassRoot.call(this, _target);
		var scope = this;
		scope.$.pixelsADay = _pixelsADay;
		scope.$.startDate = _startDate;
		scope.$.endDate = _endDate;
		scope.$.days = (_endDate - _startDate) / DateUtils.DayInMilliseconds;
		scope.$.container = _container; //$("#container");
		scope.$.maandRanges = [];
		scope.$.maandObjects = [];
		scope.$.maandDates = [];
		scope.$.stickyMaand = -1;
		scope.$.prevStickyMaand = -1;
		scope._init();
		scope._setStickyMaand(0);
	};
	DateBar.prototype = {
		_init: function() {
			var scope = this,
				maandnr = -1,
				weeknr = 0,
				maandOff = 0;
			for (var i = 0; i < n; i++) {
				var day = new Date(scope.$.startDate + (i * DateUtils.DayInMilliseconds));
				var left = (i * scope.$.pixelsADay);
				var wnr = DateUtils.getWeekNumber(day);
				var mnr = day.getMonth();
				if (mnr > maandnr) {
					maandnr = mnr;
					//scope.$.target.append("<div id='maand" + maandnr + day.getUTCFullYear() + "' class='maand' style='left:" + left + "px; z-index:2;'><h4>" + DateUtils.MonthsOfTheYearNL[maandnr] + "</h4></div>");
					var maandDiv = Utils.createElement("div", "maand" + maandnr + day.getUTCFullYear(), ["maand"], null, scope.$.target);
					maandDiv.style.left = left + "px";
					maandDiv.style.zIndex = 2;
					var maandH4 = Utils.createElement("h4", null, null, DateUtils.MonthsOfTheYearNL[maandnr], maandDiv);
					scope.$.maandRanges.push(left);
					scope.$.maandDates.push(day.getTime());
					scope.$.maandObjects.push(scope.$.target.find("#maand" + maandnr + day.getUTCFullYear()));
				}
				if (wnr > weeknr) {
					weeknr = wnr;
					scope.$.target.append("<div class='week' style='left:" + left + "px;z-index:1;'><h3 style='width:" + (scope.$.pixelsADay * 7) + "px'>week " + weeknr + "</h3></div>");
					var weekDiv = Utils.createElement("div", null, ["week"], null, scope.$.target);
					weekDiv.style.left = left + "px";
					weekDiv.style.zIndex = 1;
					var weekH3 = Utils.createElement("h3", null, null, weeknr, weekDiv);
					weekH3.style.width = (scope.$.pixelsADay * 7) + "px";
				}
				var isOdd = weeknr % 2;
				if (isOdd)
					scope.$.target.append("<div class='day' style='left:" + left + "px'><h1  style='width:" + scope.$.pixelsADay + "px'>" + day.getUTCDate() + "</h1></div>");
				else
					scope.$.target.append("<div class='day dateBarBGGradient' style='left:" + left + "px;width:" + scope.$.pixelsADay + "px'><h1 style='width:" + scope.$.pixelsADay + "px'>" + day.getUTCDate() + "</h1></div>");
			};
		},
		_setPrevStickyMaand: function(_value) {
			__prevStickyMaand = _value;
			if (_value === -1)
				return;
			__element.append(__maandObjects[__prevStickyMaand]);
			__maandObjects[__prevStickyMaand]
				.css("left", __maandRanges[__prevStickyMaand])
				.css("top", "");
		},
		_setStickyMaand: function(_value) {
			if (_value === __stickyMaand)
				return;
			if (__stickyMaand !== -1) {
				__element.append(__maandObjects[__stickyMaand]);
				__maandObjects[__stickyMaand]
					.css("left", __maandRanges[__stickyMaand])
					.css("top", "");
			}
			__stickyMaand = _value;
			if (_value > -1) {
				__maandObjects[__stickyMaand].detach();
				__container.append(__maandObjects[__stickyMaand]);
				__maandObjects[__stickyMaand]
					.css("left", 200)
					.css("top", 5);
			}
		}
	}
	window.DateBar = DateBar;
})(window);