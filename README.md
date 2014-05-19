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
//task you want to run infinitely
function addOne(n) {
  n++;
  console.log(n);
}

//add it by calling .add
il.add(addOne, 1);
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


coded by Spencer.Z