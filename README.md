# number-editor

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A simple number editor or spinner that acts like those in After Effects and similar software. You can click and drag to slide the value, or double-click to enter a new value. You can use up/down while editing to increment and decrement the value. Holding command/control will step by smaller values, and holding shift will step by larger values.

```js
var opts = {
    min: 0,
    max: 1,
    step: 0.01,
    decimals: 2
}

require('domready')(function() {
	var spinner = require('number-editor')(opts)
    document.body.appendChild(spinner.element)
})
```

## Usage

[![NPM](https://nodei.co/npm/number-editor.png)](https://nodei.co/npm/number-editor/)


#### ```createEditor([options])```

Creates a new number editor with the given options.

- `min` the minimum value, default no minimum 
- `max` the maximum value, default no maximum
- `step` the step to increment when sliding and with up/down arrows. Default 1.
- `decimals` the number of decimals to show, default none (i.e. round to whole numbers)
- `value` the default value to show
- `element` the input element, default creates a new one
- `stepModifier` how much to multiply/divide with the modifier keys (shift and control/meta). Default is 10. 
- `dragScale` how much to multiply sliding when dragging. Default is half the step. 
- `cursor` a boolean, whether to change cursor style (default true)
- `parent` the parent container which receives out-of-element mouse events. Default is `document`. This is passed onto [clickdrag](https://www.npmjs.org/package/clickdrag) and can be an instance of EventEmitter if you want to avoid duplicate document events.
- `cursorParent` the parent container that changes cursors during out-of-element mouse events. Default is `document.body`. 
- `touch` prepare the element for mobile/touch devices (acts like a simple number box)




## demo

To run the demo, install beefy and browserify:

```npm i beefy browserify -g```

Then:

```npm run demo```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/number-editor/blob/master/LICENSE.md) for details.
