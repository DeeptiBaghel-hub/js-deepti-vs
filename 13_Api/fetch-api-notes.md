# Fetch API — Notes from the Lecture

**Source:** “Last Lecture: Fetch API with Project | JavaScript Full Course” by Shradha Khapra.  
**Transcript:** auto-dubbed Hindi transcript supplied in this conversation.

These notes follow the order of the lecture. Code is included only to make the narrated steps readable; where the auto-dubbed transcript does not preserve exact code, it is marked as a reconstruction.

## 1. What this final chapter teaches (0:00–1:32)

The chapter introduces Fetch API calls: sending a request to an API endpoint, receiving data, and using that data in JavaScript.

At the end, the instructor builds a Currency Converter using concepts already covered in the JavaScript series:
- DOM;
- API calls;
- strings and arrays;
- the existing JavaScript knowledge from the course.

## 2. API recap: request and response (1:32–3:55)

An API is described as a system/server created by another party. We send it a request, and it returns a response containing data. The returned data depends on the API being used.

**Recipe analogy:** imagine an API that stores recipes. We request a pizza recipe, and the API returns the information needed to prepare it.

**Restaurant analogy:** the customer tells the waiter what food they want. The waiter communicates with the kitchen and brings the food back. The customer does not need to know how the kitchen prepared it; they receive the final result.

The lecture calls this the **request–response cycle**:

```text
Send request to API  →  API processes request
Receive response    ←  API returns data
```

API stands for **Application Programming Interface**.

## 3. Public APIs, documentation, and endpoints (4:01–6:10)

The instructor searches for free public APIs and shows that APIs exist for different topics, including books, business, calendars, food, and cat facts.

The lecture opens a **Cat Facts API** and its documentation. The documentation is where a developer checks how that API can be used, including its base URL and endpoints.

An **endpoint** is the URL/link to which the request is sent. The browser example is visiting `google.com`: the browser sends a request to that URL and receives data in response.

Important distinction from the lesson:
- API documentation explains how to use that API.
- The endpoint is the URL being requested.
- The response contains the data returned by the API.

## 4. First Fetch request and the Promise (around 6:10–12:15)

The instructor uses Fetch with the Cat Facts API. Calling `fetch(url)` starts an asynchronous request and immediately gives back a **Promise**, not the final cat-fact data.

The console first shows the Promise as **pending**. After the request completes, it becomes fulfilled and the response is available.

The lecture then places the request inside an asynchronous function called `getFacts` and uses `await`:

```js
// Reconstructed from the narrated steps; use the Cat Facts endpoint
// shown in the lesson/documentation when following along.
const getFacts = async () => {
  console.log("Getting data...");

  // fetch() returns a Promise, so wait for the response.
  const response = await fetch(url);

  // At this point we have the response object.
  console.log(response);
};

getFacts();
```

The instructor points out that the message appears first and the response appears after a short delay. That delay demonstrates asynchronous work.

The page does not reload when this API request completes; the response is updated at runtime.

## 5. The Response object (12:15–15:05)

The value returned after the Fetch Promise resolves is a **Response object**. It is not yet the Cat Facts data in the form we want to use.

The lecture inspects properties of the response, including:
- response body;
- headers;
- status;
- status text;
- URL.

A status of **200** is shown as a successful request. The instructor also logs `response.status`.

The reason the cat fact is not directly visible as ordinary JavaScript data is that the response body is in a different data format and must be read/parsed.

## 6. AJAX, XML, and JSON (15:05–24:00 approx.)

The instructor explains these terms before parsing the response:

- **AJAX** means **Asynchronous JavaScript and XML**.
- Earlier network responses commonly used XML.
- The lesson then introduces JSON as the format used in the API response.

**JSON** means **JavaScript Object Notation**. It is a data format that looks similar to JavaScript object notation, but the response body still needs to be parsed before using it as JavaScript data.

The lecture uses a money-format analogy: the underlying value can be the same while the representation differs (for example, UPI and cash). In the same way, the information is there, but its format must be converted/read appropriately.

### Parse with `response.json()`

The instructor uses `response.json()` to parse the response body. This operation also returns a Promise.

The narrated Promise-chain sequence is:

1. call `fetch(url)`;
2. receive the response in the first `.then()`;
3. return `response.json()`;
4. receive the parsed data in the next `.then()`;
5. print/use the data.

Reconstructed example:

```js
fetch(url)
  .then((response) => {
    // First .then receives the Response object.
    return response.json();
  })
  .then((data) => {
    // Second .then receives the parsed response data.
    console.log(data);
  });
```

The instructor compares this with the earlier `async/await` version and says that async/await is simpler to read, while Promise chaining is also valid.

## 7. HTTP request methods (26:05–27:54)

The lecture expands on HTTP request methods and refers viewers to the MDN HTTP request methods documentation.

Methods discussed:
- **GET** — retrieve data;
- **POST** — send data;
- **DELETE** — delete data;
- **PUT** — update/replace data;
- **PATCH** — update existing data (also mentioned during the explanation).

When no options are passed to `fetch()`, it makes a **GET** request by default. The Cat Facts example is a GET request because the goal is to receive data, not send data.

The instructor demonstrates that the request method can be changed through the Fetch options object:

```js
// The method option changes the request type.
// This is the POST-method example discussed in the lecture.
fetch(url, {
  method: "POST"
});
```

The lecture leaves sending a POST request as a homework task after the Currency Converter project.

## 8. HTTP response status codes (28:24–30:18)

The response has a status code that helps explain what happened to the request.

Examples explained in the lecture:
- **200** — successful response;
- **400** — Bad Request; the request is invalid;
- **404** — Page/endpoint not found;
- **500-range** — server-side/API-side error.

The instructor demonstrates changing the Cat Facts URL to an invalid one and observes an error status. The point is to distinguish a problem with the request from a problem on the server/API side.

The lesson refers to the MDN HTTP response status codes page for the full list.

## 9. Request and response headers (30:18–31:15)

Both requests and responses can have **headers**.

Headers contain additional information. The instructor gives response content type and status-related information as examples, and explains that request headers can also carry extra information.

## 10. Homework: send a POST request (31:15–31:54)

The instructor assigns a small task: learn how to send a **POST request using Fetch API**. The hint is to use the Fetch URL together with additional options, and set the request method to POST.

This is the lecture's homework task; it is not presented as a completed example in this chapter.

## Transcript boundaries

The supplied transcript is auto-dubbed. Some code identifiers and exact URL text are not reliably transcribed. The code snippets above show the sequence described aloud; they are not claimed to be verbatim source code. The lecture then moves into the Currency Converter project, documented separately in [the project walkthrough](currency-converter/README.md).
