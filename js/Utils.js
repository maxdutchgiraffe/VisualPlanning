(function(window) {
	function Utils() {};
	Utils.Head = null;
	Utils.addStyleToHead = function(_id, _css) {
		if (!Utils.Head) {
			Utils.Head = document.head || document.getElementsByTagName('head')[0];
		}
		var style = document.getElementById(_id);
		var exists = true;
		if (!style) {
			exists = false;
			style = document.createElement('style');
			style.id = _id;
		}
		if (!_css) {
			_css = "";
		}
		if (exists) {
			Utils.changeStyleTag(style, _css);
		} else {
			if (style.styleSheet) {
				style.styleSheet.cssText = _css;
			} else {
				style.appendChild(document.createTextNode(_css));
			}
		}
		if (!exists) {
			Utils.Head.appendChild(style);
		}
		return style;
	};
	Utils.createElement = function(_element, _id, _classes, _content, _appendTo) {
		var frag = document.createDocumentFragment(),
			el = document.createElement(_element);
		if (_id) {
			el.id = _id;
		}
		if (_classes && _classes.length > 0) {
			var n = _classes.length;
			for (var i = 0; i < n; i++) {
				el.classList.add(_classes[i]);
			};
		}
		if (_content) {
			el.innerHTML = _content;
		}
		frag.appendChild(el);
		if (_appendTo) {
			_appendTo.appendChild(frag);
		}
		return el;
	};
	Utils.changeStyleTag = function(_style, _css) {
		try {
			_style.innerHTML = _css;
		}
		//IE fix
		catch (error) {
			_style.styleSheet.cssText = _css;
		}
	}
	Utils.sortJsonArrayByProperty = function(objArray, prop, direction) {
		if (arguments.length < 2) throw new Error("sortJsonArrayByProp requires 2 arguments");
		var direct = arguments.length > 2 ? arguments[2] : 1; //Default to ascending

		if (objArray && objArray.constructor === Array) {
			var propPath = (prop.constructor === Array) ? prop : prop.split(".");
			objArray.sort(function(a, b) {
				for (var p in propPath) {
					if (a[propPath[p]] && b[propPath[p]]) {
						a = a[propPath[p]];
						b = b[propPath[p]];
					}
				}
				// convert numeric strings to integers
				a = a.match(/^\d+$/) ? +a : a;
				b = b.match(/^\d+$/) ? +b : b;
				return ((a < b) ? -1 * direct : ((a > b) ? 1 * direct : 0));
			});
		}
	}
	Utils.sortByKey = function(array, key) {
		return array.sort(function(a, b) {
			var x = a[key];
			var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}
	Utils.randomString = function(length) {
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		var str = "";
		for (var x = 0; x < length; x++) {
			var i = Math.floor(Math.random() * 62);
			str += chars.charAt(i);
		}
		return str;
	}

	window.Utils = Utils;
})(window);