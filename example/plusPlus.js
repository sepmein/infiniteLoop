var Forever = require('.././index');

var counter = {n : 0};

function addOne(c) {
    console.log(c.n++);
}

var f = new Forever();

f.onError(function(err) {
    console.log(err);
});

f.add(addOne, counter).run();

setTimeout(function(){
    f.stop();
}, 2000);