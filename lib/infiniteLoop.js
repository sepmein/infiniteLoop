var util = require('util');
var ee = require('events').EventEmitter;

var Infiniteloop = function () {
    ee.call(this);
    this.args = [];
};

util.inherits(Infiniteloop, ee);

module.exports = Infiniteloop;

Infiniteloop.prototype.add = function () {
    if ('function' === typeof arguments[0]) {
        this.handler = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        if (args.length > 0) {
            this.args = args;
        }
    } else {
        this.emit('error', new Error('when using add function, the first argument should be a function'));
        return 0;
    }
    return this;
};

Infiniteloop.prototype.run = function (times) {
    var handler = this.handler,
        args = this.args,
        that = this;
    this.times = times || null;

    function call() {
        that._immediateId = setImmediate(function () {
            if (typeof handler === 'function') {

                switch (args.length) {
                    // fast cases
                    case 0:
                        handler.call(that);
                        that.run();
                        break;
                    case 1:
                        handler.call(that, args[0]);
                        that.run();
                        break;
                    case 2:
                        handler.call(that, args[0], args[1]);
                        that.run();
                        break;
                    // slower
                    default:
                        handler.apply(that, args);
                        that.run();
                }
            } else {
                //no function added
                that.emit('error', new Error('no task has been added to Infiniteloop'));
            }
        });
    }

    if (this.interval) {
        this._timeoutId = setTimeout(function () {
            call();
        }, that.interval);
    } else {
        call();
    }

    return this;

};

Infiniteloop.prototype.setInterval = function (interval) {
    if ('number' === typeof interval && interval > 0) {
        this.interval = interval;
    } else {
        this.emit('error', new Error('Interval should be a number, and must > 0 '));
    }

    return this;
};

Infiniteloop.prototype.removeInterval = function () {
    delete this.interval;
    return this;
};

Infiniteloop.prototype.onError = function (errHandler) {
    if ('function' === typeof errHandler) {
        this.on('error', errHandler);
    } else {
        this.emit('error', new Error('You should use a function to handle the error'));
    }
    return this;
};

Infiniteloop.prototype.stop = function () {
    console.log('timeout id', this._timeoutId);
    if (this._immediateId !== null && this._timeoutId === null) {
        clearImmediate(this._immediateId);
    } else if (this._timeoutId !== null) {
        clearTimeout(this._timeoutId);
    } else {
        this.emit('error', new Error('You cannot stop a loop before it has been started'));
    }
};