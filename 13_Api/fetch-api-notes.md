# Fetch API — Detailed Notes

These notes expand the Fetch API portion of the supplied lesson, *Last Lecture: Fetch API with Project | JavaScript Full Course* by Shradha Khapra. They follow the lesson's explanations and examples. Code is written as commented learning examples; use the endpoint and response keys documented by the API you choose.

## 1. Why do we need APIs?

A web page often needs information that it does not already have: recipes, cat facts, weather, currency rates, books, or business information. Instead of storing all that information in our own page, JavaScript can request it from another system.

**API** = **Application Programming Interface**.

Think of an API as a communication interface between two software systems.

### The restaurant analogy from the lesson

- We (the customer) ask the waiter for a dish.
- The waiter takes the request to the kitchen.
- The kitchen prepares the result.
- The waiter brings the dish back.
- We do not need to know the kitchen's internal process.

In an application:
- the browser-side JavaScript sends a request;
- a server/API handles it;
- the server returns a response;
- JavaScript uses the returned data to update the page.

This is the **request–response cycle**.

```text
JavaScript in browser  ---- request ---->  API / server
JavaScript in browser  <--- response ----  API / server
```

The API decides what data it returns. A recipe API returns recipe information; a cat-facts API returns cat facts; a currency API returns exchange-rate information.

## 2. Endpoints and API documentation

An **endpoint** is the URL to which we send a request to access a particular resource or operation.

An API commonly has:
- a **base URL**: the common starting part of its address;
- a **path/resource**: the part identifying the particular data we want;
- sometimes **query parameters** or other required inputs.

Example shape only:

```text
Base URL:  https://example.com/api
Path:      /facts
Endpoint:  https://example.com/api/facts
```

The lesson opens public API directories and explores a cat-facts API. The important learning point is not the particular cat API; it is how to inspect an API and its response.

### Read the documentation before coding

API documentation tells us:
1. the base URL;
2. which endpoints exist;
3. what each endpoint returns;
4. what request method to use;
5. what parameters or headers are required;
6. whether authentication/API keys are required;
7. the structure of the response.

Do not guess the shape of the response. Open the endpoint (when the API permits it), inspect the returned JSON, and identify its arrays, objects, and property names.

For example, a response might be an array containing objects. Another API might return one object containing nested objects. Your property access must match the actual response.

## 3. Fetch API: making the request

The browser provides the JavaScript **Fetch API** to make network requests.

```js
// Send a request to an API endpoint.
// fetch() immediately returns a Promise; it does not return the final data.
const promise = fetch("https://example.com/api/facts");
console.log(promise);
```

When no options are supplied, `fetch()` makes a **GET** request by default.

### What is a GET request?

A GET request is used to retrieve/read data from a server. In the lesson, we only want to receive a cat fact, so GET is appropriate.

Other common HTTP methods introduced in the lesson:

| Method | General purpose |
| --- | --- |
| GET | Retrieve data |
| POST | Send data to create/process something |
| PUT | Update/replace a resource |
| DELETE | Delete a resource |

The lesson points to the Fetch API documentation's `options` object and its `method` property. For example, setting `method: "POST"` changes the request to POST:

```js
fetch("https://example.com/api/resource", {
  method: "POST", // Select the HTTP method.
});
```

A real POST request may also need a body and headers; the exact requirements come from that API's documentation.

## 4. Understand the Response object

The first value received from `fetch()` is a **Response object**, not the final data we wanted.

```js
fetch("https://example.com/api/facts")
  .then((response) => {
    // response is a Response object.
    console.log(response);
    console.log(response.status); // For example, 200 when successful.
  });
```

The lesson demonstrates inspecting the response and printing its `status`. It shows `200` as a successful response.

The Response object contains information about the server's response, including status and headers, and provides methods to read the body.

### Why does the response not immediately show the fact?

The response body is delivered in a data format (commonly JSON). We must read/parse that body before using the data as a JavaScript object or array.

## 5. AJAX, XML, and JSON

The lesson introduces the term **AJAX**:

**AJAX** = **Asynchronous JavaScript and XML**.

Historically, network data was often exchanged as XML. Modern APIs commonly exchange JSON instead. The term AJAX is still widely used for asynchronous network requests even though JSON is now common.

### What is JSON?

**JSON** = **JavaScript Object Notation**.

JSON is a text-based data format. It looks similar to JavaScript object syntax, which makes it convenient for JavaScript developers, but JSON text is not automatically a JavaScript object.

Think of sending money:
- cash and UPI represent the same underlying value (money);
- but the format is different, so the way the receiver handles it is different.

Likewise, the information may be the same while the data format differs. We must parse JSON before accessing it like normal JavaScript data.

## 6. Parse the body with response.json()

`response.json()` reads the response body and parses JSON. It returns a Promise, so it is asynchronous too.

### Promise-chain version shown by the lesson's flow

```js
fetch("https://example.com/api/facts")
  .then((response) => {
    // Step 1: receive the Response object.
    console.log("Response:", response);

    // Step 2: ask the Response to parse its JSON body.
    // Return this Promise so the next .then() waits for it.
    return response.json();
  })
  .then((data) => {
    // Step 3: data is now the parsed JavaScript value.
    console.log("Actual API data:", data);
  });
```

Notice the two separate asynchronous steps:
1. wait for `fetch()` to receive the response;
2. wait for `response.json()` to parse the response body.

If you only log `response`, you are looking at response metadata, not the parsed API data.

### Async/await version

```js
const getFacts = async () => {
  // Wait until the request has produced a Response.
  const response = await fetch("https://example.com/api/facts");

  // Wait until the response body has been parsed from JSON.
  const data = await response.json();

  // Now use the parsed data.
  console.log(data);
};

// Call the async function to start the request.
getFacts();
```

- `async` marks a function as asynchronous.
- `await` waits for a Promise to settle inside that async function.
- An async function itself returns a Promise.
- Await both `fetch()` and `response.json()`; they represent two different asynchronous operations.

## 7. HTTP status codes

A response includes a numeric status code. The lesson explains these broad groups:

| Range | Meaning |
| --- | --- |
| 2xx | Request succeeded |
| 4xx | Problem with the request/client side |
| 5xx | Server/API-side problem |

The lesson uses **200** as the typical success example. It recommends reading MDN's HTTP status-code documentation to explore individual codes.

A practical check:

```js
const response = await fetch(url);

console.log(response.status); // Numeric HTTP status.
console.log(response.ok);     // true for a successful 2xx response.

if (!response.ok) {
  // fetch does not automatically reject just because the server
  // returned an HTTP error status such as 404 or 500.
  throw new Error(`HTTP status: ${response.status}`);
}

const data = await response.json();
```

This check is useful because a request can successfully reach a server and still receive an HTTP error response. Network failure and an HTTP error status are not the same situation.

## 8. Headers

Requests and responses can contain **headers**. Headers carry extra information about the request or response, separate from the main response body.

For example, headers can describe the content type or communicate information required by an API. The exact headers depend on the service and its documentation.

The lesson highlights that both requests and responses have headers and recommends reading the MDN documentation for more detail.

## 9. A reliable Fetch pattern to remember

```js
const loadData = async () => {
  try {
    // 1. Make the request.
    const response = await fetch("https://example.com/api/resource");

    // 2. Check the HTTP status before using the body as success data.
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    // 3. Parse JSON (this is another Promise).
    const data = await response.json();

    // 4. Work with the parsed JavaScript data.
    console.log(data);
  } catch (error) {
    // 5. Handle network, parsing, or explicitly thrown errors.
    console.error("Could not load data:", error);
  }
};

loadData();
```

This pattern adds error handling around the same sequence the lesson teaches: fetch → response → JSON parsing → use the data.

## 10. Debugging checklist

When the expected data does not appear:

- [ ] Did I use the correct endpoint URL?
- [ ] Did I read the API documentation?
- [ ] Did I inspect the Response object and its status?
- [ ] Did I call `response.json()`?
- [ ] Did I `await` or return the Promise from `response.json()`?
- [ ] Am I reading the correct property/key from the parsed data?
- [ ] Is the server returning an HTTP error status?
- [ ] Did I check the browser console for errors?

## 11. Practice

1. Open a public API endpoint and identify whether its response is an object or array.
2. Log the Response object. Then log `response.status`.
3. Parse the body with `response.json()` and log the result.
4. Write the same request once with `.then()` and once with `async/await`.
5. Find the endpoint's documentation and identify its supported methods.
6. Inspect the response headers.
7. Add a status check and a `try/catch` block.

## Source and scope

Based on the supplied transcript of *Last Lecture: Fetch API with Project | JavaScript Full Course* by Shradha Khapra. The transcript discusses API request/response, endpoints and documentation, a cat-facts example, Fetch's default GET behavior, other HTTP methods, Response/status, AJAX, XML/JSON, `response.json()`, status-code groups, headers, and the MDN documentation. The code here is explanatory and uses placeholder endpoints where the transcript does not establish a reusable exact URL.
