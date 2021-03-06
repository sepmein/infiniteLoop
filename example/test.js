/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 13-5-12
 * Time: 下午1:31
 * To change this template use File | Settings | File Templates.
 */

/*testing with infinite loop*/
// for loop

var count = 1000000000000;

var loops = Object.create(null);

function forLoop() {
    for (; ;) {
        console.log(count--);
    }
}
//forLoop();

function processLoop() {
    console.log(count--);
    process.nextTick(processLoop);
}

//processLoop();
var fn = function setImmediateLoop() {
    console.log(count--);
    setImmediate(function () {
            process.nextTick(function () {
                fn()
            });
        }
    );
};
//fn();


loops.forever = function withoutInterval() {
    // console.dir(arguments);
    var args = arguments;
    console.log(arguments);
    var argsArray = Array.prototype.slice.call(arguments);
    var fns = argsArray[0];
    var fnsArguments = argsArray.slice(1);
    var that = this;
    if (typeof fns === 'function') {
        setImmediate(function () {
            fns.apply(that, fnsArguments);
            withoutInterval.apply(that, fns, fnsArguments);
        });

    }

};

// withoutInterval();

function interval() {
    setInterval(function () {
        console.log(count--);
    }, 0)
}

//interval();

function countMinusMinus() {
    console.log(count--);
}

function countPlusPlus(n, m) {
    console.log(n + m);
}

//loops.forever(countPlusPlus, 1, 2);


//test
var Forever = require('../lib/infiniteLoop.js');

var counter = {num: 0};

function addOne(c) {
    console.log(c.num++);
}
var f = new Forever();
f.onError(function (err) {
    console.log(err);
});
f.add(addOne, counter).run();

setTimeout(function () {
    f.stop();
}, 1000);