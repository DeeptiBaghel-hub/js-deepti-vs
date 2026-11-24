
/*
=================================================
02_callbacks.js
TOPIC: CALLBACKS IN JAVASCRIPT
=================================================

A callback is a function passed as an argument
to another function.

The receiving function can execute the callback
when a particular task is completed.

Callbacks are commonly used in asynchronous
operations such as timers, events, and API calls.
*/

// Example 1: Basic callback

function greet(name, callback) {
    console.log("Hello " + name);

    // Calling the callback function
    callback();
}

function sayBye() {
    console.log("Goodbye!");
}

// Passing sayBye as a callback
greet("Dizzzyyyy", sayBye);


// Example 2: Callback with setTimeout

function getData(dataId, callback) {
    // setTimeout simulates a task that takes time
    setTimeout(() => {
        console.log("Data:", dataId);

        // Execute callback after data is received
        if (callback) {
            callback();
        }
    }, 2000);
}

console.log("Getting data...");

getData(1, () => {
    console.log("Data received successfully!");
});


// Example 3: Multiple callbacks in sequence

function getStudentData(id, callback) {
    setTimeout(() => {
        console.log("Student ID:", id);

        callback();
    }, 1000);
}

getStudentData(101, () => {
    console.log("First task completed");
});


// IMPORTANT NOTES:
// 1. A callback is simply a function passed to another function.
// 2. A callback can be executed immediately or later.
// 3. setTimeout is one example of asynchronous callback usage.
// 4. Callbacks help us control what happens after a task finishes.
