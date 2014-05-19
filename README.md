infiniteLoop
============

Infinite loop for Node.js.

A helper for running tasks repeatly in Node.js. It's **Easy to Use** and **Good Performance**.

get start by:

```
npm install infinite-loop
```

## Easy to use:

1. require it

```javascript
var InfiniteLoop = require('infinite-loop');
```

2. create a new **il**

```javascript
var il = new InfiniteLoop;
```

3. add a task

```javascript
//simple ++ counter example
var counter = 0;
//task you want to run infinitely
function addOne(n) {
  n++;
  console.log(n);
}

//add it by calling .add
il.add(addOne, counter);
```

4. run it

```javascript
il.run();
```

the infinite-loop is also chainable

```javascript
il.add(addOne, 1).run();
```
and it will output this:

```
1
2
3
4
5
6
...
```

Find out more feature at the APIs section

### Good Performance

Infinite Loop use `setImediate` internally to run task repeatly.

### APIs

#### .add
`.add(function, [arguments...])`
`.add` take one or more arguments.
The first one **must** be a *function*, the rest arguments are the function's arguments.
If the first arguments is not a function , InfiniteLoop will throw an Error.

#### .run
`.run([times])`
invoke the task
`.run()` take one argument optionally. By setting the optional *argument:times*, the task will only run the exact times.

#### .setInterval
`.setInterval(interval)`
It will set an interval for the task.
argument:interval should be a number and should >0
You should call `.setInterval` before `.run`

#### .removeInterval
`.removeInterval()`
remove interval

#### .onError
`.onError(errHandler)`
If not used properly, Infiniteloop will throws some error. By calling `.onError`, you could catch these errors, and prevent the app from crashing.
*argument:errHandler* must be a function

example:
```javascript
il.onError(function(error){
    console.log(error);
});
```

you could emit custom errors by calling `il.emit('error', new Error('error message'))`

### .stop
Stop the InfiniteLoop

example: stop the loop after 10 seconds
```javascript
setTimeout( function(){
    il.stop();
    } , 10 * 1000);
```



code by Spencer.Z
