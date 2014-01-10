# Origami hover effects

It's common for interactive elements on web pages to have hover effects, either via JavaScript `mouse*` events, or via CSS `:hover` pseudoclasses.  However, while some users will be interacting with your web page using a mouse, others may be using a touch screen.  Since touch screens typically don't have a 'hover' capability, hover effects are usually undesirable.

In fact, some touch devices may have 'emulated hover', where the first touch activates a hover effect and the second is treated as a click.  This is a way for the browser to provide a way to use pages that 'require' hover (eg to select a flyout menu option) but this is also usually undesirable if you design your site sensibly.

This module provides for all Origami hover effects to be turned on and off, and provides a JavaScript utility to do so intelligently based on the input devices available to the user.

## Using in a product

When you first add Origami CSS to a product, no hover effects will be triggered, and Origami components on your page will never react to hover.  To activate hover effects, add `o-hoverable-on` to the `<body>` tag:

    <body class='o-hoverable-on'>

This will unconditionally add hover effects, so hover now acts as you would expect from a web page that has defined `:hover` pseudoclasses.

To activate smart hover switching, add the class and also include this module's JavaScript in your bundle.  This will intelligently disable hovering on devices that support touch, and will re-enable it as soon as a non-touch hover event (ie, a mouse) is detected.

### Configuring the class

If you want to change the class used to trigger hover effects, you can do so by redefining the `$o-hoverable-if-hover-enabled` variable before importing this module's SASS.

    $o-hoverable-if-hover-enabled: '.do-that-hover-thang';

And calling `setClassname` on the JavaScript module:

	require('o-hoverable').setClassName('do-that-hover-thang')

Make sure you do both of these, so that any JavaScript that

## Using in components

Component developers *must* prefix any `:hover` pseudoclass with the `$o-hoverable-if-hover-enabled` variable, to allow your hover effect to be controlled by this module:

    $o-hoverable-if-hover-enabled .o-mymodule-button:hover { background: red };

In JavaScript, bind hover events as normal, but when they fire, check hover status, and don't take any action if hover is not enabled.

	if (!require('o-hoverable').isHoverEnabled()) return;
