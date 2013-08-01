(function(window, document) {
	function ProjectFase(_target, _data, _rgbColor, _pixelsADay) {
		MGClassRoot.call(this, _target);
		var scope = this;
		scope.$.data = _data;
		scope.$.tasks = _data.taken;
		scope.$.rgbColor = _rgbColor;
		scope.$.hsvColor = ColorUtils.rgb2hsv(_rgbColor.r, _rgbColor.g, _rgbColor.b);
		scope.$.pixelsADay = _pixelsADay;
		scope.$.ul = null;
		scope.$.h2 = _target.getElementsByTagName("h2")[0];
		scope.$.isOpen = false;
		scope.$.bars = [];
		scope.$.rgbColor = ColorUtils.hsvToRgb(scope.$.hsvColor.h, scope.$.hsvColor.s, 80);
		scope._init();
		scope._initTasks();
	}
	ProjectFase.prototype = {
		_init: function() {
			var scope = this,
				darkRGB = ColorUtils.hsvToRgb(scope.$.hsvColor.h, scope.$.hsvColor.s, 60),
				frag = document.createDocumentFragment(),
				ul = document.createElement("ul");
			ul.id = scope.$.data.ID;
			frag.appendChild(ul);
			scope.$.target.appendChild(frag);
			scope.$.ul = ul;
			scope.$.ul.style.backgroundColor = "rgba(" + Math.round(darkRGB.r) + "," + Math.round(darkRGB.g) + "," + Math.round(darkRGB.b) + "," + 0.1 + ")";
			ul.classList.add("projectFase");
			ul.classList.add("projectTrans");
		},
		_initLI: function(_classes, _taskElement) {
			var scope = this,
				darkRGB = ColorUtils.hsvToRgb(scope.$.hsvColor.h, scope.$.hsvColor.s, 80),
				frag = document.createDocumentFragment(),
				li = document.createElement("li"),
				h2 = document.createElement("h2");
			for (var i = 0; i < _classes.length; i++) {
				li.classList.add(_classes[i]);
			};
			li.style.backgroundColor = "rgba(" + Math.round(darkRGB.r) + "," + Math.round(darkRGB.g) + "," + Math.round(darkRGB.b) + "," + 1 + ")";
			h2.textContent = _taskElement.name;
			li.appendChild(h2);
			frag.appendChild(li);
			scope.$.ul.appendChild(frag);
			return {
				li: li,
				h2: h2
			};
		},
		_initTasks: function() {
			var scope = this,
				n = scope.$.tasks.length,
				tasks = scope.$.tasks,
				firstDateTime = scope.$.tasks[0].startDateTime;
			for (var i = 0; i < n; i++) {
				var startDateTime = tasks[i].startDateTime,
					endDateTime = tasks[i].endDateTime,
					lo = (startDateTime - firstDateTime) / DateUtils.DayInMilliseconds,
					w2 = (endDateTime - startDateTime + DateUtils.DayInMilliseconds) / DateUtils.DayInMilliseconds,
					bar = scope._initLI(["bar", "task", "faseBar", "bar" + tasks[i].ID], tasks[i]),
					h2 = bar.h2,
					h2Width = h2.getElementWidth();
				scope.$.bars.push(bar);
				h2.style.color = "rgba(100,100,100,0)";
				h2.style.width = h2Width + "px";
				h2.style.left = (-h2Width - 10) + "px";
				h2.classList.add("colorTrans");
				h2.classList.add("faseTitle");
				bar.li.style.left = (lo * scope.$.pixelsADay) + "px";
				bar.li.style.width = (w2 * scope.$.pixelsADay) + "px";
				bar.li.classList.add("taskTrans");
			};
		},
		openFase: function() {
			var scope = this,
				ul = scope.$.ul,
				n = scope.$.bars.length,
				h2 = scope.$.h2,
				holder = scope.$.target,
				bars = scope.$.bars;
			h2.style.color = "rgba(100,100,100,0)";
			for (var i = 0; i < n; i++) {
				bars[i].li.style.top = (i * 30) + "px";
				bars[i].h2.style.color = "rgba(100,100,100,1)";
			};
			ul.style.height = ((n * 30) - 5) + "px";
			scope.$.isOpen = true;
		},
		closeFase: function() {
			var scope = this,
				ul = scope.$.ul,
				n = scope.$.bars.length,
				h2 = scope.$.h2,
				holder = scope.$.target,
				bars = scope.$.bars;
			h2.style.color = "rgba(100,100,100,1)";
			for (var i = 0; i < n; i++) {
				bars[i].li.style.top = 0;
				bars[i].h2.style.color = "rgba(100,100,100,0)";
			};
			ul.style.height = 25 + "px";
			scope.$.isOpen = false;
		},
		hideTitles: function() {
			var scope = this,
				holder = scope.$.target,
				h2 = holder.getElementsByTagName("h2"),
				n = h2.length;
			for (var i = 0; i < n; i++) {
				h2[i].style.color = "rgba(100,100,100,0)";
			};
		}
	};
	MGClassRoot.applyPrototype(ProjectFase);
	window.ProjectFase = ProjectFase;
})(window, document);