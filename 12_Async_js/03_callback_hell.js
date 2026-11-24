
/*
=================================================
03_callback_hell.js
TOPIC: CALLBACK HELL
=================================================

Callback Hell happens when multiple callbacks
are nested inside one another.

It usually occurs when asynchronous tasks must
execute one after another.

Problem:
- Code becomes difficult to read.
- Code becomes difficult to maintain.
- Too many nested callbacks create complexity.

This structure is also sometimes called
the Pyramid of Doom.
*/


// Function that simulates fetching data
function getData(dataId, callback) {
    setTimeout(() => {
        console.log("Data:", dataId);

        if (callback) {
            callback();
        }
    }, 1000);
}


// Callback Hell example

getData(1, () => {
    console.log("Getting data 2...");

    getData(2, () => {
        console.log("Getting data 3...");

        getData(3, () => {
            console.log("Getting data 4...");

            getData(4, () => {
                console.log("Getting data 5...");

                getData(5, () => {
                    console.log("All data received!");
                });
            });
        });
    });
});


// HOW TO UNDERSTAND THIS?
//
// 1. First getData(1) executes.
// 2. After it completes, getData(2) executes.
// 3. After that, getData(3) executes.
// 4. The same process continues.
//
// Each callback waits for the previous task
// to finish before starting the next one.


// PROBLEM:
// Imagine having 20 or 30 nested callbacks.
// The code would become very difficult to manage.
//
// SOLUTION:
// JavaScript provides Promises and async/await
// to handle asynchronous code more cleanly.
