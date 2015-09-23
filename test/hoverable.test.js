/*global describe, afterEach, it*/

const expect = require('expect.js');

const Hoverable = require('./../main.js');

describe('o-hoverable', function() {

	let testHoverable;

	afterEach(function() {
		testHoverable.destroy();
	});

	it('should initialise the module', function() {
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(false);
		testHoverable = new Hoverable();
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(true);
	});

	it('should destroy the module', function() {
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(false);
		testHoverable = new Hoverable();
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(true);
		testHoverable.destroy();
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(false);
	});

	it('should initialise the module by emitting the o.DOMContentLoaded event', function() {
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(false);
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(true);
	});

	it('should check if class o-hoverable-on is set on <html>', function() {
		testHoverable = new Hoverable();
		expect(testHoverable.isHoverEnabled()).to.be(false);
		window.document.documentElement.classList.add('o-hoverable-on');
		expect(testHoverable.isHoverEnabled()).to.be(true);
	});

	it('should set custom class on <html>', function() {
		testHoverable = new Hoverable();
		testHoverable.setClassName('hover-test');
		expect(testHoverable.isHoverEnabled()).to.be(false);
		window.document.documentElement.classList.add('hover-test');
		expect(testHoverable.isHoverEnabled()).to.be(true);
	});

});
