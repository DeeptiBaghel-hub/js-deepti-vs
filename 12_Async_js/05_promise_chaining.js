/*
=================================================
05_promise_chaining.js
TOPIC: PROMISE CHAINING
=================================================

Promise chaining connects asynchronous operations
using multiple .then() handlers.

Each .then() returns a new Promise. Return the
next Promise from a handler when the next step
must wait for it.

This avoids deeply nested callbacks.
*/

function getData(dataId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data:", dataId);
            resolve("success");
        }, 1000);
    });
}

console.log("Starting Promise chain...");

getData(1)
    .then((result) => {
        console.log("First task:", result);
        console.log("Getting data 2...");
        return getData(2); // Return it so the chain waits.
    })
    .then((result) => {
        console.log("Second task:", result);
        console.log("Getting data 3...");
        return getData(3);
    })
    .then((result) => {
        console.log("Third task:", result);
        console.log("All data received!");
    })
    .catch((error) => {
        // Handles a rejection from any earlier step
        // unless it was already handled.
        console.error("Something went wrong:", error);
    })
    .finally(() => {
        // Runs after the chain settles.
        console.log("Promise chain finished.");
    });

/*
IMPORTANT NOTES:
1. .then() returns a new Promise.
2. Return a Promise to make the next step wait.
3. Throwing an error rejects the Promise returned
   by the current handler.
4. A catch near the end can handle earlier errors.
5. finally() is useful for cleanup shared by both
   success and failure paths.
*/
