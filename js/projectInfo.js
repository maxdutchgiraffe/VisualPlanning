(function(window) {
	function ProjectInfo(_data, _target, _totalTasks) {
		MGClassRoot.call(this, _target);
		var scope = this;
		scope.$.data = _data;
		scope.$.id = _data.ID;
		scope.$.rgbColor = ColorUtils.hexToRgb(_data.color);
		scope.$.hsvColor = ColorUtils.rgb2hsv(scope.$.rgbColor.r, scope.$.rgbColor.g, scope.$.rgbColor.b);
		scope.$.tasks = _data.taken
		scope.$.totalTasks = _totalTasks
		scope.$.isOpen = false;
		scope.$.element = Utils.createElement("div", scope.$.id + "Info", ["projectIndex"], null, _target); //$("#" + scope.$.id + "Info");
		scope.$.bg = Utils.createElement("div", null, ["bg"], null, scope.$.element);
		/////
		scope.$.bgAfter = Utils.createElement("div", null, ["bgAfter"], null, scope.$.element);
		/////
		scope.$.infoContent = Utils.createElement("div", null, ["infoContent"], null, scope.$.element);
		scope.$.totalHeight = 25;
		//_info.append("<div id=" + scope.$.id + "Info" + " class='projectIndex'><div class='bg'></div><div class='bgAfter'></div><div class='infoContent'></div></div>");
		scope._init();
	}


	ProjectInfo.prototype = {
		_init: function() {
			var scope = this;
			var darkRGB = ColorUtils.hsvToRgb(scope.$.hsvColor.h, scope.$.hsvColor.s, 70);
			//darkRGB.r = 25;
			var klant = Utils.createElement("h2", null, null, scope.$.data.klant, scope.$.infoContent);
			var name = Utils.createElement("h2", null, null, scope.$.data.name, scope.$.infoContent);
			var tasks = Utils.createElement("h2", null, null, scope.$.totalTasks, scope.$.infoContent);
			klant.style.top = 6 + "px";
			name.style.top = (6 + 6) + "px";
			tasks.style.top = (6 + 6 + 6) + "px";
			/*scope.$.infoContent.append("<h2>" + scope.$.data.klant + "</h2>");
			scope.$.infoContent.append("<h2>" + scope.$.data.name + "</h2>");
			scope.$.infoContent.append("<h2>" + scope.$.totalTasks + " taken</h2>");*/
			/*scope.$.infoContent
				.find("h2")
				.each(function(index) {
					$(this)
						.css("top", 6 + (index * 6));
				});*/
			scope.$.bg.style.backgroundColor = "rgba(" + Math.round(scope.$.rgbColor.r) + "," + Math.round(scope.$.rgbColor.g) + "," + Math.round(scope.$.rgbColor.b) + "," + 1 + ")";
			scope.$.bg.classList.add("projectTrans");
				/*.css("background-color", "rgba(" + Math.round(scope.$.rgbColor.r) + "," + Math.round(scope.$.rgbColor.g) + "," + Math.round(scope.$.rgbColor.b) + "," + 1 + ")")
				.addClass("projectTrans");*/
			scope.$.bgAfter.style.borderColor = "rgba(" + Math.round(darkRGB.r) + "," + Math.round(darkRGB.g) + "," + Math.round(darkRGB.b) + "," + 1 + ") transparent transparent transparent";
			/*scope.$.element
				.find(" > .bgAfter").css("border-color", "rgba(" + Math.round(darkRGB.r) + "," + Math.round(darkRGB.g) + "," + Math.round(darkRGB.b) + "," + 1 + ") transparent transparent transparent");*/

			$(scope.$.element).single_double_click(function() {
				if (scope.$.isOpen) {
					scope.closeProject(25);
				} else {
					scope.openProject((scope.$.data.taken.length * 30) - 5);
				}
			}, function() {
				scope.openProjectAll((scope.$.totalTasks * 30) - 5);
			});
		},

		openProject: function(_newHeight) {
			var scope = this;
			scope.$.bg.style.height = _newHeight + "px";
			scope.$.infoContent.style.height = _newHeight + "px";
			if (!scope.$.isOpen) {
				scope.$.isOpen = true;
				scope.dispatchListener("open");
			}
		},

		openProjectAll: function(_newHeight) {
			var scope = this;
			scope.dispatchListener("openAll");
		},

		closeProject: function() {
			var scope = this;
			if (!scope.$.isOpen) {
				return;
			}
			scope.$.bg.style.height = 25 + "px";
			scope.$.infoContent.style.height = 25 + "px";
			scope.$.isOpen = false;
			scope.dispatchListener("close");
		}
	};
	/*ProjectInfo.prototype = new EventTarget();
	ProjectInfo.prototype.constructor = ProjectInfo;
	ProjectInfo.prototype.openProject = openProject;
	ProjectInfo.prototype.openProjectAll = openProjectAll;
	ProjectInfo.prototype.closeProject = closeProject;*/
	MGClassRoot.applyPrototype(ProjectInfo);
	window.ProjectInfo = ProjectInfo;
})(window);