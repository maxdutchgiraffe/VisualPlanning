(function(window) {
	function ColorUtils() {}
	var trimLeft = /^[\s,#]+/,
		trimRight = /\s+$/,
		tinyCounter = 0,
		math = Math,
		mathRound = math.round,
		mathMin = math.min,
		mathMax = math.max,
		mathRandom = math.random;

	//Utils.DayInMilliseconds = 1000*60*60*24;
	ColorUtils.shuffle = function(o) { //v1.0
		for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};
	ColorUtils.rgbaToHex = function(r, g, b, a, allow3Char) {

		var hex = [
			pad2(mathRound(r).toString(16)),
			pad2(mathRound(g).toString(16)),
			pad2(mathRound(b).toString(16)),
			pad2(mathRound(a).toString(16))
		];

		// Return a 3 character hex if possible
		if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
			return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
		}

		return hex.join("");
	}
	ColorUtils.rgb2hsv = function(r, g, b) {

		var computedH = 0;
		var computedS = 0;
		var computedV = 0;

		//remove spaces from input RGB values, convert to int
		var r = parseInt(('' + r).replace(/\s/g, ''), 10);
		var g = parseInt(('' + g).replace(/\s/g, ''), 10);
		var b = parseInt(('' + b).replace(/\s/g, ''), 10);

		if (r == null || g == null || b == null ||
			isNaN(r) || isNaN(g) || isNaN(b)) {
			alert('Please enter numeric RGB values!');
			return;
		}
		if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
			alert('RGB values must be in the range 0 to 255.');
			return;
		}
		r = r / 255;
		g = g / 255;
		b = b / 255;
		var minRGB = Math.min(r, Math.min(g, b));
		var maxRGB = Math.max(r, Math.max(g, b));

		// Black-gray-white
		if (minRGB == maxRGB) {
			computedV = minRGB;
			return [0, 0, computedV];
		}

		// Colors other than black-gray-white:
		var d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
		var h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);
		computedH = 60 * (h - d / (maxRGB - minRGB));
		computedS = (maxRGB - minRGB) / maxRGB;
		computedV = maxRGB;
		return {
			h: computedH,
			s: computedS*100,
			v: computedV*100
		};
	}
	ColorUtils.hexToRgb = function(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
	/**
	 * HSV to RGB color conversion
	 *
	 * H runs from 0 to 360 degrees
	 * S and V run from 0 to 100
	 *
	 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
	 * http://www.cs.rit.edu/~ncs/color/t_convert.html
	 */
	ColorUtils.hsvToRgb = function(h, s, v) {
		var r, g, b;
		var i;
		var f, p, q, t;

		// Make sure our arguments stay in-range
		h = Math.max(0, Math.min(360, h));
		s = Math.max(0, Math.min(100, s));
		v = Math.max(0, Math.min(100, v));

		// We accept saturation and value arguments from 0 to 100 because that's
		// how Photoshop represents those values. Internally, however, the
		// saturation and value are calculated from a range of 0 to 1. We make
		// That conversion here.
		s /= 100;
		v /= 100;

		if (s == 0) {
			// Achromatic (grey)
			r = g = b = v;
			return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
		}

		h /= 60; // sector 0 to 5
		i = Math.floor(h);
		f = h - i; // factorial part of h
		p = v * (1 - s);
		q = v * (1 - s * f);
		t = v * (1 - s * (1 - f));

		switch (i) {
			case 0:
				r = v;
				g = t;
				b = p;
				break;

			case 1:
				r = q;
				g = v;
				b = p;
				break;

			case 2:
				r = p;
				g = v;
				b = t;
				break;

			case 3:
				r = p;
				g = q;
				b = v;
				break;

			case 4:
				r = t;
				g = p;
				b = v;
				break;

			default: // case 5:
				r = v;
				g = p;
				b = q;
		}

		return {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255)
		};
	}


	function flip(o) {
		var flipped = {};
		for (var i in o) {
			if (o.hasOwnProperty(i)) {
				flipped[o[i]] = i;
			}
		}
		return flipped;
	}

	// Take input from [0, n] and return it as [0, 1]

	function bound01(n, max) {
		if (isOnePointZero(n)) {
			n = "100%";
		}

		var processPercent = isPercentage(n);
		n = mathMin(max, mathMax(0, parseFloat(n)));

		// Automatically convert percentage into number
		if (processPercent) {
			n = parseInt(n * max, 10) / 100;
		}

		// Handle floating point rounding errors
		if ((math.abs(n - max) < 0.000001)) {
			return 1;
		}

		// Convert into [0, 1] range if it isn't already
		return (n % max) / parseFloat(max);
	}

	// Force a number between 0 and 1

	function clamp01(val) {
		return mathMin(1, mathMax(0, val));
	}

	// Parse an integer into hex

	function parseHex(val) {
		return parseInt(val, 16);
	}

	// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
	// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>

	function isOnePointZero(n) {
		return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
	}

	// Check to see if string passed in is a percentage

	function isPercentage(n) {
		return typeof n === "string" && n.indexOf('%') != -1;
	}

	// Force a hex value to have 2 characters

	function pad2(c) {
		return c.length == 1 ? '0' + c : '' + c;
	}

	// Replace a decimal with it's percentage value

	function convertToPercentage(n) {
		if (n <= 1) {
			n = (n * 100) + "%";
		}

		return n;
	}
	window.ColorUtils = ColorUtils;
})(window);