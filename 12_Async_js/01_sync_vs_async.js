
/*
========================================================
  01. SYNCHRONOUS VS ASYNCHRONOUS JAVASCRIPT
========================================================

SYNCHRONOUS JAVASCRIPT:
- Code executes line by line.
- Each instruction waits for the previous instruction
  to finish before executing.

ASYNCHRONOUS JAVASCRIPT:
- Some operations take time to complete.
- JavaScript can start these operations and continue
  executing the remaining code.
- Their callbacks execute later when they are ready.

Examples of asynchronous operations:
1. setTimeout()
2. API requests
3. Fetching data from a server
4. Reading files (in Node.js)
*/

// ------------------------------------------------------
// 1. SYNCHRONOUS CODE
// ------------------------------------------------------

console.log("One");
console.log("Two");
console.log("Three");

/*
OUTPUT:
One
Two
Three

Explanation:
JavaScript executes each line in sequence.
The second statement executes after the first,
and the third executes after the second.
*/


// ------------------------------------------------------
// 2. ASYNCHRONOUS CODE USING setTimeout()
// ------------------------------------------------------

console.log("Start");

setTimeout(() => {
    console.log("Hello after 2 seconds");
}, 2000);

console.log("End");

/*
OUTPUT:
Start
End
Hello after 2 seconds

Explanation:
- setTimeout() schedules a callback function.
- It does not stop the execution of the remaining code.
- JavaScript continues and prints "End".
- After approximately 2 seconds, the callback becomes
  eligible to execute.

IMPORTANT:
setTimeout() does not guarantee execution at the exact
specified time. The callback runs when its delay has
elapsed and the event loop can execute it.
*/


// ------------------------------------------------------
// 3. UNDERSTANDING EXECUTION ORDER
// ------------------------------------------------------

console.log("1. First");

setTimeout(() => {
    console.log("2. Inside setTimeout");
}, 0);

console.log("3. Third");

/*
OUTPUT:
1. First
3. Third
2. Inside setTimeout

WHY?

Even though the timer delay is 0 milliseconds,
the callback is scheduled to execute later.

The synchronous code finishes first.
Then the event loop allows the timer callback to run.
*/


// ------------------------------------------------------
// 4. A REAL-LIFE EXAMPLE
// ------------------------------------------------------

console.log("Customer places an order");

// Simulate waiting for food preparation.
setTimeout(() => {
    console.log("Food is ready!");
}, 3000);

console.log("Customer can do other work while waiting");

/*
OUTPUT:
Customer places an order
Customer can do other work while waiting
Food is ready!

Real-life understanding:

Imagine ordering food at a restaurant.

1. You place an order.
2. The restaurant starts preparing your food.
3. You do not need to stand still doing nothing.
4. You can do other work while the food is prepared.
5. When the food is ready, you receive it.

This is similar to asynchronous programming.
*/


// ------------------------------------------------------
// 5. IMPORTANT CONCEPTS
// ------------------------------------------------------

/*
SYNCHRONOUS:
- Executes one instruction at a time.
- Follows the written order.
- Each instruction waits for the previous one.

ASYNCHRONOUS:
- Allows time-consuming operations to complete later.
- Remaining synchronous code can continue running.
- Uses callbacks, Promises, and async/await to handle
  asynchronous results.

NOTE:
JavaScript is single-threaded in its main execution
model, but the JavaScript runtime provides mechanisms
such as timers and APIs to handle asynchronous work.
The event loop coordinates when callbacks can run.
*/
