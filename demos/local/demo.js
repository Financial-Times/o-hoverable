(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global require*/
window.lol = require('../../main.js');
console.log(lol);
document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
},{"../../main.js":2}],2:[function(require,module,exports){
'use strict';

function Hoverable(win) {

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

	function init() {
		win.document.body.setAttribute('data-o-hoverable--js', '');
		touchSupport();
	}

	// If body has hover effects enabled, and appears to support touch, remove hover effects and start listening for pointer interactions
	function touchSupport() {
		classList = win.document.body.classList;
		if (classExists() && (('ontouchstart' in win) || (win.DocumentTouch && win.doc instanceof DocumentTouch))) {
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
		win[type+'EventListener'](event, fn, false);
	}

	function classExists() {
		return classList.contains(className);
	}

	function destroy() {
		win.removeAttribute('data-o-hoverable--js');
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
	}
};

Hoverable.init = function() {
    if (!window.document.body.hasAttribute('data-o-hoverable--js')) {
    	document.removeEventListener('o.DOMContentLoaded', Hoverable.init);
    	return new Hoverable(window);
    }
};

document.addEventListener('o.DOMContentLoaded', Hoverable.init);

module.exports = {
	init: Hoverable.init
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbGJlcnRvLmVsaWFzL29yaWdhbWkvb3JpZ2FtaS1idWlsZC10b29scy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2FsYmVydG8uZWxpYXMvb3JpZ2FtaS9vLWhvdmVyYWJsZS9kZW1vcy9zcmMvZGVtby5qcyIsIi9Vc2Vycy9hbGJlcnRvLmVsaWFzL29yaWdhbWkvby1ob3ZlcmFibGUvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qZ2xvYmFsIHJlcXVpcmUqL1xud2luZG93LmxvbCA9IHJlcXVpcmUoJy4uLy4uL21haW4uanMnKTtcbmNvbnNvbGUubG9nKGxvbCk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBIb3ZlcmFibGUod2luKSB7XG5cblx0dmFyIGhhc0NvbnRhY3QgPSBmYWxzZSwgY29udGFjdGxlc3NNb3ZlcyA9IDAsIGxhc3RDbGllbnRYLCBsYXN0Q2xpZW50WTtcblx0dmFyIGV2ZW50bWFwID0gW1xuXHRcdFsndG91Y2hzdGFydCcsIGNvbnRhY3RTdGFydF0sXG5cdFx0Wydtb3VzZWRvd24nLCBjb250YWN0U3RhcnRdLFxuXHRcdFsnbXNwb2ludGVyZG93bicsIGNvbnRhY3RTdGFydF0sXG5cdFx0Wyd0b3VjaGVuZCcsY29udGFjdEVuZF0sXG5cdFx0Wydtb3VzZXVwJywgY29udGFjdEVuZF0sXG5cdFx0Wydtc3BvaW50ZXJ1cCcsIGNvbnRhY3RFbmRdLFxuXHRcdFsnbW91c2Vtb3ZlJywgY29udGFjdE1vdmVdLFxuXHRcdFsnbXNwb2ludGVyaG92ZXInLCBjb250YWN0TW92ZV1cblx0XTtcblx0dmFyIGNsYXNzTmFtZSA9ICdvLWhvdmVyYWJsZS1vbic7XG5cdHZhciBjbGFzc0xpc3Q7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHR3aW4uZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ2RhdGEtby1ob3ZlcmFibGUtLWpzJywgJycpO1xuXHRcdHRvdWNoU3VwcG9ydCgpO1xuXHR9XG5cblx0Ly8gSWYgYm9keSBoYXMgaG92ZXIgZWZmZWN0cyBlbmFibGVkLCBhbmQgYXBwZWFycyB0byBzdXBwb3J0IHRvdWNoLCByZW1vdmUgaG92ZXIgZWZmZWN0cyBhbmQgc3RhcnQgbGlzdGVuaW5nIGZvciBwb2ludGVyIGludGVyYWN0aW9uc1xuXHRmdW5jdGlvbiB0b3VjaFN1cHBvcnQoKSB7XG5cdFx0Y2xhc3NMaXN0ID0gd2luLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0O1xuXHRcdGlmIChjbGFzc0V4aXN0cygpICYmICgoJ29udG91Y2hzdGFydCcgaW4gd2luKSB8fCAod2luLkRvY3VtZW50VG91Y2ggJiYgd2luLmRvYyBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpKSkge1xuXHRcdFx0Y2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuXHRcdFx0ZXZlbnRtYXAuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdGxpc3RlbmVyKCdhZGQnLCBpdGVtWzBdLCBpdGVtWzFdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNvbnRhY3RTdGFydChldmVudCkge1xuXHRcdGhhc0NvbnRhY3QgPSB0cnVlO1xuXHRcdGNvbnRhY3RsZXNzTW92ZXMgPSAwO1xuXHR9XG5cblx0ZnVuY3Rpb24gY29udGFjdEVuZChldmVudCkge1xuXHRcdGhhc0NvbnRhY3QgPSBmYWxzZTtcblx0fVxuXG5cdC8vIElmIGEgY29udGFjdGxlc3MgbW92ZSAoaWUgYSBob3ZlcikgaXMgZGV0ZWN0ZWQsIHR1cm4gaG92ZXIgZWZmZWN0cyBiYWNrIG9uXG5cdGZ1bmN0aW9uIGNvbnRhY3RNb3ZlKGV2ZW50KSB7XG5cdFx0aWYgKCFoYXNDb250YWN0KSB7XG5cdFx0XHRjb250YWN0bGVzc01vdmVzKys7XG5cdFx0fVxuXG5cdFx0aWYgKCdtb3VzZW1vdmUnID09PSBldmVudC50eXBlLnRvTG93ZXJDYXNlKCkpIHtcblxuXHRcdFx0Ly8gQ09NUExFWDpHQzoyMDEzMDMyMjogV2Via2l0IGNhbiBmaXJlIGFuIGVycm9uZW91cyBtb3VzZW1vdmUgdW5kZXIgc29tZSBjb25kaXRpb25zLCBzb1xuXHRcdFx0Ly8ga2VlcCBhIHRyYWNrIG9mIHRoZSBjbGllbnRYIGFuZCBjbGllbnRZIHZhbHVlcywgYW5kIHJlamVjdCBldmVudHMgd2hlcmUgdGhlc2UgdmFsdWVzIGRvbid0IGNoYW5nZS5cblx0XHRcdGlmIChsYXN0Q2xpZW50WCA9PT0gZXZlbnQuY2xpZW50WCAmJiBsYXN0Q2xpZW50WSA9PT0gZXZlbnQuY2xpZW50WSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsYXN0Q2xpZW50WCA9IGV2ZW50LmNsaWVudFg7XG5cdFx0XHRsYXN0Q2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XG5cdFx0fVxuXG5cdFx0Ly8gTVNQb2ludGVySG92ZXIgY2F0ZWdvcmljYWxseSBtZWFucyBhIGNvbnRhY3RsZXNzIGludGVyYWN0aW9uXG5cdFx0aWYgKGNvbnRhY3RsZXNzTW92ZXMgPiAxIHx8IGV2ZW50LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ21zcG9pbnRlcmhvdmVyJykge1xuXHRcdFx0Y2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHRcdFx0ZXZlbnRtYXAuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdGxpc3RlbmVyKCdyZW1vdmUnLCBpdGVtWzBdLCBpdGVtWzFdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGxpc3RlbmVyKHR5cGUsIGV2ZW50LCBmbikge1xuXHRcdHdpblt0eXBlKydFdmVudExpc3RlbmVyJ10oZXZlbnQsIGZuLCBmYWxzZSk7XG5cdH1cblxuXHRmdW5jdGlvbiBjbGFzc0V4aXN0cygpIHtcblx0XHRyZXR1cm4gY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZXN0cm95KCkge1xuXHRcdHdpbi5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtby1ob3ZlcmFibGUtLWpzJyk7XG5cdFx0ZXZlbnRtYXAuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRsaXN0ZW5lcigncmVtb3ZlJywgaXRlbVswXSwgaXRlbVsxXSk7XG5cdFx0fSk7XG5cdH1cblxuXHRpbml0KCk7XG5cblx0cmV0dXJuIHtcblx0XHRzZXRDbGFzc05hbWU6IGZ1bmN0aW9uKHN0cikge1xuXHRcdFx0Y2xhc3NOYW1lID0gc3RyO1xuXHRcdFx0dG91Y2hTdXBwb3J0KCk7XG5cdFx0fSxcblx0XHRkZXN0cm95OiBkZXN0cm95LFxuXHRcdGlzSG92ZXJFbmFibGVkOiBjbGFzc0V4aXN0c1xuXHR9XG59O1xuXG5Ib3ZlcmFibGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghd2luZG93LmRvY3VtZW50LmJvZHkuaGFzQXR0cmlidXRlKCdkYXRhLW8taG92ZXJhYmxlLS1qcycpKSB7XG4gICAgXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBIb3ZlcmFibGUuaW5pdCk7XG4gICAgXHRyZXR1cm4gbmV3IEhvdmVyYWJsZSh3aW5kb3cpO1xuICAgIH1cbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIEhvdmVyYWJsZS5pbml0KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGluaXQ6IEhvdmVyYWJsZS5pbml0XG59O1xuIl19
