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
	function init() {
		if (!el) {
	        el = window; 
	    } else if (!(el instanceof HTMLElement)) {
	        el = document.querySelector(el);
	    }
		el.setAttribute('data-o-hoverable--js');
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

	function destroy() {

	}

	init();

	return {
		setClassName: function(str) {
			className = str;
		},
		destroy: destroy,
		isHoverEnabled: classExists
	}
};

Hoverable.init = function(el) {
    if (!el) {
        el = window; 
    } else if (!(el instanceof HTMLElement)) {
        el = document.querySelector(el);
    }
    if (!el.hasAttribute('data-o-hoverable--js')) {
    	return new Hoverable(el);
    }
};

var constructAll = function() {
    Hoverable.init();
    document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbGJlcnRvLmVsaWFzL29yaWdhbWkvb3JpZ2FtaS1idWlsZC10b29scy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2FsYmVydG8uZWxpYXMvb3JpZ2FtaS9vLWhvdmVyYWJsZS9kZW1vcy9zcmMvZGVtby5qcyIsIi9Vc2Vycy9hbGJlcnRvLmVsaWFzL29yaWdhbWkvby1ob3ZlcmFibGUvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qZ2xvYmFsIHJlcXVpcmUqL1xucmVxdWlyZSgnLi4vLi4vbWFpbi5qcycpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xufSk7IiwiZnVuY3Rpb24gSG92ZXJhYmxlKGVsKSB7XG5cblx0dmFyIGhhc0NvbnRhY3QgPSBmYWxzZSwgY29udGFjdGxlc3NNb3ZlcyA9IDAsIGxhc3RDbGllbnRYLCBsYXN0Q2xpZW50WTtcblx0dmFyIGV2ZW50bWFwID0gW1xuXHRcdFsndG91Y2hzdGFydCcsIGNvbnRhY3RTdGFydF0sXG5cdFx0Wydtb3VzZWRvd24nLCBjb250YWN0U3RhcnRdLFxuXHRcdFsnbXNwb2ludGVyZG93bicsIGNvbnRhY3RTdGFydF0sXG5cdFx0Wyd0b3VjaGVuZCcsY29udGFjdEVuZF0sXG5cdFx0Wydtb3VzZXVwJywgY29udGFjdEVuZF0sXG5cdFx0Wydtc3BvaW50ZXJ1cCcsIGNvbnRhY3RFbmRdLFxuXHRcdFsnbW91c2Vtb3ZlJywgY29udGFjdE1vdmVdLFxuXHRcdFsnbXNwb2ludGVyaG92ZXInLCBjb250YWN0TW92ZV1cblx0XTtcblx0dmFyIGNsYXNzTmFtZSA9ICdvLWhvdmVyYWJsZS1vbic7XG5cdHZhciBjbGFzc0xpc3Q7XG5cblx0Ly8gSWYgYm9keSBoYXMgaG92ZXIgZWZmZWN0cyBlbmFibGVkLCBhbmQgYXBwZWFycyB0byBzdXBwb3J0IHRvdWNoLCByZW1vdmUgaG92ZXIgZWZmZWN0cyBhbmQgc3RhcnQgbGlzdGVuaW5nIGZvciBwb2ludGVyIGludGVyYWN0aW9uc1xuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmICghZWwpIHtcblx0ICAgICAgICBlbCA9IHdpbmRvdzsgXG5cdCAgICB9IGVsc2UgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0ICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXHQgICAgfVxuXHRcdGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1vLWhvdmVyYWJsZS0tanMnKTtcblx0XHRjbGFzc0xpc3QgPSBlbC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0O1xuXHRcdGlmIChjbGFzc0V4aXN0cygpICYmICgoJ29udG91Y2hzdGFydCcgaW4gZWwpIHx8IChlbC5Eb2N1bWVudFRvdWNoICYmIGVsLmRvYyBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpKSkge1xuXHRcdFx0Y2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuXHRcdFx0ZXZlbnRtYXAuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdGxpc3RlbmVyKCdhZGQnLCBpdGVtWzBdLCBpdGVtWzFdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNvbnRhY3RTdGFydChldmVudCkge1xuXHRcdGhhc0NvbnRhY3QgPSB0cnVlO1xuXHRcdGNvbnRhY3RsZXNzTW92ZXMgPSAwO1xuXHR9XG5cblx0ZnVuY3Rpb24gY29udGFjdEVuZChldmVudCkge1xuXHRcdGhhc0NvbnRhY3QgPSBmYWxzZTtcblx0fVxuXG5cdC8vIElmIGEgY29udGFjdGxlc3MgbW92ZSAoaWUgYSBob3ZlcikgaXMgZGV0ZWN0ZWQsIHR1cm4gaG92ZXIgZWZmZWN0cyBiYWNrIG9uXG5cdGZ1bmN0aW9uIGNvbnRhY3RNb3ZlKGV2ZW50KSB7XG5cdFx0aWYgKCFoYXNDb250YWN0KSB7XG5cdFx0XHRjb250YWN0bGVzc01vdmVzKys7XG5cdFx0fVxuXG5cdFx0aWYgKCdtb3VzZW1vdmUnID09PSBldmVudC50eXBlLnRvTG93ZXJDYXNlKCkpIHtcblxuXHRcdFx0Ly8gQ09NUExFWDpHQzoyMDEzMDMyMjogV2Via2l0IGNhbiBmaXJlIGFuIGVycm9uZW91cyBtb3VzZW1vdmUgdW5kZXIgc29tZSBjb25kaXRpb25zLCBzb1xuXHRcdFx0Ly8ga2VlcCBhIHRyYWNrIG9mIHRoZSBjbGllbnRYIGFuZCBjbGllbnRZIHZhbHVlcywgYW5kIHJlamVjdCBldmVudHMgd2hlcmUgdGhlc2UgdmFsdWVzIGRvbid0IGNoYW5nZS5cblx0XHRcdGlmIChsYXN0Q2xpZW50WCA9PT0gZXZlbnQuY2xpZW50WCAmJiBsYXN0Q2xpZW50WSA9PT0gZXZlbnQuY2xpZW50WSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsYXN0Q2xpZW50WCA9IGV2ZW50LmNsaWVudFg7XG5cdFx0XHRsYXN0Q2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XG5cdFx0fVxuXG5cdFx0Ly8gTVNQb2ludGVySG92ZXIgY2F0ZWdvcmljYWxseSBtZWFucyBhIGNvbnRhY3RsZXNzIGludGVyYWN0aW9uXG5cdFx0aWYgKGNvbnRhY3RsZXNzTW92ZXMgPiAxIHx8IGV2ZW50LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ21zcG9pbnRlcmhvdmVyJykge1xuXHRcdFx0Y2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHRcdFx0ZXZlbnRtYXAuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdGxpc3RlbmVyKCdyZW1vdmUnLCBpdGVtWzBdLCBpdGVtWzFdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGxpc3RlbmVyKHR5cGUsIGV2ZW50LCBmbikge1xuXHRcdGVsW3R5cGUrJ0V2ZW50TGlzdGVuZXInXShldmVudCwgZm4sIGZhbHNlKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsYXNzRXhpc3RzKCkge1xuXHRcdHJldHVybiBjbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cblx0fVxuXG5cdGluaXQoKTtcblxuXHRyZXR1cm4ge1xuXHRcdHNldENsYXNzTmFtZTogZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHRjbGFzc05hbWUgPSBzdHI7XG5cdFx0fSxcblx0XHRkZXN0cm95OiBkZXN0cm95LFxuXHRcdGlzSG92ZXJFbmFibGVkOiBjbGFzc0V4aXN0c1xuXHR9XG59O1xuXG5Ib3ZlcmFibGUuaW5pdCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgICBlbCA9IHdpbmRvdzsgXG4gICAgfSBlbHNlIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgfVxuICAgIGlmICghZWwuaGFzQXR0cmlidXRlKCdkYXRhLW8taG92ZXJhYmxlLS1qcycpKSB7XG4gICAgXHRyZXR1cm4gbmV3IEhvdmVyYWJsZShlbCk7XG4gICAgfVxufTtcblxudmFyIGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIEhvdmVyYWJsZS5pbml0KCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG4iXX0=
