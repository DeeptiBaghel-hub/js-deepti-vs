# 12 - Async JavaScript

Study notes and runnable examples for asynchronous JavaScript.

## Files

| File | Topic |
| --- | --- |
| [01_sync_vs_async.js](./01_sync_vs_async.js) | Synchronous vs asynchronous execution |
| [02_callbacks.js](./02_callbacks.js) | Callback functions |
| [03_callback_hell.js](./03_callback_hell.js) | Callback Hell / Pyramid of Doom |
| [04_promises.js](./04_promises.js) | Promise states and handlers |
| [05_promise_chaining.js](./05_promise_chaining.js) | Chaining asynchronous operations |
| [06_async_await.js](./06_async_await.js) | async, await, and error handling |
| [07_iife.js](./07_iife.js) | IIFE and async IIFE |
| [08_async_js_revision.js](./08_async_js_revision.js) | Quick revision and comparison |

## Recommended learning order

1. Understand synchronous and asynchronous execution.
2. Learn callbacks and how callback nesting becomes difficult.
3. Understand Promise states: pending, fulfilled, rejected.
4. Practice `.then()`, `.catch()`, and `.finally()`.
5. Learn to return Promises when chaining steps.
6. Rewrite sequential Promise chains with async/await.
7. Understand regular IIFEs and async IIFEs.

## Run an example

From this directory, run one file at a time:

```bash
node 02_callbacks.js
```

Replace the filename with the example you want to run. Timer-based examples print their results after their configured delays.

## Key reminders

- A callback is a function; it is not automatically asynchronous.
- A Promise settles once, either fulfilled or rejected.
- Return a Promise from a `.then()` handler when the next step must wait for it.
- An async function always returns a Promise.
- `await` pauses the surrounding async function, not the entire JavaScript runtime.
- Use `try/catch` to handle errors from awaited Promises.
- Use `Promise.all()` when independent asynchronous operations should run concurrently.
