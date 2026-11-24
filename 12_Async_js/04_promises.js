
/*
=================================================
04_promises.js
TOPIC: PROMISES IN JAVASCRIPT
=================================================

A Promise is an object representing the eventual
completion or failure of an asynchronous operation.

A Promise has three states:

1. Pending   - Initial state; task is not completed.
2. Fulfilled - Task completed successfully.
3. Rejected  - Task failed.

A Promise is created using the Promise constructor.

It takes a callback function called the executor.
The executor receives two functions:

- resolve: called when the task succeeds.
- reject: called when the task fails.
*/


// Example 1: Creating a Promise

const myPromise = new Promise((resolve, reject) => {

    let taskCompleted = true;

    if (taskCompleted) {
        resolve("Task completed successfully!");
    } else {
        reject("Task failed!");
    }

});


// Example 2: Handling a Promise

myPromise
    .then((result) => {
        // Runs when Promise is fulfilled
        console.log("SUCCESS:", result);
    })
    .catch((error) => {
        // Runs when Promise is rejected
        console.log("ERROR:", error);
    })
    .finally(() => {
        // Runs after settlement, regardless
        // of whether it fulfilled or rejected
        console.log("Promise operation finished.");
    });


// Example 3: Promise with setTimeout

function getData(dataId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            console.log("Data:", dataId);

            // Resolve the Promise with a value
            resolve("success");

        }, 2000);

    });

}


// Calling the function returns a Promise
const result = getData(1);

result.then((message) => {
    console.log(message);
});


// IMPORTANT NOTES:
//
// 1. A Promise represents a future result.
// 2. resolve() fulfills a Promise.
// 3. reject() rejects a Promise.
// 4. .then() handles successful fulfillment.
// 5. .catch() handles rejection.
// 6. .finally() runs after the Promise settles.
// 7. A Promise can settle only once.
