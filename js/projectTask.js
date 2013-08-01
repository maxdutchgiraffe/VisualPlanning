(function(window) {
	function ProjectTask(_id, _name, _startDate, _endDate) {
		var id = _id;
		var name = _name
		var startSplit = _startDate.split("-");
		var endSplit = _endDate.split("-");
		var startDate = new Date(Date.UTC(startSplit[2], startSplit[1], startSplit[0]));
		var endDate = new Date(Date.UTC(endSplit[2], endSplit[1], endSplit[0]));
		this.getID = function() {
			return id;
		}

		this.getStartDate = function() {
			return startDate;
		}

		this.getEndDate = function() {
			return endDate;
		}
		this.getName = function() {
			return name;
		}
		this.getStartDateTime = startDate.getTime();

		this.getEndDateTime = endDate.getTime();
	}
	window.ProjectTask = ProjectTask;
})(window);