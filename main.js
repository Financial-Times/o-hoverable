/* globals DocumentTouch */
'use strict';

function Hoverable() {

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
	var classList;
	var win = window;

	function init() {
		win.document.documentElement.setAttribute('data-o-hoverable--js', '');
		touchSupport();
	}

	function updateClasses(action) {
		document.body.classList[action](className); // deprecated
		document.documentElement.classList[action](className);
	}

	// If body has hover effects enabled, and appears to support touch, remove hover effects and start listening for pointer interactions
	function touchSupport() {
		if (classExists() && (('ontouchstart' in win) || (win.DocumentTouch && win.doc instanceof DocumentTouch))) {
			updateClasses('remove');
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
			updateClasses('add');
			eventmap.forEach(function(item) {
				listener('remove', item[0], item[1]);
			});
		}
	}

	function listener(type, event, fn) {
		win[type + 'EventListener'](event, fn, false);
	}

	function classExists() {
		return classList.contains(className);
	}

	function destroy() {
		win.document.documentElement.removeAttribute('data-o-hoverable--js');
		eventmap.forEach(function(item) {
			listener('remove', item[0], item[1]);
		});
	}

	init();

	return {
		setClassName: function(str) {
			className = str;
			touchSupport();
		},
		destroy: destroy,
		isHoverEnabled: classExists
	};
}

Hoverable.init = function() {
	if (!window.document.documentElement.hasAttribute('data-o-hoverable--js')) {
		document.removeEventListener('o.DOMContentLoaded', Hoverable.init);
		return new Hoverable();
	}
};

document.addEventListener('o.DOMContentLoaded', Hoverable.init);

module.exports = Hoverable;
