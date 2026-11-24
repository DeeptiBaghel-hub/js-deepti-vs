/*
=================================================
06_async_await.js
TOPIC: ASYNC AND AWAIT
=================================================

async/await is syntax built on top of Promises.
It makes asynchronous code easier to read.

ASYNC:
- An async function always returns a Promise.
- Returning a normal value fulfills that Promise
  with the returned value.
- Throwing an error rejects that Promise.

AWAIT:
- await can be used inside an async function
  (and at the top level of JavaScript modules).
- It waits for a Promise to settle and pauses only
  the surrounding async function, not the whole
  JavaScript runtime.
*/

function getData(dataId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Data:", dataId);
            resolve("success");
        }, 1000);
    });
}

// Example 1: An async function returns a Promise.
async function sayHello() {
    return "Hello from an async function!";
}

sayHello().then((message) => console.log(message));

// Example 2: Await sequential asynchronous tasks.
async function getAllData() {
    console.log("Getting data 1...");
    await getData(1);

    console.log("Getting data 2...");
    await getData(2);

    console.log("Getting data 3...");
    await getData(3);

    console.log("All data received!");
}

getAllData();

// Example 3: Handling rejected Promises with try/catch.
function checkData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = false;

            if (success) {
                resolve("Data fetched successfully!");
            } else {
                reject(new Error("Unable to fetch data."));
            }
        }, 500);
    });
}

async function handleData() {
    try {
        const result = await checkData();
        console.log(result);
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        console.log("Data request finished.");
    }
}

handleData();

/*
IMPORTANT NOTES:
1. async functions always return Promises.
2. await waits for a Promise to settle.
3. A rejected Promise behaves like a thrown error
   at the await expression.
4. Use try/catch to handle errors.
5. Sequential awaits run one after another. If tasks
   are independent, Promise.all() may be more suitable.
*/
