/*
=================================================
08_async_js_revision.js
TOPIC: ASYNCHRONOUS JAVASCRIPT - REVISION
=================================================

QUICK DEFINITIONS

1. Synchronous code:
   Executes in order; each statement waits for the
   previous synchronous statement to finish.

2. Asynchronous operation:
   Can complete later while the main JavaScript
   execution continues with other work.

3. Callback:
   A function passed to another function to be
   called by that function.

4. Callback Hell:
   Deeply nested callbacks that are hard to read
   and maintain.

5. Promise:
   An object representing the eventual success
   or failure of an asynchronous operation.

6. Promise states:
   Pending, fulfilled, and rejected.

7. then():
   Registers a handler for fulfillment (and can
   also receive a rejection handler as its second
   argument).

8. catch():
   Registers a rejection handler.

9. finally():
   Registers a handler that runs after settlement.

10. Promise chaining:
    Connecting asynchronous steps by returning
    values or Promises from .then() handlers.

11. async:
    Declares a function that always returns a Promise.

12. await:
    Waits for a Promise to settle, pausing the
    surrounding async function.

13. IIFE:
    Immediately Invoked Function Expression.
*/

// A helper function that returns a Promise.
function getData(dataId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Data:", dataId);
            resolve("success");
        }, 500);
    });
}

// METHOD 1: Promise chaining.
getData(1)
    .then(() => getData(2))
    .then(() => getData(3))
    .then(() => {
        console.log("Promise chain completed!");
    })
    .catch((error) => {
        console.error("Promise chain failed:", error);
    });

// METHOD 2: async/await.
async function getAllData() {
    try {
        await getData(4);
        await getData(5);
        await getData(6);
        console.log("Async/await sequence completed!");
    } catch (error) {
        console.error("Async/await failed:", error);
    }
}

getAllData();

/*
FINAL REVISION:
- Callbacks are functions passed to other functions.
- Promises help represent and handle future results.
- Promise chaining keeps dependent async steps readable.
- async/await provides a readable syntax for Promises.
- Use try/catch when awaiting operations that may reject.
- await pauses its async function, not all JavaScript.
- Use Promise.all() when independent tasks should run
  concurrently and you need all their results.
*/
