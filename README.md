# Origami hover effects [![Build Status](https://travis-ci.org/Financial-Times/o-hoverable.png?branch=master)](https://travis-ci.org/Financial-Times/o-hoverable)

Helper to activate hover states only on devices that support them, preventing unintended hover effects from happening on touch devices.

## Quick start

Add this class to the document to enable hover effects:

```html
<!-- This class gets removed on touch devices -->
<html class="o-hoverable-on">
```

## Why o-hoverable?

It's common for interactive elements on web pages to have hover effects, either via JavaScript `mouse*` events, or via CSS `:hover` pseudoclasses.  However, while some users will be interacting with your web page using a mouse, others may be using a touch screen.  Since touch screens typically don't have a 'hover' capability, hover effects are usually undesirable.

In fact, some touch devices may have 'emulated hover', where the first touch activates a hover effect and the second is treated as a click.  This is a way for the browser to provide a way to use pages that 'require' hover (e.g. to select a flyout menu option) but this is also usually undesirable if you design your site sensibly.

This module provides for all Origami hover effects to be turned on and off, and provides a JavaScript utility to do so intelligently based on the input devices available to the user.

## Advanced documentation

### Styling

Component developers *must* prefix `:hover` states with `$o-hoverable-if-hover-enabled`, allowing hover effects to be configured by this module:

```scss
@import 'o-hoverable/main';

#{$o-hoverable-if-hover-enabled} .o-mymodule-button:hover {
	// Paint it black when hover is supported
	background: black;
}
```

Compiles to:

```scss
.o-hoverable-on .o-mymodule-button:hover {
	background: black;
}
```

### JavaScript

Component developers *must* load hover effects conditionnally:

```javascript
function showMyMenuOnHover() {
	if (!require('o-hoverable').isHoverEnabled()) {
		// Hover isn't supported: don't do anything
		return;
	}
	// Hover is supported: show a menu
}
```

### Configuring the class

If you want to change the class used to trigger hover effects, you can do so by redefining the `$o-hoverable-if-hover-enabled` variable before importing this module's Sass.

```scss
$o-hoverable-if-hover-enabled: '.do-that-hover-thang';
```

And calling `setClassName` on the JavaScript module:

```javascript
require('o-hoverable').setClassName('do-that-hover-thang');
```

## Disabling o-hoverable

Restore hover effects on all devices (even touch devices):

```scss
$o-hoverable-if-hover-enabled: '';
@import 'o-hoverable/main';

#{$o-hoverable-if-hover-enabled} .o-mymodule-button:hover {
	// Paint it black
	background: black;
}
```

Compiles to:

```scss
.o-mymodule-button:hover {
	background: black;
}
```
