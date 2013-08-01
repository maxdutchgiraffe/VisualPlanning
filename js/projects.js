(function(window, document) {
	function Projects(_json, _target, _info, _startDate, _pixelsADay) {
		var scope = this;
		MGClassRoot.call(this, _target);

		scope.$.json = _json;
		scope.$.data = [];
		scope.$.pixelsADay = _pixelsADay;
		scope.$.startDate = _startDate;
		scope.$.info = _info;
		scope.$.projects = [];
		scope._initSortByFase();
	}
	Projects.prototype = {
		_initSortByFase: function() {
			var scope = this;
			var t = new Date().getTime();
			var n = scope.$.json.projects.length;
			for (var i = 0; i < n; i++) {
				var m = scope.$.json.projects[i].taken.length;
				var prObj = {};
				prObj.klant = scope.$.json.projects[i].klant;
				prObj.projectnr = scope.$.json.projects[i].projectnr;
				prObj.name = scope.$.json.projects[i].name;
				prObj.color = scope.$.json.projects[i].color;
				prObj.ID = Utils.randomString(10);
				var taken = {};
				var tmp = JSON.stringify(scope.$.json.projects[i]);
				prObj.taken = [];
				for (var j = 0; j < m; j++) {
					var fase = scope.$.json.projects[i].taken[j].fase.toLowerCase();
					if (fase.length > 0) {
						var count = tmp.split('"fase":"' + fase);
						//console.log("fase count", fase, count.length - 1);
						scope.$.json.projects[i].taken[j].ID = Utils.randomString(10);
						if (count.length - 1 === 1)
							fase = "";
					}
					scope.$.json.projects[i].taken[j].ID = Utils.randomString(10);
					//////////
					var startDate = scope.$.json.projects[i].taken[j].startDate;
					var startDateTime = scope.$.json.projects[i].taken[j].startDateTime;
					var endDate = scope.$.json.projects[i].taken[j].endDate;
					var endDateTime = scope.$.json.projects[i].taken[j].endDateTime;
					//////////
					if (fase.length > 0) {
						if (taken[fase] === undefined) {
							taken[fase] = {
								taken: [],
								startDate: startDate,
								startDateTime: startDateTime,
								endDate: endDate,
								endDateTime: endDateTime,
								name: fase,
								ID: Utils.randomString(10)
							};
							prObj.taken.push(taken[fase]);
						}
						taken[fase].taken.push(scope.$.json.projects[i].taken[j]);
						if (taken[fase].startDateTime > startDateTime) {
							taken[fase].startDateTime = startDateTime;
							taken[fase].startDate = startDate;
						}
						if (taken[fase].endDateTime < endDateTime) {
							taken[fase].endDateTime = endDateTime;
							taken[fase].endDate = endDate;
						}
					} else {
						prObj.taken.push(scope.$.json.projects[i].taken[j]);
					}

				}
				scope.$.data.push(prObj);
			}
			scope._init();
		},

		_projectOpenEvent: function(event) {
			var scope = this;
			scope.dispatchListener({
				type: "sizeUpdate"
			});
		},

		_projectCloseEvent: function(event) {
			var scope = this;
			scope.dispatchListener({
				type: "sizeUpdate"
			});
		},

		_appendToContent: function(_id) {
			var scope = this;
			var frag = document.createDocumentFragment();
			var myDiv = document.createElement("div");
			myDiv.id = _id;
			frag.appendChild(myDiv);
			scope.$.target.appendChild(frag);
		},

		_init: function() {
			var scope = this;
			var n = scope.$.data.length;
			scope._appendToContent("projectSeperator");
			for (var i = 0; i < n; i++) {
				var pr = new ProjectBar(scope.$.data[i], scope.$.startDate, scope.$.pixelsADay, scope.$.target, scope.$.info);
				pr.addListener("open", scope._projectOpenEvent);
				pr.addListener("close", scope._projectCloseEvent);
				scope.$.projects.push(pr);
				if (i < n - 1) {
					scope._appendToContent("projectSeperator2");
				}
			};
			scope._appendToContent("projectSeperator");
		}
	};
	MGClassRoot.applyPrototype(Projects);
	window.Projects = Projects;
})(window, document);