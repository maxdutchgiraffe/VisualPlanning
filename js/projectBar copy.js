(function(window) {

	function ProjectBar(_data, _startDate, _pixelsADay, _content, _info) {
		EventTarget.call(this);
		var scope = this,
			__data = _data,
			__rgbColor = ColorUtils.hexToRgb(_data.color),
			__id = _data.ID,
			__startDate = _startDate,
			__pixelsADay = _pixelsADay,
			__tasks = _data.taken,
			__projectStartDate = _data.taken,
			__projectEndDate = _data.taken,
			__isOpen = false,
			__fases = [],
			__faseIDs = [],
			__totalHeight = 25,
			__projectInfo,
			__projectElement = $("<ul id=" + __id + " class='project'></ul>").appendTo(_content);
		//_content.append("<ul id=" + __id + " class='project'></ul>");

		function initProjectInfo() {
			var n = __projectElement.find(".task").length;
			__projectInfo = new ProjectInfo(_data, _info, n);
			__projectInfo.addListener("open", function() {
				scope.openProject();
			});
			__projectInfo.addListener("openAll", function() {
				scope.openProjectAll();
			});
			__projectInfo.addListener("close", function() {
				scope.closeProject();
			});
		};

		function sortDates() {
			var n = __tasks.length;
			var dates = [];
			for (var i = 0; i < n; i++) {
				dates.push(__tasks[i].startDateTime);
				dates.push(__tasks[i].endDateTime);
			};
			dates.sort();

			__projectStartDate = dates[0];
			__projectEndDate = dates[dates.length - 1] + DateUtils.DayInMilliseconds;
			console.log(__projectStartDate, __projectEndDate);
		};

		function init() {
			var leftOffset = (__projectStartDate - __startDate) / DateUtils.DayInMilliseconds,
				w = (__projectEndDate - __projectStartDate) / DateUtils.DayInMilliseconds;
			__projectElement.css("left", (leftOffset * __pixelsADay) + "px")
				.css("width", (w * __pixelsADay) + "px")
				.single_double_click(function(event) {
					if (!window.move)
						barClickEvent.call(scope, event);
				}, function(event) {
					barDoubleClickEvent.call(scope, event);
				});
			initTasks();
		}

		function barClickEvent(event) {
			if (scope.getIsOpen()) {
				var trgt = $(event.target);
				if (trgt.hasClass("faseBar") || trgt.hasClass("faseTitle") || trgt.hasClass("projectFase")) {
					if (trgt.hasClass("faseBar")) {
						trgt = trgt.parent();
					}
					if (trgt.hasClass("faseTitle")) {
						trgt = trgt.parent().parent();
					}
					var id = trgt.get(0).id,
						index = __faseIDs.indexOf(id),
						projectFase = __fases[index],
						faseTasks = projectFase.getTasks().length,
						fh = ((faseTasks * 30) - 5) - 25;
					if (projectFase.getIsOpen()) {
						projectFase.closeFase();
						__totalHeight -= fh;
						__projectElement.css("height", __totalHeight);
						positionElements(trgt.parent(), 25);
					} else {
						projectFase.openFase();
						__totalHeight += fh;
						__projectElement.css("height", __totalHeight);
						positionElements(trgt.parent(), fh + 25);
					}
					__projectInfo.openProject(__totalHeight);
				} else {
					scope.closeProject();
				}
			} else {
				scope.openProject();
			}
		};

		function barDoubleClickEvent(event) {
			console.log("barDoubleClickEvent");
			scope.openProjectAll();
			/*var n = __fases.length;
				for (var i = 0; i < n; i++) {
					__fases[i].openFase();
				};*/
		};

		function positionElements(_trgt, _height) {
			console.log("positionElements", _height);
			var t = 0;
			__projectElement
				.find(">.bar")
				.each(function(index) {
					var scope = $(this);
					scope.css("top", t);
					if (scope.get(0) === _trgt.get(0)) {
						t += _height + 5;
					} else {
						t += scope.height() + 5;
					}
				});
		};

		function initTasks() {
			var firstDateTime = __tasks[0].startDateTime;
			var n = __tasks.length;
			for (var i = 0; i < n; i++) {
				var startDateTime = __tasks[i].startDateTime,
					endDateTime = __tasks[i].endDateTime,
					lo = (startDateTime - firstDateTime) / DateUtils.DayInMilliseconds,
					w2 = (endDateTime - startDateTime + DateUtils.DayInMilliseconds) / DateUtils.DayInMilliseconds,
					bar;
				if (__tasks[i].taken) {
					__projectElement.append("<li class='bar fase bar" + __tasks[i].ID + "'><h2>" + __tasks[i].name + "</h2></li>");
					bar = __projectElement.find(".bar" + __tasks[i].ID);
					var projectFase = new ProjectFase(bar, __tasks[i], __rgbColor, __pixelsADay);
					__fases.push(projectFase);
					__faseIDs.push(__tasks[i].ID);
				} else {
					__projectElement.append("<li class='bar task bar" + __tasks[i].ID + "'><h2>" + __tasks[i].name + "</h2></li>");
					bar = __projectElement.find(".bar" + __tasks[i].ID);
				}
				var h2 = bar.find(">h2");
				h2
					.css("color", "rgba(100,100,100,0)")
					.css("width", h2.width())
					.css("left", -h2.width() - 10)
					.addClass("colorTrans");
				bar.css("left", (lo * __pixelsADay) + "px")
					.css("width", (w2 * __pixelsADay) + "px");
			};
			__projectElement.css("background-color", "rgba(" + Math.round(__rgbColor.r) + "," + Math.round(__rgbColor.g) + "," + Math.round(__rgbColor.b) + "," + 0.1 + ")");
			var tasks = __projectElement.find(">.task");
			tasks.css("background-color", "rgba(" + Math.round(__rgbColor.r) + "," + Math.round(__rgbColor.g) + "," + Math.round(__rgbColor.b) + "," + 1 + ")");
			__projectElement.find(".bar").addClass("taskTrans");
			__projectElement.addClass("projectTrans")
				.append("<h2>" + __data.name + "</h2>");
			__projectElement.find(">h2")
				.css("left", -__projectElement.find(">h2").width() - 10)
				.addClass("colorTrans");
		}
		sortDates();
		init();
		initProjectInfo();
		this.getID = function() {
			return __id;
		};
		this.getTasks = function() {
			return __tasks;
		};
		this.getTotalHeight = function() {
			return __totalHeight;
		};
		this.setTotalHeight = function(_value) {
			__totalHeight = _value;
		};
		this.getRGBColor = function() {
			return __rgbColor;
		};
		this.getStartDate = function() {
			return __startDate;
		};
		this.getIsOpen = function() {
			return __isOpen;
		};
		this.setIsOpen = function(isOpen) {
			__isOpen = isOpen;
		};
		this.getPixelsADay = function() {
			return __pixelsADay;
		};
		this.setPixelsADay = function(_pixelsADay) {
			__pixelsADay = _pixelsADay;
		};
		this.getProjectElement = function() {
			return __projectElement;
		};
		this.getProjectInfo = function() {
			return __projectInfo;
		};
		this.getFases = function() {
			return __fases;
		};
		this.getFaseIDs = function() {
			return __faseIDs;
		};
	}

	function openProject() {
		if (this.getIsOpen())
			return;
		this.setIsOpen(true);
		var t = this.getTasks(),
			id = this.getID(),
			hsv = this.getRGBColor(),
			projectElement = this.getProjectElement(),
			n = t.length,
			th,
			h2 = projectElement.find(">h2");
		h2.css("color", "rgba(100,100,100,0)");
		projectElement
			.find(">.bar")
			.each(function(index) {
				$(this)
					.css("top", (index * 30))
					.find(">h2")
					.css("color", "rgba(100,100,100,1)");
			});
		th = (n * 30) - 5;
		this.setTotalHeight(th);
		projectElement.css("height", th);
		this.getProjectInfo().openProject(th);
		//this.dispatchListener("open");
		this.dispatchListener({
			type: "open"
		});
	};

	function openProjectAll() {
		this.setIsOpen(true);
		var t = this.getTasks(),
			id = this.getID(),
			hsv = this.getRGBColor(),
			fases = this.getFases(),
			faseIDs = this.getFaseIDs(),
			projectElement = this.getProjectElement(),
			n = t.length,
			h2 = projectElement.find(">h2"),
			i = 0,
			allTasks = projectElement.find(".task"),
			top = 0;
		h2.css("color", "rgba(100,100,100,0)");
		projectElement
			.find(">.bar")
			.each(function(index) {
				var element = $(this);
				if (element.hasClass("fase")) {
					var id = element.find(">ul").get(0).id;
					var faseIndex = faseIDs.indexOf(id);
					fases[faseIndex].openFase();
					element.css("top", top);
					top += fases[faseIndex].getTasks().length * 30;
				} else {
					element
						.css("top", top)
						.find(">h2")
						.css("color", "rgba(100,100,100,1)");
					top += 30;
				}
			});
		var th = (allTasks.length * 30) - 5;
		this.setTotalHeight(th);
		projectElement.css("height", th);
		this.getProjectInfo().openProject(th);
		this.dispatchListener({
			type: "open"
		});
	};

	function closeProject() {
		if (!this.getIsOpen())
			return;
		this.setIsOpen(false);
		var projectElement = this.getProjectElement();
		var h2 = projectElement.find(">h2");
		h2.css("color", "rgba(100,100,100,1)");
		projectElement
			.find(">.bar")
			.each(function(index) {
				$(this)
					.css("top", 0)
					.find(">h2")
					.css("color", "rgba(100,100,100,0)");
			})
		var fases = this.getFases();
		var n = fases.length;
		for (var i = 0; i < n; i++) {
			fases[i].closeFase();
			fases[i].hideTitles();
		};
		var th = 25;
		this.setTotalHeight(th);
		projectElement.css("height", th);
		this.getProjectInfo().closeProject(th);
		//this.dispatchListener("close");
		this.dispatchListener({
			type: "close"
		});
	};

	function updateSize(_pixelsADay) {
		this.setPixelsADay(_pixelsADay);
		var startDate = this.getTasks()[0].getStartDateTime,
			endDate = this.getTasks()[this.getTasks().length - 1].getEndDateTime + DateUtils.DayInMilliseconds,
			leftOffset = (startDate - this.getStartDate()) / DateUtils.DayInMilliseconds,
			w = (endDate - startDate) / DateUtils.DayInMilliseconds,
			pad = this.getPixelsADay(),
			tasks = this.getTasks(),
			projectElement = this.getProjectElement(),
			n = this.getTasks().length;
		projectElement
			.css("left", (leftOffset * this.getPixelsADay()) + "px")
			.css("width", (w * this.getPixelsADay()) + "px")
			.find(" .bar")
			.removeClass("taskTrans");
		projectElement
			.find(".bar")
			.each(function(index) {
				var lo = (tasks[index].getStartDateTime - startDate) / DateUtils.DayInMilliseconds;
				var w2 = ((tasks[index].getEndDateTime + DateUtils.DayInMilliseconds) - tasks[index].getStartDateTime) / DateUtils.DayInMilliseconds;
				$(this)
					.css("left", (lo * pad) + "px")
					.css("width", (w2 * pad) + "px");
			})
			.addClass("taskTrans");

		projectElement
			.find(".task")
			.addClass("taskTrans");
	};
	ProjectBar.prototype = new EventTarget();
	ProjectBar.prototype.constructor = ProjectBar;
	ProjectBar.prototype.updateSize = updateSize;
	ProjectBar.prototype.openProject = openProject;
	ProjectBar.prototype.openProjectAll = openProjectAll;
	ProjectBar.prototype.closeProject = closeProject;
	window.ProjectBar = ProjectBar;
})(window);