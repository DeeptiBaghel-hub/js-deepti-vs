/*
=================================================
07_iife.js
TOPIC: IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSION)
=================================================

An IIFE is a function expression that is invoked
immediately after it is defined.

The first pair of parentheses groups the function
as an expression. The final () calls it.
*/

// Example 1: A regular function needs a separate call.
function normalFunction() {
    console.log("Normal function executed!");
}
normalFunction();

// Example 2: Function IIFE.
(function () {
    console.log("IIFE executed immediately!");
})();

// Example 3: IIFE with a parameter.
(function (name) {
    console.log("Hello " + name);
})("JavaScript learner");

// Example 4: Arrow-function IIFE.
(() => {
    console.log("Arrow function IIFE!");
})();

// Example 5: Async IIFE.
// Useful when we want to use await in a one-off
// async block without declaring a named function.
function getData(dataId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Data:", dataId);
            resolve("success");
        }, 700);
    });
}

(async function () {
    console.log("Starting async IIFE...");

    await getData(1);
    await getData(2);
    await getData(3);

    console.log("All data received!");
})();

/*
WHY USE AN IIFE?
1. Run a function immediately.
2. Create a local function scope.
3. Keep temporary variables out of the surrounding
   scope.
4. Use await in an async IIFE when top-level await
   is not available.

NOTE:
Variables declared with let or const inside the
IIFE cannot be accessed from outside its function.
*/
