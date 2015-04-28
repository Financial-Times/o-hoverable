/*global describe, afterEach, it*/
'use strict';

var expect = require('expect.js');

var oHoverable = require('./../main.js');

describe('o-hoverable', function() {

	var testHoverable;

	afterEach(function() {
		testHoverable.destroy();
	});

	it('should initialise the module', function() {
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(false);
		expect(window.document.body.hasAttribute('data-o-hoverable--js')).to.be(false);
		testHoverable = new oHoverable();
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(true);
		expect(window.document.body.hasAttribute('data-o-hoverable--js')).to.be(true);
	});

	it('should destroy the module', function() {
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(false);
		expect(window.document.body.hasAttribute('data-o-hoverable--js')).to.be(false);
		testHoverable = new oHoverable();
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(true);
		expect(window.document.body.hasAttribute('data-o-hoverable--js')).to.be(true);
		testHoverable.destroy();
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(false);
		expect(window.document.body.hasAttribute('data-o-hoverable--js')).to.be(false);
	});

	it('should initialise the module by emitting the o.DOMContentLoaded event', function() {
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(false);
		expect(window.document.body.hasAttribute('data-o-hoverable--js')).to.be(false);
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		expect(window.document.documentElement.hasAttribute('data-o-hoverable--js')).to.be(true);
		expect(window.document.body.hasAttribute('data-o-hoverable--js')).to.be(true);
	});

	it('should check if class o-hoverable-on is set on <html>', function() {
		testHoverable = new oHoverable();
		expect(testHoverable.isHoverEnabled()).to.be(false);
		window.document.documentElement.classList.add('o-hoverable-on');
		expect(testHoverable.isHoverEnabled()).to.be(true);
	});

	it('should check if class o-hoverable-on is set on <body>', function() {
		testHoverable = new oHoverable();
		expect(testHoverable.isHoverEnabled()).to.be(false);
		window.document.body.classList.add('o-hoverable-on');
		expect(testHoverable.isHoverEnabled()).to.be(true);
	});

	it('should set custom class on <html>', function() {
		testHoverable = new oHoverable();
		testHoverable.setClassName('hover-test');
		expect(testHoverable.isHoverEnabled()).to.be(false);
		window.document.documentElement.classList.add('hover-test');
		expect(testHoverable.isHoverEnabled()).to.be(true);
	});

	it('should set custom class on <body>', function() {
		testHoverable = new oHoverable();
		testHoverable.setClassName('hover-test');
		expect(testHoverable.isHoverEnabled()).to.be(false);
		window.document.body.classList.add('hover-test');
		expect(testHoverable.isHoverEnabled()).to.be(true);
	});
});
