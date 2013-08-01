Element.prototype.getElementWidth = function() {
	if (typeof this.clip !== "undefined") {
		return this.clip.width;
	} else {
		if (this.style.pixelWidth) {
			return this.style.pixelWidth;
		} else {
			return this.offsetWidth;
		}
	}
};
Element.prototype.getElementHeight = function() {
	if (typeof this.clip !== "undefined") {
		return this.clip.height;
	} else {
		if (this.style.pixelHeight) {
			return this.style.pixelHeight;
		} else {
			return this.offsetheight;
		}
	}
};
(function(window, document) {

	/*document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);*/
	var hscroller;
	var vscroller;
	var hTimer;
	var vTimer;
	var scope = this;
	/////////
	/////////
	var t = new Date().getTime();
	var legendaProjects = $("#legendaProjects");
	var legendaContent = document.getElementById("legendaContent");//$("#legendaContent");
	var contentWrapper = $("#contentWrapper");
	var content = document.getElementById("content");
	var hscrollpane = $("#hscrollpane");
	var container = $("#container");
	var legendaBG = $("#legendaBG");
	var projectsDiv = $("#projects");
	var dateBar = $("#dateBar");
	var daysGrid = $("#daysGrid");
	var wrapper = $("#wrapper");
	var todayLine = $("#todayLine");

	/////////
	/////////
	var startViewDate;
	var endViewDate;
	var pixelsADay = (window.innerWidth - 200) / 70;
	var br = Math.round(pixelsADay * 0.2);
	br = br > 4 ? 4 : br < 1 ? 1 : br;
	$("<style type=\"text/css\">.task, ul.projectFase, ul.project { border-radius: " + br + "px }</style>").appendTo("head");
	var days = 30;
	/////////
	/////////
	var jsonLoader = new JSONData();
	jsonLoader.addListener("complete", jsonDataLoadedEvent);
	jsonLoader.load();

	var projects;

	function jsonDataLoadedEvent(event) {
		//console.log("time 1:", new Date().getTime() - t);
		dates(event.data);
		jsonLoader.removeListener("complete", jsonDataLoadedEvent);
		delete jsonLoader;
		//console.log("time 6:", new Date().getTime() - t);
	};

	function dates(data) {
		var t = new Date().getTime();
		var n = data.projects.length;
		for (var i = 0; i < n; i++) {
			var m = data.projects[i].taken.length;
			for (var j = 0; j < m; j++) {
				var startSplit = data.projects[i].taken[j].startDate.split("-");
				var startDate = new Date(Date.UTC(startSplit[2], startSplit[1] - 1, startSplit[0]));
				data.projects[i].taken[j].startDate = startDate;
				data.projects[i].taken[j].startDateTime = startDate.getTime()
				////////
				var endSplit = data.projects[i].taken[j].endDate.split("-");
				var endDate = new Date(Date.UTC(endSplit[2], endSplit[1] - 1, endSplit[0]));
				//console.log(startDate, endDate);

				data.projects[i].taken[j].endDate = endDate;
				data.projects[i].taken[j].endDateTime = endDate.getTime();
				//console.log(startDate, endDate);
				if (startDate.getTime() < startViewDate || startViewDate === undefined) {
					startViewDate = startDate.getTime();
				}
				if (endDate.getTime() > endViewDate || endViewDate === undefined) {

					endViewDate = endDate.getTime();
				}
			};
		};
		console.log("time 2:", new Date().getTime() - t);
		startViewDate = startViewDate - (DateUtils.WeekInMilliseconds * 3);
		endViewDate = endViewDate + (DateUtils.WeekInMilliseconds * 3);
		var mill = endViewDate - startViewDate;
		days = mill / DateUtils.DayInMilliseconds;
		console.log(new Date(startViewDate), new Date(endViewDate), days, pixelsADay, pixelsADay * days, new Date().getTime() - t);
		initSizes();
		console.log("time 3:", new Date().getTime() - t);
		initGrid();
		console.log("time 4:", new Date().getTime() - t);
		initProjects(data);
		console.log("time 5:", new Date().getTime() - t);
		initIScroll();
	};

	function initSizes() {
		wrapper.css("width", window.innerWidth - 200);
		content.style.width = (pixelsADay * days) + "px";
		contentWrapper.css("width", pixelsADay * days);
		dateBar.css("width", pixelsADay * days);
		daysGrid.css("width", pixelsADay * days);
		//content.css("height", window.innerHeight + 125);
		updateProjectHeight();
		wrapper.css("height", window.innerHeight - 50);
		contentWrapper.css("height", window.innerHeight - 125);
		legendaBG.css("height", window.innerHeight - 125);
		legendaProjects.css("height", window.innerHeight - 125);
		projectsDiv
			.css("width", pixelsADay * days)
			.css("height", window.innerHeight - 125);
		container
			.css("height", window.innerHeight - 50)
			.css("width", window.innerWidth - 200);
		hscrollpane
			.css("height", window.innerHeight - 50)
			.css("width", pixelsADay * days);
	};
	var dateBarClass;
	var daysGridClass;

	function initGrid() {
		dateBarClass = new DateBar(pixelsADay, startViewDate, endViewDate, container, dateBar);
		console.log("time 3.1:", new Date().getTime() - t);
		daysGridClass = new DaysGrid(pixelsADay, startViewDate, endViewDate, daysGrid, todayLine);
	};

	function initProjects(data) {
		projects = new Projects(data, content, legendaContent, startViewDate, pixelsADay);
		projects.addListener("sizeUpdate", function(event) {
			//console.log("sizeUpdate", contentWrapper);
			updateProjectHeight.call(scope);
		});
	};

	function updateProjectHeight() {
		console.log(projects);
		if (!projects)
			return;
		var prs = projects.getProjects();
		var n = prs.length;
		var h = (n * 5) + 10;
		for (var i = 0; i < n; i++) {
			h += prs[i].vars.totalHeight;
		};
		if (h > window.innerHeight - 125) {
			content.css("height", h);
			content.style.height = h + "px";
			refreshVScroller();
		} else if (content.css("height") < window.innerHeight - 125) {
			content.style.height = (window.innerHeight - 125) + "px";
			refreshVScroller();
		}
	};

	function refreshHScroller() {
		setTimeout(function() {
			hscroller.refresh();
		}, 0);
	};

	function refreshVScroller() {
		setTimeout(function() {
			vscroller.refresh();
		}, 100);
	};

	function initIScroll() {
		hscroller = new iScroll('wrapper', {
			fadeScrollbar: false,
			mouseWheel: true,
			hideScrollbar: true,
			lockDirection: false,
			bounce: false,
			vScroll: false,
			onScrollMove: function() {
				window.move = true;
			},
			onScrollStart: function() {
				hTimer = setInterval(function() {
					if (dateBarClass)
						dateBarClass.updateScroll(Math.abs(hscroller.x));
				}, 30);
			},
			onScrollEnd: function() {
				setTimeout(function() {
					window.move = false;
				}, 300);
				if (hTimer)
					clearInterval(hTimer);
				hTimer = null;
			}
		});
		hscroller.refresh();
		vscroller = new iScroll('contentWrapper', {
			fadeScrollbar: false,
			mouseWheel: true,
			hideScrollbar: true,
			bounce: false,
			lockDirection: false,
			hScrollbar: false,
			vScrollbar: false,
			hScroll: false,
			vScroll: true,
			onScrollMove: function() {
				window.move = true;
			},
			onScrollStart: function() {
				vTimer = setInterval(function() {
					if (legendaContent)
						legendaContent.style.top = (-Math.abs(vscroller.y))+"px";
				}, 30);
			},
			onScrollEnd: function() {
				setTimeout(function() {
					window.move = false;
				}, 300);
				if (vTimer)
					clearInterval(vTimer);
				vTimer = null;
			}
		});
		vscroller.refresh();
	};
	window.onresize = function(event) {
		initSizes();
		hscroller.refresh();
		vscroller.refresh();
	};
})(window, document);