var opts = {
    min: 0,
    max: 1,
    value: 1,
    step: 0.01,
    decimals: 2
}

var spinner = require('../')(opts)

var fs = require('fs')
var style = fs.readFileSync(__dirname+'/style.css', 'utf8')
require('insert-css')(style)

var unlerp = require('unlerp')
var classes = require('dom-classes')

require('domready')(function() {
	var main = document.createElement("div")
	document.body.appendChild(main)

	var container = document.createElement("div")
	classes.add(container, 'box')
	main.appendChild(container)

	var progress = document.createElement("div")
	classes.add(progress, 'progress')
	container.appendChild(progress)

	//add spinner
    classes.add(spinner.element, 'spinner')
    container.appendChild(spinner.element)

    //do something on event...
    spinner.on('change', update)

    function update(val) {
    	val = unlerp(spinner.min, spinner.max, spinner.value) * 100
    	val = val.toFixed(2)
    	progress.style.width = val + '%'
    }

    update(spinner.value)
})