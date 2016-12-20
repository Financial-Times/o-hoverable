/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const Hoverable = require('./../main.js');

describe("o-hoverable init", () => {
	it('is defined', () => {
		proclaim.isFunction(Hoverable);
	});

	it('has a static init method', () => {
		proclaim.isFunction(Hoverable.init);
	});

	it("should autoinitialize", (done) => {
		sinon.spy(Hoverable, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(() => {
			proclaim.isTrue(Hoverable.init.called);
			Hoverable.init.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Hoverable, 'init');
		proclaim.isFalse(initSpy.called);
		initSpy.restore();
	});
});
