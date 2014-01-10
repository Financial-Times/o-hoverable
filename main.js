
var test = (function(win) {

	var hasContact = false, contactlessMoves = 0, lastClientX, lastClientY;
	var eventmap = [
		['touchstart', contactStart],
		['mousedown', contactStart],
		['mspointerdown', contactStart],
		['touchend',contactEnd],
		['mouseup', contactEnd],
		['mspointerup', contactEnd],
		['mousemove', contactMove],
		['mspointerhover', contactMove]
	];
	var className = 'o-hoverable-on';
	var doc = win.document;

	// If body has hover effects enabled, and appears to support touch, remove hover effects and start listening for pointer interactions
	function init(e) {
		if (classExists() && (('ontouchstart' in win) || (win.DocumentTouch && win.doc instanceof DocumentTouch))) {
			doc.body.className = doc.body.className.replace(className, '');
			if (e) listener('remove', 'DOMContentLoaded', init);
			eventmap.forEach(function(item) {
				listener('add', item[0], item[1]);
			});
		}
	}

	function contactStart(event) {
		hasContact = true;
		contactlessMoves = 0;
	}

	function contactEnd(event) {
		hasContact = false;
	}

	// If a contactless move (ie a hover) is detected, turn hover effects back on
	function contactMove(event) {
		if (!hasContact) {
			contactlessMoves++;
		}

		if ('mousemove' === event.type.toLowerCase()) {

			// COMPLEX:GC:20130322: Webkit can fire an erroneous mousemove under some conditions, so
			// keep a track of the clientX and clientY values, and reject events where these values don't change.
			if (lastClientX === event.clientX && lastClientY === event.clientY) {
				return;
			}
			lastClientX = event.clientX;
			lastClientY = event.clientY;
		}

		// MSPointerHover categorically means a contactless interaction
		if (contactlessMoves > 1 || event.type.toLowerCase() === 'mspointerhover') {
			doc.body.className += ' '+className;
			eventmap.forEach(function(item) {
				listener('remove', item[0], item[1]);
			});
		}
	}

	function listener(type, event, fn) {
		win[type+'EventListener'](event, fn, false);
	}

	function classExists() {
		var classPattern = new RegExp("^(.* )?"+className+"( .*)?$");
		return classPattern.test(doc.body.className);
	}

	if (doc.body) {
		init();
	} else {
		listener('add', 'DOMContentLoaded', init);
	}

	return {
		setClassName: function(str) {
			className = str;
		},
		isHoverEnabled: classExists
	}
}(window));
