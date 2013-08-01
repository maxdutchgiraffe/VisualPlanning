(function(window) {
	function JSONData() {
		MGClassRoot.call(this, null);
		/*
		var __data = {
			"projects": [{
				"klant": "",
				"projectnr": "",
				"name": "",
				"color":"",
				"taken": [{
					"startDate": "",
					"endDate": "",
					"fase": "",
					"name": "",
					"assigned": [{"name":"", "amount":"0-100"}],
					"type": ""
				}]
			}]
		}
		*/
		var __data = {
			"projects": [{
				"klant": "Brabant",
				"projectnr": "10",
				"name": "Brabant Magazine 10",
				"color": "#a200ff",
				"taken": [{
					"startDate": "10-6-2013",
					"endDate": "10-6-2013",
					"fase": "concept",
					"name": "Briefing",
					"assigned": [{
						"name": "Martijn",
						"amount": "100"
					}, {
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}, {
						"name": "Michel",
						"amount": "100"
					}],
					"type": "task"
				}, {
					"startDate": "11-6-2013",
					"endDate": "17-6-2013",
					"fase": "concept",
					"name": "Concept ontwikkeling",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}],
					"type": "task"
				}, {
					"startDate": "17-6-2013",
					"endDate": "17-6-2013",
					"fase": "concept",
					"name": "Concept naar Marlies",
					"assigned": [{
						"name": "Martijn",
						"amount": "100"
					}, {
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "18-6-2013",
					"endDate": "18-6-2013",
					"fase": "concept",
					"name": "Presentatie concept",
					"assigned": [{
						"name": "Martijn",
						"amount": "100"
					}, {
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "task"
				}, {
					"startDate": "4-7-2013",
					"endDate": "4-7-2013",
					"fase": "aanlevering",
					"name": "Beelden en teksten binnen",
					"assigned": [{
						"name": "Michel",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "5-7-2013",
					"endDate": "5-7-2013",
					"fase": "aanlevering",
					"name": "Feedback content",
					"assigned": [{
						"name": "Michel",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}, {
						"name": "Martijn",
						"amount": "100"
					}, {
						"name": "Robin",
						"amount": "100"
					}],
					"type": "task"
				}, {
					"startDate": "9-7-2013",
					"endDate": "9-7-2013",
					"fase": "aanlevering",
					"name": "OntbrekendDatee content binnen",
					"assigned": [{
						"name": "Michel",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}]
			}, {
				"klant": "Actiz",
				"projectnr": "4",
				"name": "Actiz 2013 #4",
				"color": "#ffa800",
				"taken": [{
					"startDate": "23-7-2013",
					"endDate": "23-7-2013",
					"fase": "aanlevering",
					"name": "Aanlevering content deel 1",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "29-7-2013",
					"endDate": "2-8-2013",
					"fase": "",
					"name": "Content & bouw deel 1",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}],
					"type": "task"
				}, {
					"startDate": "5-8-2013",
					"endDate": "5-8-2013",
					"fase": "oplevering",
					"name": "Oplevering deel 1",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "14-8-2013",
					"endDate": "14-8-2013",
					"fase": "aanlevering",
					"name": "Aanlevering content deel 2 + pilots",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "80"
					}],
					"type": ""
				}, {
					"startDate": "15-8-2013",
					"endDate": "21-8-2013",
					"fase": "",
					"name": "Content & Bouw deel 2",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}],
					"type": "task"
				}, {
					"startDate": "22-8-2013",
					"endDate": "22-8-2013",
					"fase": "oplevering",
					"name": "Oplevering deel 2",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "2-9-2013",
					"endDate": "2-9-2013",
					"fase": "feedback",
					"name": "Feedback eerste oplevering",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "6-9-2013",
					"endDate": "9-9-2013",
					"fase": "feedback",
					"name": "Verwerken feedback",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}],
					"type": "task"
				}, {
					"startDate": "10-9-2013",
					"endDate": "10-9-2013",
					"fase": "",
					"name": "iPad conversie",
					"assigned": [{
						"name": "Mark",
						"amount": "100"
					}],
					"type": ""
				}, {
					"startDate": "10-9-2013",
					"endDate": "10-9-2013",
					"fase": "",
					"name": "Banners ontwerp",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}],
					"type": ""
				}, {
					"startDate": "11-9-2013",
					"endDate": "11-9-2013",
					"fase": "oplevering",
					"name": "Oplevering magazine",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "18-9-2013",
					"endDate": "18-9-2013",
					"fase": "oplevering",
					"name": "Magazine live",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}]
			}, {
				"klant": "Actiz",
				"projectnr": "5",
				"name": "Actiz 2013 #5",
				"color": "#00aeff",
				"taken": [{
					"startDate": "30-10-2013",
					"endDate": "30-10-2013",
					"fase": "algemeen",
					"name": "Pilots aantal foodstep",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "80"
					}],
					"type": "milestone"
				}, {
					"startDate": "5-11-2013",
					"endDate": "6-11-2013",
					"fase": "pilot",
					"name": "Brandedspreads + Achtergrond",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Martijn",
						"amount": "100"
					}],
					"type": "task"
				}, {
					"startDate": "12-11-2013",
					"endDate": "12-11-2013",
					"fase": "algemeen",
					"name": "Aanlevering Content Foodstep",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "80"
					}],
					"type": "milestone"
				}, {
					"startDate": "13-11-2013",
					"endDate": "22-11-2013",
					"fase": "algemeen",
					"name": "Content & Bouw",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}],
					"type": "task"
				}, {
					"startDate": "19-11-2013",
					"endDate": "19-11-2013",
					"fase": "oplevering",
					"name": "Oplevering eerste versie",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "20-11-2013",
					"endDate": "20-11-2013",
					"fase": "oplevering",
					"name": "Feedback Foodstep",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "25-11-2013",
					"endDate": "25-11-2013",
					"fase": "oplevering",
					"name": "Oplevering magazine",
					"assigned": [{
						"name": "Robin",
						"amount": "100"
					}, {
						"name": "Mark",
						"amount": "100"
					}],
					"type": "milestone"
				}, {
					"startDate": "25-11-2013",
					"endDate": "25-11-2013",
					"fase": "oplevering",
					"name": "iPad conversie",
					"assigned": [{
						"name": "Mark",
						"amount": "100"
					}],
					"type": "task"
				}]
			}]

		};
		console.log(__data);
		JSONData.data = __data;
	}
	JSONData.data = "empty";
	JSONData.prototype = {
		load: function() {
			var scope = this;
			scope.dispatchListener({
				type: "complete",
				data: JSONData.data
			});
		}
	};
	MGClassRoot.applyPrototype(JSONData);
	window.JSONData = JSONData;
})(window);