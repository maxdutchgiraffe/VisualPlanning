(function(window) {
	function MGClassRoot(_target) {
		this._listeners = {};
		this.$ = {
			target: _target
		};
	}

	MGClassRoot.prototype = {

		constructor: MGClassRoot,

		addListener: function(type, listener) {
			if (typeof this._listeners[type] == "undefined") {
				this._listeners[type] = [];
			}

			this._listeners[type].push(listener);
		},

		dispatchListener: function(event) {
			if (typeof event == "string") {
				event = {
					type: event
				};
			}
			if (!event.target) {
				event.target = this;
			}

			if (!event.type) { //falsy
				throw new Error("Event object missing 'type' property.");
			}

			if (this._listeners[event.type] instanceof Array) {
				var listeners = this._listeners[event.type];
				for (var i = 0, len = listeners.length; i < len; i++) {
					listeners[i].call(this, event);
				}
			}
		},

		removeListener: function(type, listener) {
			if (this._listeners[type] instanceof Array) {
				var listeners = this._listeners[type];
				for (var i = 0, len = listeners.length; i < len; i++) {
					if (listeners[i] === listener) {
						listeners.splice(i, 1);
						break;
					}
				}
			}
		}
	};
	MGClassRoot.applyPrototype = function(_class) {
		for (var i in MGClassRoot.prototype) {
			_class.prototype[i] = MGClassRoot.prototype[i];
		}
		_class.prototype.constructor = _class;
	}
	window.MGClassRoot = MGClassRoot;
}(window));