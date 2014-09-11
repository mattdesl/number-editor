var events = require('./events')

var offset = require('mouse-event-offset')
var domval = require('dom-value')
var clamp = require('clamp')
var inherits = require('inherits')

var EventEmitter = require('events').EventEmitter
var draggable = require('clickdrag')

var attachEvents = require('attach-dom-events')

function NumberEditor(opt) {
    if (!(this instanceof NumberEditor)) 
        return new NumberEditor(opt)
    opt = opt||{}

    EventEmitter.call(this)

    this.element = opt.element || document.createElement('input')
    this.element.setAttribute('type', opt.touch ? 'number' : 'text')

    this.min = typeof opt.min === 'number' ? opt.min : -Number.MAX_VALUE
    this.max = typeof opt.max === 'number' ? opt.max : Number.MAX_VALUE
    this.step = typeof opt.step === 'number' ? opt.step : 1
    this.stepModifier = typeof opt.stepModifier === 'number' ? opt.stepModifier : 10
    this.dragScale = typeof opt.dragScale === 'number' ? opt.dragScale : (this.step/2)
    this.decimals = typeof opt.decimals === 'number' ? opt.decimals : 0
    this.value = opt.value || 0
    this.cursor = opt.cursor !== false

    this.element.setAttribute("min", this.min)
    this.element.setAttribute("max", this.max)
    this.element.setAttribute("inputmode", "numeric")
    if (this.decimals===0)
        this.element.setAttribute("pattern", "[0-9]*")

    this.dragStartValue = null

    this.dragEnabled = true
    this.element.style.cursor = 'ew-resize'

    opt.parent = opt.parent || document
    opt.cursorParent = document.body
    
    if (!opt.touch) {
        this.element.setAttribute("readonly", "readonly")
    
        //setup main element events
        attachEvents(this.element, {
            keydown: events.keydown.bind(this),
            dblclick: events.dblclick.bind(this, opt),
            change: events.change.bind(this, opt),
            blur: events.blur.bind(this, opt)
        })

        //setup mouse drag events on parent/document
        this.drag = draggable(this.element, opt)
        this.drag.on('start', events.dragStart.bind(this))
        this.drag.on('end', events.dragEnd.bind(this, opt))
        this.drag.on('move', events.dragMove.bind(this, opt))
    } else {
        attachEvents(this.element, {
            keydown: events.touchKeydown.bind(this),
            change: events.change.bind(this, opt)
        })
    }
}

inherits(NumberEditor, EventEmitter)

//Opens the editor
NumberEditor.prototype.startEdit = function() {
    this.dragging = null
    if (this.cursor)
        this.element.style.cursor = 'auto'
    this.element.removeAttribute('readonly')
    this.dragEnabled = false
}

NumberEditor.prototype.stopEdit = function() {
    this.dragEnabled = true
    if (this.cursor)
        this.element.style.cursor = 'ew-resize'
    this.element.setAttribute('readonly', 'readonly')
}

//sets the value and emits a change event
NumberEditor.prototype._setValue = function(value) {
    var old = this._value

    this.value = value

    if (old !== this._value)
        this.emit('change', this._value)
}

//does not emit change events
Object.defineProperty(NumberEditor.prototype, "value", {
    get: function() {
        return this._value
    },
    set: function(value) {
        var old = this._value

        var newVal = clamp(Number(value), this.min, this.max)
        if (isNaN(newVal))
            newVal = this._value
        this._value = newVal

        if (this.decimals === 0)
            this._value = Math.round(this._value)
        domval(this.element, this._value.toFixed(this.decimals))
    }
})

module.exports = NumberEditor