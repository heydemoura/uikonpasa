## Extend Bootstrap elements with AngularJS

#### Installation

The library is available at bower registry, to use it in your project go with the good'old...
```
bower install --save uikonpasa
```

Then import the CSS and JavaScript files.
```html
<link rel="stylesheet" href="./build/uiKonpasa.css" type="text/css" />
<script src="./build/uiKonpasa.js"></script>
```

And inject the module into your Angular module
```javascript
angular.module('myApp', ['uiKonpasa']);
```

Now you're good to go, next section contains explanations of how to use each directive.

## Usage
#### uiKonpasaBubble
To use this directive you have to wrap it on a uiKonpasaBubbleArea, that is the element that will be inserted the bubbles. So, it's easy as it gets:
```html
<ui-konpasa-bubble-area>
	<ui-konpasa-bubble type="info" body="Bubble message">
	</ui-konpasa-bubble>
</ui-konpasa-bubble-area>
```
As you can see it takes two atributes, type and body. Types are similar to Bootstrap's css default classes: *default*, *primary*, *info*, *success*, *warning*, *danger*. And Body can be any string that you want.

#### uiKonpasaConfirm
TODO