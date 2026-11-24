# 13 — Fetch API

> Notes from **“Last Lecture: Fetch API with Project | JavaScript Full Course” by Shradha Khapra**.  
> These notes follow the lesson's flow: APIs and endpoints → Fetch API → Promises and JSON → HTTP status codes and headers → Currency Converter mini-project.

## Contents

1. [What is an API?](#1-what-is-an-api)
2. [API endpoints and documentation](#2-api-endpoints-and-documentation)
3. [Fetch API](#3-fetch-api)
4. [Promises, async/await, and JSON](#4-promises-asyncawait-and-json)
5. [Status codes and headers](#5-status-codes-and-headers)
6. [Currency Converter mini-project](#6-currency-converter-mini-project)
7. [Important takeaways](#7-important-takeaways)
8. [Practice tasks](#8-practice-tasks)

---

## 1. What is an API?

**API** stands for **Application Programming Interface**.

An API is an interface through which one program can request data or a service from another system.

### Request–response cycle

- Our application sends a **request**.
- The API/server processes the request.
- The server sends a **response** containing data (or an error).

The lesson uses two helpful analogies:

- **Restaurant waiter:** we tell the waiter what we want; the waiter communicates with the kitchen and brings back the result. We do not need to know how the kitchen prepared it.
- **Recipe API:** we request a particular recipe and the API returns the recipe data.

The important idea: our application can use the returned result without knowing the internal implementation of the server.

## 2. API endpoints and documentation

An **endpoint** is the URL/address to which a request is sent.

For example, an API may have a base URL and a resource path:

```text
https://example.com/api + /resource
```

The complete URL identifies the endpoint. The endpoint determines what data or operation the API provides.

Before using an API, read its **documentation**. Documentation tells you things such as:

- the base URL and available endpoints;
- what each endpoint returns;
- whether parameters are required;
- what request method to use;
- whether authentication or an API key is needed;
- the response structure.

The lesson demonstrates exploring public APIs (including a cat-facts API). The returned data can be an array containing objects, or another JSON structure. Do not assume every API returns the same shape.

**Tip:** Open the endpoint in a browser when the API allows it, inspect the response, and identify the exact property names before writing code.

## 3. Fetch API

The browser's JavaScript **Fetch API** is used to make network requests.

Basic syntax:

```js
// Send a GET request to the endpoint.
// fetch() returns a Promise.
let promise = fetch("https://example.com/api/resource");
```

A common GET request:

```js
fetch("https://example.com/api/resource")
  .then((response) => {
    // The first Promise resolves with a Response object.
    return response.json();
  })
  .then((data) => {
    // data contains the parsed response body.
    console.log(data);
  });
```

### What happens?

1. `fetch(url)` sends the request and returns a Promise.
2. When the response arrives, the first `.then()` receives a **Response** object.
3. `response.json()` reads the response body and parses JSON. It also returns a Promise.
4. The next `.then()` receives the parsed JavaScript value (often an object or array).

**Important:** `fetch()` does not directly give you the final JSON object. First receive the Response, then parse its body.

## 4. Promises, async/await, and JSON

The lesson connects API calls with the Promises concept covered earlier in the JavaScript series.

### Promise chaining

```js
fetch("https://example.com/api/resource")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    // Handle a request/network or parsing error.
    console.error("Request failed:", error);
  });
```

### The same flow with async/await

```js
const getData = async () => {
  // await pauses this async function until fetch's Promise settles.
  const response = await fetch("https://example.com/api/resource");

  // json() is asynchronous too, so await its Promise as well.
  const data = await response.json();

  console.log(data);
};

getData();
```

- Put `async` before a function when you want to use `await` inside it.
- `await` makes asynchronous code easier to read from top to bottom.
- An `async` function returns a Promise.

### What is JSON?

**JSON** means **JavaScript Object Notation**. It is a text format commonly used to exchange data between applications and servers.

JSON may look similar to a JavaScript object, but the response body is JSON text until it is parsed. Use:

```js
const data = await response.json();
```

After parsing, you can access properties using normal JavaScript property access:

```js
console.log(data.someProperty);
```

Always inspect the actual response to learn its structure and property names.

## 5. Status codes and headers

A response includes metadata as well as its body.

### HTTP status-code groups

| Code range | Meaning |
| --- | --- |
| `2xx` | Successful request (the lesson highlights `200` as a common success response) |
| `4xx` | Client-side/request error |
| `5xx` | Server-side error |

A useful distinction: receiving an HTTP error status is not the same thing as a network failure. Check the response status before treating the returned body as successful data.

```js
const response = await fetch(url);

// response.ok is true for successful HTTP status codes (200–299).
if (!response.ok) {
  throw new Error(`HTTP error: ${response.status}`);
}

const data = await response.json();
```

### Headers

**Headers** carry additional information about a request or response. They are separate from the response body and can describe how the data should be handled.

For more detail, the lesson recommends reading the relevant MDN documentation for Fetch and HTTP status codes.

## 6. Currency Converter mini-project

The final project combines the lesson's Fetch API concepts with previously learned JavaScript topics:

- DOM selection and event listeners;
- input values and select/dropdown elements;
- arrays, strings, and object properties;
- asynchronous API requests;
- updating text in the page.

### What the app does

1. The user enters an amount.
2. The user chooses a **From** currency and a **To** currency.
3. The app requests exchange-rate data from a currency API.
4. It reads the rate for the selected target currency.
5. It multiplies the entered amount by that rate.
6. It displays the converted amount in the message area.
7. The app also updates an initial/default conversion when the page loads.

The lesson's examples include converting between USD, INR, JPY, AUD, NPR, and EUR. The lesson also notes that the sample API's exchange rates may be approximate or not fully up to date.

### Project logic (annotated pattern)

The exact endpoint and response property names depend on the currency API selected. Follow that API's documentation and adjust the marked parts to match its response.

```js
// Example structure: replace this URL with the endpoint
// required by the currency API you are using.
const BASE_URL = "https://example.com/currency";

const amountInput = document.querySelector(".amount");
const fromSelect = document.querySelector(".from");
const toSelect = document.querySelector(".to");
const message = document.querySelector(".message");

const updateExchangeRate = async () => {
  // Read the selected currency codes from the dropdowns.
  const fromCurrency = fromSelect.value.toLowerCase();
  const toCurrency = toSelect.value.toLowerCase();

  // Build the endpoint using the API's documented URL pattern.
  const URL = `${BASE_URL}/${fromCurrency}.json`;

  // Request exchange-rate data for the selected From currency.
  const response = await fetch(URL);

  // Stop if the server returned an unsuccessful HTTP status.
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  // Convert the JSON response body into a JavaScript value.
  const data = await response.json();

  // Adjust this property path to match the API's real response.
  const rate = data[fromCurrency][toCurrency];

  // Read the input's VALUE (not the input element itself).
  const amount = Number(amountInput.value);

  // Calculate the converted amount.
  const finalAmount = amount * rate;

  // Show the result in the page.
  message.innerText =
    `${amount} ${fromCurrency.toUpperCase()} = ${finalAmount} ${toCurrency.toUpperCase()}`;
};
```

> **Note:** The code above is a commented learning template, not a copy of the lesson's exact API URL or complete project files. Confirm the response shape in your chosen API before using the property path `data[fromCurrency][toCurrency]`.

### Run the conversion when the user interacts

Attach event listeners to the controls that should trigger a new conversion. The lesson also calls the update function on page load so the default conversion is visible immediately.

```js
// Recalculate when the user changes either currency or the amount.
fromSelect.addEventListener("change", updateExchangeRate);
toSelect.addEventListener("change", updateExchangeRate);
amountInput.addEventListener("input", updateExchangeRate);

// Show the default conversion after the page has loaded.
window.addEventListener("load", updateExchangeRate);
```

### Common mistakes highlighted by the project walkthrough

- **Using the element instead of its value:** use `amountInput.value`, not `amountInput`, when you need the entered text.
- **Not converting the amount to a number:** form input values are strings. Convert before doing arithmetic, for example with `Number(amountInput.value)`.
- **Using the wrong response property:** inspect the JSON and use the correct nested keys. Currency codes may need to be lowercased if that is how the API stores them.
- **Forgetting that JSON parsing is asynchronous:** use `await response.json()` (inside an async function) or return it in a Promise chain.
- **Not refreshing the default result:** call the update function when the page loads.
- **Assuming every API has perfectly current rates:** the lesson's example API returned approximate rates; verify the provider's update frequency and data quality.

## 7. Important takeaways

- API stands for **Application Programming Interface**.
- APIs commonly follow a **request–response** pattern.
- An endpoint is the URL used to request a resource or operation.
- Read API documentation before building a request.
- `fetch()` returns a Promise that resolves to a Response.
- `response.json()` is asynchronous and returns a Promise.
- Use Promise chaining or async/await to handle asynchronous work.
- JSON is a data-exchange format; parse it before treating it as a JavaScript value.
- Check status information and understand response headers.
- The Currency Converter applies Fetch API, DOM manipulation, event listeners, strings, arrays, and object-property access together.

## 8. Practice tasks

- [ ] Call a public API endpoint and log the parsed JSON response.
- [ ] Identify whether the response is an object or an array.
- [ ] Rewrite a Promise-chain request using async/await.
- [ ] Display one property from the response inside the DOM.
- [ ] Add a loading message while the request is in progress.
- [ ] Add an error message for unsuccessful responses or failed requests.
- [ ] Extend the Currency Converter with another currency.
- [ ] Test the converter with different amounts and both dropdowns.

---

## Source

- **Lesson:** *Last Lecture: Fetch API with Project | JavaScript Full Course* — Shradha Khapra.
- **Video date shown in the supplied transcript:** December 15, 2023.
- These notes are based on the transcript supplied for this task. The code snippets above are explanatory examples; endpoint URLs and response paths must be matched to the API you actually use.
