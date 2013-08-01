(function(window) {

	function ProjectBar(_data, _startDate, _pixelsADay, _target, _info) {
		MGClassRoot.call(this, _target);
		var scope = this;
		scope.$.data = _data;
		scope.$.rgbColor = ColorUtils.hexToRgb(_data.color);
		scope.$.id = _data.ID;
		scope.$.info = _info;
		scope.$.startDate = _startDate;
		scope.$.pixelsADay = _pixelsADay;
		scope.$.tasks = _data.taken;
		scope.$.projectStartDate = _data.taken;
		scope.$.projectEndDate = _data.taken;
		scope.$.isOpen = false;
		scope.$.fases = [];
		scope.$.faseIDs = [];
		scope.$.totalHeight = 25;
		scope.$.totalTasks = 0;
		scope.$.projectElement = null;
		scope.$.projectH2 = null;
		scope.$.bars = [];
		scope.$.taskBars = [];
		scope.$.faseBars = [];
		scope.$.projectInfo = null;
		scope._sortDates();
		scope._init();
	};
	ProjectBar.prototype = {
		_init: function() {
			var scope = this,
				frag = document.createDocumentFragment(),
				ul = document.createElement("ul"),
				leftOffset = (scope.$.projectStartDate - scope.$.startDate) / DateUtils.DayInMilliseconds,
				w = (scope.$.projectEndDate - scope.$.projectStartDate) / DateUtils.DayInMilliseconds;
			ul.id = scope.$.data.ID;
			ul.classList.add("project");
			frag.appendChild(ul);
			scope.$.target.appendChild(frag);
			ul.style.left = (leftOffset * scope.$.pixelsADay) + "px";
			ul.style.width = (w * scope.$.pixelsADay) + "px";
			ul.style.backgroundColor = "rgba(" + Math.round(scope.$.rgbColor.r) + "," + Math.round(scope.$.rgbColor.g) + "," + Math.round(scope.$.rgbColor.b) + "," + 0.1 + ")";
			$(ul).single_double_click(function(event) {
				if (!window.move) {
					scope._barClickEvent.call(scope, event);
				}
			}, function(event) {
				scope._barDoubleClickEvent.call(scope, event);
			});
			var frag = document.createDocumentFragment(),
				h2 = document.createElement("h2");
			h2.textContent = scope.$.data.name;
			frag.appendChild(h2);
			ul.appendChild(frag);
			var h2Width = h2.getElementWidth();
			h2.style.left = (-h2Width - 10) + "px";
			h2.classList.add("colorTrans");
			scope.$.projectH2 = h2;
			scope.$.projectElement = ul;
			scope._initTasks();
			scope._initProjectInfo();
		},
		_initLI: function(_classes, _taskElement) {
			var scope = this,
				frag = document.createDocumentFragment(),
				li = document.createElement("li"),
				h2 = document.createElement("h2");
			h2.textContent = _taskElement.name;
			for (var i = 0; i < _classes.length; i++) {
				li.classList.add(_classes[i]);
			};
			li.appendChild(h2);
			frag.appendChild(li);
			scope.$.projectElement.appendChild(frag);
			return {
				li: li,
				h2: h2
			};
		},
		_initTasks: function() {
			var scope = this,
				firstDateTime = scope.$.tasks[0].startDateTime,
				n = scope.$.tasks.length;
			for (var i = 0; i < n; i++) {
				var startDateTime = scope.$.tasks[i].startDateTime,
					endDateTime = scope.$.tasks[i].endDateTime,
					lo = (startDateTime - firstDateTime) / DateUtils.DayInMilliseconds,
					w2 = (endDateTime - startDateTime + DateUtils.DayInMilliseconds) / DateUtils.DayInMilliseconds,
					bar,
					projectFase;
				if (scope.$.tasks[i].taken) {
					bar = scope._initLI(["bar", "fase", "bar" + scope.$.tasks[i].ID], scope.$.tasks[i]);
					projectFase = new ProjectFase(bar.li, scope.$.tasks[i], scope.$.rgbColor, scope.$.pixelsADay);
					scope.$.totalTasks += projectFase.$.tasks.length;
					scope.$.fases.push(projectFase);
					scope.$.faseIDs.push(scope.$.tasks[i].ID);
					scope.$.faseBars.push(bar);
				} else {
					scope.$.totalTasks++;
					bar = scope._initLI(["bar", "task", "bar" + scope.$.tasks[i].ID], scope.$.tasks[i]);
					scope.$.taskBars.push(bar);
				}
				scope.$.bars.push(bar);
				var h2 = bar.h2,
					h2Width = h2.getElementWidth();
				h2.style.color = "rgba(100,100,100,0)";
				h2.style.width = h2Width + "px";
				h2.style.left = (-h2Width - 10) + "px";
				h2.classList.add("colorTrans");
				bar.li.style.left = (lo * scope.$.pixelsADay) + "px";
				bar.li.style.width = (w2 * scope.$.pixelsADay) + "px";
				bar.li.classList.add("taskTrans");
			};
			//scope.$.projectElement.style.backgroundColor = "background-color", "rgba(" + Math.round(scope.$.rgbColor.r) + "," + Math.round(scope.$.rgbColor.g) + "," + Math.round(scope.$.rgbColor.b) + "," + 0.1 + ")";

			var tasks = scope.$.taskBars,
				bars = scope.$.bars,
				n = tasks.length,
				m = bars.length;
			for (var i = 0; i < n; i++) {
				tasks[i].li.style.backgroundColor = "rgba(" + Math.round(scope.$.rgbColor.r) + "," + Math.round(scope.$.rgbColor.g) + "," + Math.round(scope.$.rgbColor.b) + "," + 1 + ")";
			}
			scope.$.projectElement.classList.add("projectTrans");

		},
		_initProjectInfo: function() {
			var scope = this;
			scope.$.projectInfo = new ProjectInfo(scope.$.data, scope.$.info, scope.$.totalTasks);
			scope.$.projectInfo.addListener("open", function() {
				scope.openProject();
			});
			scope.$.projectInfo.addListener("openAll", function() {
				scope.openProjectAll();
			});
			scope.$.projectInfo.addListener("close", function() {
				scope.closeProject();
			});
		},

		_sortDates: function() {
			var scope = this;
			var n = scope.$.tasks.length;
			var dates = [];
			for (var i = 0; i < n; i++) {
				dates.push(scope.$.tasks[i].startDateTime);
				dates.push(scope.$.tasks[i].endDateTime);
			};
			dates.sort();

			scope.$.projectStartDate = dates[0];
			scope.$.projectEndDate = dates[dates.length - 1] + DateUtils.DayInMilliseconds;
			//console.log(scope.$.projectStartDate, scope.$.projectEndDate);
		},

		_barClickEvent: function(event) {
			var scope = this;
			if (scope.$.isOpen) {
				var trgt = event.target;
				//console.log(trgt, trgt.classList);
				if (trgt.classList.contains("faseBar") || trgt.classList.contains("faseTitle") || trgt.classList.contains("projectFase")) {
					if (trgt.classList.contains("faseBar")) {
						trgt = trgt.parentNode;
					}
					if (trgt.classList.contains("faseTitle")) {
						trgt = trgt.parentNode.parentNode;
					}
					var id = trgt.id,
						index = scope.$.faseIDs.indexOf(id),
						projectFase = scope.$.fases[index],
						faseTasks = projectFase.$.tasks.length,
						fh = ((faseTasks * 30) - 5) - 25;
					if (projectFase.$.isOpen) {
						projectFase.closeFase();
						scope.$.totalHeight -= fh;
						scope.$.projectElement.style.height = scope.$.totalHeight + "px";
						scope._positionElements(trgt.parentNode, 25);
					} else {
						projectFase.openFase();
						scope.$.totalHeight += fh;
						scope.$.projectElement.style.height = scope.$.totalHeight + "px";
						scope._positionElements(trgt.parentNode, fh + 25);
					}
					//scope.$.projectInfo.openProject(scope.$.totalHeight);
				} else {
					scope.closeProject();
				}
			} else {
				scope.openProject();
			}
		},

		_barDoubleClickEvent: function(event) {
			var scope = this;
			scope.openProjectAll();
		},

		_positionElements: function(_trgt, _height) {
			var scope = this,
				t = 0,
				projectElement = scope.$.projectElement,
				faseBars = scope.$.faseBars,
				fases = scope.$.fases,
				bars = scope.$.bars,
				n = bars.length;
			for (var i = 0; i < n; i++) {
				bars[i].li.style.top = t + "px";
				if (bars[i].li === _trgt) {
					t += _height + 5;
				} else {
					var index = faseBars.indexOf(bars[i]);
					if (index > -1) {
						t += fases[index].$.isOpen ? (fases[index].$.tasks.length * 30) : 30;
					} else {
						t += 30;
					}
				}
			};
		},

		openProject: function() {
			var scope = this;
			if (scope.$.isOpen)
				return;
			scope.$.isOpen = true;
			var projectElement = scope.$.projectElement,
				n = scope.$.bars.length,
				th = 0,
				h2 = scope.$.projectH2,
				bars = scope.$.bars;
			h2.style.color = "rgba(100,100,100,0)";
			for (var i = 0; i < n; i++) {
				bars[i].li.style.top = (i * 30) + "px";
				bars[i].h2.style.color = "rgba(100,100,100,1)";
			};
			th = (n * 30) - 5;
			scope.$.totalHeight = th;
			projectElement.style.height = th + "px";
			scope.$.projectInfo.openProject(th);
			scope.dispatchListener({
				type: "open"
			});
		},

		openProjectAll: function() {
			var scope = this,
				bars = scope.$.bars,
				n = bars.length,
				th = 0,
				totalTasks = 0,
				top = 0;
			scope.$.isOpen = true;
			scope.$.projectH2.style.color = "rgba(100,100,100,0)";
			for (var i = 0; i < n; i++) {
				var li = bars[i].li;
				li.style.top = top + "px";
				if (li.classList.contains("fase")) {
					var index = scope.$.faseBars.indexOf(bars[i]);
					scope.$.fases[index].openFase();
					totalTasks += scope.$.fases[index].$.tasks.length;
					top += scope.$.fases[index].$.tasks.length * 30;
				} else {
					bars[i].h2.style.color = "rgba(100,100,100,1)";
					totalTasks++;
					top += 30;
				}
			};
			th = (totalTasks * 30) - 5;
			scope.$.totalHeight = th;
			scope.$.projectElement.style.height = th + "px";
			scope.$.projectInfo.openProject(th);
			scope.dispatchListener({
				type: "open"
			});
		},

		closeProject: function() {
			var scope = this;
			if (!scope.$.isOpen)
				return;
			scope.$.isOpen = false;
			var projectElement = scope.$.projectElement,
				n = scope.$.bars.length,
				th = 0,
				h2 = scope.$.projectH2,
				fases = scope.$.fases,
				m = fases.length,
				bars = scope.$.bars;
			h2.style.color = "rgba(100,100,100,1)";
			for (var i = 0; i < n; i++) {
				bars[i].li.style.top = 0 + "px";
				bars[i].h2.style.color = "rgba(100,100,100,0)";
			};
			for (var j = 0; j < m; j++) {
				fases[j].closeFase();
				fases[j].hideTitles();
			};
			th = 25;
			scope.$.projectElement.style.height = th + "px";
			scope.$.projectInfo.closeProject(th);
			scope.dispatchListener({
				type: "close"
			});
		},

		updateSize: function(_pixelsADay) {
			/*var scope = this;
			scope.$.pixelsADay = _pixelsADay;
			var tasks = scope.$.tasks,
				startDate = tasks[0].getStartDateTime,
				endDate = tasks[tasks.length - 1].getEndDateTime + DateUtils.DayInMilliseconds,
				leftOffset = (startDate - scope.$.startDate) / DateUtils.DayInMilliseconds,
				w = (endDate - startDate) / DateUtils.DayInMilliseconds,
				pad = scope.$.pixelsADay,
				projectElement = scope.$.projectElement,
				n = tasks.length;
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
				.addClass("taskTrans");*/
		}
	};
	MGClassRoot.applyPrototype(ProjectBar);
	window.ProjectBar = ProjectBar;
})(window);