/* globals DocumentTouch */
'use strict';

function Hoverable() {

	var hasContact = false;
	var contactlessMoves = 0;
	var lastClientX;
	var lastClientY;
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
	var htmlClassList;
	var bodyClassList; // Legacy

	function init() {
		window.document.documentElement.setAttribute('data-o-hoverable--js', '');
		window.document.body.setAttribute('data-o-hoverable--js', '');
		touchSupport();
	}

	// If body has hover effects enabled, and appears to support touch, remove hover effects and start listening for pointer interactions
	function touchSupport() {
		htmlClassList = window.document.documentElement.classList;
		bodyClassList = window.document.body.classList;

		if (classExists() && (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
			htmlClassList.remove(className);
			bodyClassList.remove(className);

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
			htmlClassList.add(className);
			bodyClassList.add(className);

			eventmap.forEach(function(item) {
				listener('remove', item[0], item[1]);
			});
		}
	}

	function listener(type, event, fn) {
		window[type + 'EventListener'](event, fn, false);
	}

	function classExists() {
		return htmlClassList.contains(className) || bodyClassList.contains(className);
	}

	function destroy() {
		window.document.documentElement.removeAttribute('data-o-hoverable--js');
		window.document.body.removeAttribute('data-o-hoverable--js');

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
	if (!window.document.documentElement.hasAttribute('data-o-hoverable--js') || !window.document.body.hasAttribute('data-o-hoverable--js')) {
		document.removeEventListener('o.DOMContentLoaded', Hoverable.init);
		return new Hoverable();
	}
};

document.addEventListener('o.DOMContentLoaded', Hoverable.init);

module.exports = Hoverable;
