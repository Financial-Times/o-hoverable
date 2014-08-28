(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global require*/
require('../../main.js');

document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
},{"../../main.js":2}],2:[function(require,module,exports){
function Hoverable(el) {

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

	// If body has hover effects enabled, and appears to support touch, remove hover effects and start listening for pointer interactions
	function init(e) {
		classList = el.document.documentElement.classList;
		if (classExists() && (('ontouchstart' in el) || (el.DocumentTouch && el.doc instanceof DocumentTouch))) {
			classList.remove(className);
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
			classList.add(className);
			eventmap.forEach(function(item) {
				listener('remove', item[0], item[1]);
			});
		}
	}

	function listener(type, event, fn) {
		el[type+'EventListener'](event, fn, false);
	}

	function classExists() {
		return classList.contains(className);
	}

	init();

	return {
		setClassName: function(str) {
			className = str;
		},
		isHoverEnabled: classExists
	}
};

Hoverable.init = function(el) {
    if (!el) {
        el = window; 
    } else if (!(el instanceof HTMLElement)) {
        el = document.querySelector(el);
    }
    return new Hoverable(el);
};

var constructAll = function() {
    Hoverable.init();
    document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbGJlcnRvLmVsaWFzL29yaWdhbWkvb3JpZ2FtaS1idWlsZC10b29scy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2FsYmVydG8uZWxpYXMvb3JpZ2FtaS9vLWhvdmVyYWJsZS9kZW1vcy9zcmMvZGVtby5qcyIsIi9Vc2Vycy9hbGJlcnRvLmVsaWFzL29yaWdhbWkvby1ob3ZlcmFibGUvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmdsb2JhbCByZXF1aXJlKi9cbnJlcXVpcmUoJy4uLy4uL21haW4uanMnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn0pOyIsImZ1bmN0aW9uIEhvdmVyYWJsZShlbCkge1xuXG5cdHZhciBoYXNDb250YWN0ID0gZmFsc2UsIGNvbnRhY3RsZXNzTW92ZXMgPSAwLCBsYXN0Q2xpZW50WCwgbGFzdENsaWVudFk7XG5cdHZhciBldmVudG1hcCA9IFtcblx0XHRbJ3RvdWNoc3RhcnQnLCBjb250YWN0U3RhcnRdLFxuXHRcdFsnbW91c2Vkb3duJywgY29udGFjdFN0YXJ0XSxcblx0XHRbJ21zcG9pbnRlcmRvd24nLCBjb250YWN0U3RhcnRdLFxuXHRcdFsndG91Y2hlbmQnLGNvbnRhY3RFbmRdLFxuXHRcdFsnbW91c2V1cCcsIGNvbnRhY3RFbmRdLFxuXHRcdFsnbXNwb2ludGVydXAnLCBjb250YWN0RW5kXSxcblx0XHRbJ21vdXNlbW92ZScsIGNvbnRhY3RNb3ZlXSxcblx0XHRbJ21zcG9pbnRlcmhvdmVyJywgY29udGFjdE1vdmVdXG5cdF07XG5cdHZhciBjbGFzc05hbWUgPSAnby1ob3ZlcmFibGUtb24nO1xuXHR2YXIgY2xhc3NMaXN0O1xuXG5cdC8vIElmIGJvZHkgaGFzIGhvdmVyIGVmZmVjdHMgZW5hYmxlZCwgYW5kIGFwcGVhcnMgdG8gc3VwcG9ydCB0b3VjaCwgcmVtb3ZlIGhvdmVyIGVmZmVjdHMgYW5kIHN0YXJ0IGxpc3RlbmluZyBmb3IgcG9pbnRlciBpbnRlcmFjdGlvbnNcblx0ZnVuY3Rpb24gaW5pdChlKSB7XG5cdFx0Y2xhc3NMaXN0ID0gZWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdDtcblx0XHRpZiAoY2xhc3NFeGlzdHMoKSAmJiAoKCdvbnRvdWNoc3RhcnQnIGluIGVsKSB8fCAoZWwuRG9jdW1lbnRUb3VjaCAmJiBlbC5kb2MgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSkpIHtcblx0XHRcdGNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcblx0XHRcdGV2ZW50bWFwLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRsaXN0ZW5lcignYWRkJywgaXRlbVswXSwgaXRlbVsxXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBjb250YWN0U3RhcnQoZXZlbnQpIHtcblx0XHRoYXNDb250YWN0ID0gdHJ1ZTtcblx0XHRjb250YWN0bGVzc01vdmVzID0gMDtcblx0fVxuXG5cdGZ1bmN0aW9uIGNvbnRhY3RFbmQoZXZlbnQpIHtcblx0XHRoYXNDb250YWN0ID0gZmFsc2U7XG5cdH1cblxuXHQvLyBJZiBhIGNvbnRhY3RsZXNzIG1vdmUgKGllIGEgaG92ZXIpIGlzIGRldGVjdGVkLCB0dXJuIGhvdmVyIGVmZmVjdHMgYmFjayBvblxuXHRmdW5jdGlvbiBjb250YWN0TW92ZShldmVudCkge1xuXHRcdGlmICghaGFzQ29udGFjdCkge1xuXHRcdFx0Y29udGFjdGxlc3NNb3ZlcysrO1xuXHRcdH1cblxuXHRcdGlmICgnbW91c2Vtb3ZlJyA9PT0gZXZlbnQudHlwZS50b0xvd2VyQ2FzZSgpKSB7XG5cblx0XHRcdC8vIENPTVBMRVg6R0M6MjAxMzAzMjI6IFdlYmtpdCBjYW4gZmlyZSBhbiBlcnJvbmVvdXMgbW91c2Vtb3ZlIHVuZGVyIHNvbWUgY29uZGl0aW9ucywgc29cblx0XHRcdC8vIGtlZXAgYSB0cmFjayBvZiB0aGUgY2xpZW50WCBhbmQgY2xpZW50WSB2YWx1ZXMsIGFuZCByZWplY3QgZXZlbnRzIHdoZXJlIHRoZXNlIHZhbHVlcyBkb24ndCBjaGFuZ2UuXG5cdFx0XHRpZiAobGFzdENsaWVudFggPT09IGV2ZW50LmNsaWVudFggJiYgbGFzdENsaWVudFkgPT09IGV2ZW50LmNsaWVudFkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGFzdENsaWVudFggPSBldmVudC5jbGllbnRYO1xuXHRcdFx0bGFzdENsaWVudFkgPSBldmVudC5jbGllbnRZO1xuXHRcdH1cblxuXHRcdC8vIE1TUG9pbnRlckhvdmVyIGNhdGVnb3JpY2FsbHkgbWVhbnMgYSBjb250YWN0bGVzcyBpbnRlcmFjdGlvblxuXHRcdGlmIChjb250YWN0bGVzc01vdmVzID4gMSB8fCBldmVudC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdtc3BvaW50ZXJob3ZlcicpIHtcblx0XHRcdGNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblx0XHRcdGV2ZW50bWFwLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRsaXN0ZW5lcigncmVtb3ZlJywgaXRlbVswXSwgaXRlbVsxXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBsaXN0ZW5lcih0eXBlLCBldmVudCwgZm4pIHtcblx0XHRlbFt0eXBlKydFdmVudExpc3RlbmVyJ10oZXZlbnQsIGZuLCBmYWxzZSk7XG5cdH1cblxuXHRmdW5jdGlvbiBjbGFzc0V4aXN0cygpIHtcblx0XHRyZXR1cm4gY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG5cdH1cblxuXHRpbml0KCk7XG5cblx0cmV0dXJuIHtcblx0XHRzZXRDbGFzc05hbWU6IGZ1bmN0aW9uKHN0cikge1xuXHRcdFx0Y2xhc3NOYW1lID0gc3RyO1xuXHRcdH0sXG5cdFx0aXNIb3ZlckVuYWJsZWQ6IGNsYXNzRXhpc3RzXG5cdH1cbn07XG5cbkhvdmVyYWJsZS5pbml0ID0gZnVuY3Rpb24oZWwpIHtcbiAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gd2luZG93OyBcbiAgICB9IGVsc2UgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBIb3ZlcmFibGUoZWwpO1xufTtcblxudmFyIGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIEhvdmVyYWJsZS5pbml0KCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG4iXX0=
