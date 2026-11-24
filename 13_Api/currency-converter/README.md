# Currency Converter — Detailed Project Walkthrough

These notes follow the Currency Converter mini-project in the supplied Fetch API lesson. The walkthrough combines HTML, CSS, DOM selection, arrays/objects, event listeners, Fetch, JSON parsing, and exchange-rate arithmetic.

> The transcript refers to a downloadable country/currency list and a sample exchange-rate API. It does not provide a complete reusable copy of every source file or guarantee that the sample API remains available. The examples below explain the structure and mark API-specific details clearly.

## 1. What are we building?

A small page where a user can:
1. enter an amount;
2. choose a currency in the **From** dropdown;
3. choose a currency in the **To** dropdown;
4. click **Get Exchange Rate**;
5. see the converted amount.

The lesson begins with a USD → INR default example, then tests other currencies such as EUR, AUD, JPY, and NPR.

## 2. Project files

The lesson creates an HTML page titled **Currency Converter** and links a CSS stylesheet. A typical organization is:

```text
currency-converter/
├── index.html
├── style.css
└── app.js
```

- `index.html`: page structure (amount input, two selects, flags, button, result message).
- `style.css`: layout and appearance.
- `app.js`: currency list, dropdown options, flag changes, Fetch request, and conversion.

## 3. HTML structure

The lesson builds the page in small pieces:

1. A main `.container` div.
2. An `h2` heading: Currency Converter.
3. A `form`.
4. An amount section with a label and input (initial example value: 100).
5. A `.dropdown` section containing two currency selectors:
   - From selector;
   - To selector.
6. Each selector is wrapped in a `.select-container` with a flag image and a `select` element.
7. A result/message area, initially showing an example such as 1 USD = 80 INR.
8. A button labelled **Get Exchange Rate**.

Example semantic skeleton (class names are illustrative; keep them consistent with your JavaScript selectors):

```html
<div class="container">
  <h2>Currency Converter</h2>

  <form>
    <div class="amount">
      <p>Enter Amount</p>
      <input class="amount-input" type="number" value="1" min="1">
    </div>

    <div class="dropdown">
      <div class="select-container">
        <p>From</p>
        <img class="flag" src="..." alt="From country flag">
        <select name="from" id="from"></select>
      </div>

      <div class="select-container">
        <p>To</p>
        <img class="flag" src="..." alt="To country flag">
        <select name="to" id="to"></select>
      </div>
    </div>

    <div class="message" aria-live="polite">Choose currencies to convert.</div>
    <button type="submit">Get Exchange Rate</button>
  </form>
</div>
```

The source lesson uses an input, two select elements, flag images, a message, and a form button. Adjust selectors in the JavaScript if you choose different class names or IDs.

## 4. Styling and layout decisions

The lesson styles the page progressively rather than all at once.

### Page and main container

- Reset the default margin and padding.
- Use flexbox on the body to center the converter.
- Center items horizontally and vertically.
- Give the body a minimum height of 100 viewport height.
- Apply a light background colour.
- Give the main container an off-white/white background, padding, rounded corners, and a fixed/relative width and minimum height.

### Form controls

- Make the input, selects, and button fill the available form width where appropriate.
- Remove the browser's default border and add a light border.
- Add rounded corners.
- Give the amount input a readable font size, height, and padding.
- Use a flex row for the From and To sections so they appear on the same line.
- Use `justify-content: space-between` and `align-items: center` to position the two currency controls.
- Place the flag image and select next to each other using flexbox.
- Give the flag a controlled width so it does not dominate the dropdown.
- Add spacing around the message and button.

A simplified CSS sketch:

```css
/* Center the converter in the viewport. */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4e4eb;
}

.container {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  width: min(90vw, 28rem);
}

form input,
form select,
form button {
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 0.75rem;
}

.dropdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.select-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.select-container img {
  width: 2rem;
}

.message {
  margin: 2rem 0;
}
```

This is a compact illustration of the layout choices, not a pixel-perfect transcription of the lesson's full stylesheet.

## 5. Currency codes and country flags

The lesson starts with a few hard-coded options (USD, INR, EUR, AUD), then explains that the supplied currency/country list contains roughly 160 entries. Each entry provides a currency code and a country code.

Why keep both codes?
- The **currency code** is used to request the exchange rate (for example, USD or INR).
- The **country code** is used to show the matching flag image.

A flag-image service can return a flag based on a country code. The lesson demonstrates changing the code in the flag URL to show different country flags. Do not assume currency code and country code are always identical; use the mapping supplied with the project data.

### Populate the dropdowns from a list

A common pattern is to loop over the currency list and create an `option` for each entry:

```js
// Example shape only. Use the actual country/currency data file
// supplied with the lesson or your own verified mapping.
const countryList = {
  USD: "US",
  INR: "IN",
  EUR: "EU",
  AUD: "AU",
  JPY: "JP",
  NPR: "NP"
};

const selects = document.querySelectorAll("select");

for (const select of selects) {
  for (const currencyCode in countryList) {
    // Create one option for each currency code.
    const option = document.createElement("option");

    // The option's visible text and value are the currency code.
    option.value = currencyCode;
    option.textContent = currencyCode;

    // Set the lesson's initial defaults: USD in From and INR in To.
    if (select.name === "from" && currencyCode === "USD") {
      option.selected = true;
    }
    if (select.name === "to" && currencyCode === "INR") {
      option.selected = true;
    }

    select.append(option);
  }

  // Once the options are created, update this select's flag.
  select.dispatchEvent(new Event("change"));
}
```

The lesson's logic checks which dropdown is being populated (From or To) and marks USD or INR as selected initially. This gives the app a predictable starting conversion.

## 6. Update the flag when a dropdown changes

The lesson creates an `updateFlag` function and attaches a `change` event listener to each select.

The event object is useful:
- `event.target` is the select element that changed.
- `event.target.value` is the selected currency code.
- The selected element's parent container contains the related flag image.

```js
const updateFlag = (selectElement) => {
  // Read the selected currency code (for example, "INR").
  const currencyCode = selectElement.value;

  // Look up the country code from the mapping.
  const countryCode = countryList[currencyCode];

  // Find the flag image next to this select.
  const image = selectElement.parentElement.querySelector("img");

  // Replace the image URL with the flag for the selected country.
  image.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Listen for changes on both dropdowns.
document.querySelectorAll("select").forEach((select) => {
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
});
```

The lesson's sequence is: get the changed select → read its value → look up the country code → build the new flag source → find the image in the select's parent container → update `src`.

If the selected option changes but the flag does not, inspect the mapping and the DOM relationship between the select and image.

## 7. Stop the form from reloading the page

The lesson observes that clicking a button inside a form submits the form by default. The browser then reloads/navigates, which interrupts the intended in-page interaction.

Use the submit event and prevent the default browser action:

```js
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  // Stop the browser's default form submission/reload.
  event.preventDefault();

  // Run our own conversion logic instead.
  updateExchangeRate();
});
```

This is important: the browser's default form behavior is not the conversion behavior. We prevent the reload and handle the submission ourselves.

## 8. Read and validate the amount

The lesson reads the amount input and then its `.value`.

Remember:
- `document.querySelector(...)` returns the HTML element.
- `input.value` returns the text currently entered into that input.
- Input values are strings, even when the user enters digits.

The lesson handles an empty amount or a value less than 1 by resetting it to 1.

```js
const amountInput = document.querySelector(".amount input");

let amount = amountInput.value;

// Empty input or an amount below 1 is reset to 1.
if (amount === "" || Number(amount) < 1) {
  amount = 1;
  amountInput.value = "1";
}

// Convert the input string into a number for multiplication.
amount = Number(amount);
```

Why the lesson's debugging mattered:
- It initially logged the input element instead of the entered value.
- The amount must come from `amount.value`.
- Arithmetic should use a number, not the input element or an unconverted string.

## 9. Build the exchange-rate endpoint

When the user submits the form, read both selected currency codes:

```js
const fromCurrency = document.querySelector("#from").value.toLowerCase();
const toCurrency = document.querySelector("#to").value.toLowerCase();
```

The lesson builds a URL from:
- the API's base URL;
- the selected **From** currency;
- the selected **To** currency;
- a JSON suffix.

Illustrative endpoint pattern:

```js
const BASE_URL = "https://example.com/latest/currencies";

// The exact path format must match the API's documentation.
const url = `${BASE_URL}/${fromCurrency}/${toCurrency}.json`;
```

The source walkthrough describes removing a fixed currency suffix from the base URL and then inserting the selected From and To values. Treat the above as a pattern, not a guaranteed live endpoint. The actual API's documentation determines the exact URL.

## 10. Fetch the rate and calculate the result

The lesson makes the exchange-rate function asynchronous because it uses `await`.

```js
const updateExchangeRate = async () => {
  // 1. Read the amount entered by the user.
  let amount = amountInput.value;

  // 2. Use 1 if the field is empty or less than 1.
  if (amount === "" || Number(amount) < 1) {
    amount = 1;
    amountInput.value = "1";
  }

  // 3. Read the selected currency codes.
  const fromCurrency = fromSelect.value.toLowerCase();
  const toCurrency = toSelect.value.toLowerCase();

  // 4. Build the endpoint in the format required by your API.
  const url = buildCurrencyEndpoint(fromCurrency, toCurrency);

  // 5. Fetch returns a Promise that resolves to a Response.
  const response = await fetch(url);

  // 6. Parse the JSON body (also asynchronous).
  const data = await response.json();

  // 7. Read the selected target currency's rate.
  // This property path is API-specific; inspect the JSON first.
  const rate = data[fromCurrency][toCurrency];

  // 8. Convert the input to a number and multiply by the rate.
  const finalAmount = Number(amount) * Number(rate);

  // 9. Update the message shown in the page.
  message.innerText =
    `${amount} ${fromCurrency.toUpperCase()} = ${finalAmount} ${toCurrency.toUpperCase()}`;
};
```

The lesson demonstrates the key arithmetic:

```js
finalAmount = amount * exchangeRate;
```

Example for understanding only: if the entered amount is 10 and the API rate says 1 USD = 83 INR, the result is 10 × 83 = 830 INR. The lesson's own sample rates are approximate and should not be treated as current financial data.

### Why use lowercase currency codes?

The lesson converts the selected From and To codes to lowercase before using them in the endpoint/property lookup. This is because the sample API's URL/JSON keys use lowercase codes. Always match the case expected by the API.

### Why inspect the response before accessing the rate?

The rate might be nested inside one or more objects. The property path `data[fromCurrency][toCurrency]` only works if the response actually has that shape. Log the parsed data and follow the real keys.

## 11. Display the result

The lesson selects the message element and changes its `innerText` to show:
- entered amount;
- From currency;
- calculated amount;
- To currency.

```js
const message = document.querySelector(".message");

message.innerText =
  `${amount} ${fromCurrency.toUpperCase()} = ${finalAmount} ${toCurrency.toUpperCase()}`;
```

Use `innerText` when you want to place ordinary text in the element.

## 12. Run once when the page loads

The lesson wants the default USD → INR conversion to appear without the user first clicking the button.

It creates/uses an `updateExchangeRate` function and calls it on the window's load event:

```js
window.addEventListener("load", () => {
  // Show the default conversion as soon as the page is ready.
  updateExchangeRate();
});
```

The transcript notes a debugging correction: the load listener belongs on `window` for the behavior shown in the lesson.

## 13. A more defensive version

This example adds clear checks around the same lesson logic. Replace `buildCurrencyEndpoint` and the rate property path with the actual API's documented format.

```js
const updateExchangeRate = async () => {
  try {
    let amount = amountInput.value;

    if (amount === "" || Number(amount) < 1) {
      amount = "1";
      amountInput.value = "1";
    }

    const fromCurrency = fromSelect.value.toLowerCase();
    const toCurrency = toSelect.value.toLowerCase();
    const url = buildCurrencyEndpoint(fromCurrency, toCurrency);

    message.innerText = "Getting exchange rate...";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const rate = data[fromCurrency][toCurrency];

    if (rate === undefined || !Number.isFinite(Number(rate))) {
      throw new Error("The API response did not contain a valid exchange rate.");
    }

    const result = Number(amount) * Number(rate);

    message.innerText =
      `${amount} ${fromCurrency.toUpperCase()} = ${result.toFixed(2)} ${toCurrency.toUpperCase()}`;
  } catch (error) {
    message.innerText = "Could not get the exchange rate. Please try again.";
    console.error(error);
  }
};
```

This is an improved teaching example; the extra validation/error display is added for robustness, not claimed as exact lesson code.

## 14. Debugging mistakes shown in the lesson

| Problem | Why it happened | Fix |
| --- | --- | --- |
| Page reloads when button is clicked | A button inside a form submits the form by default | Listen for submit and call `event.preventDefault()` |
| Flag does not update | The selected currency/country mapping or image selector is wrong | Inspect `event.target.value`, mapping, parent, and image |
| Wrong currency rate | The wrong currency code or response property was used | Log JSON and inspect the exact nested keys |
| “Final amount is not a number” | The code used an element/string instead of a numeric value | Read `input.value`, then convert with `Number()` |
| Amount is empty or negative | User entered an invalid amount | Reset empty or values below 1 to 1, as in the lesson |
| Default result is missing | Conversion only runs after clicking | Call the update function on window load |
| Result differs from online converter | Sample API data may be approximate or stale | Check provider's update frequency and data accuracy |

## 15. Test cases from the lesson's flow

Try these combinations:
- 1 USD → INR;
- 1000 USD → INR;
- 1000 INR → EUR;
- INR → NPR;
- INR → JPY;
- USD → JPY;
- USD → AUD.

The lesson compares a few sample results with online values and observes that the API's values are close but not perfectly current. That is a useful reminder: a working API integration does not automatically guarantee real-time or authoritative exchange-rate data.

## 16. Concepts revised by this project

- **HTML:** form, input, select, option, image, button, div.
- **CSS:** margin, padding, flexbox, alignment, width, border, border-radius, background.
- **DOM:** `querySelector`, `querySelectorAll`, `createElement`, `append`, `parentElement`.
- **Events:** `change`, `submit`, `load`, `event.target`, `preventDefault()`.
- **Values and types:** `input.value`, strings, `Number()`.
- **Objects:** mapping a currency code to a country code; reading nested response keys.
- **Loops:** building many dropdown options from a currency list.
- **Fetch and Promises:** `fetch()`, `await`, `response.json()`.
- **Template literals:** dynamically building a URL and result message.
- **Arithmetic:** amount × exchange rate.

## 17. Practice tasks

- [ ] Add another currency to the mapping and dropdown.
- [ ] Verify that the correct flag appears for both dropdowns.
- [ ] Make the result update when the amount changes.
- [ ] Show a loading message while Fetch is running.
- [ ] Handle a failed request and a missing exchange-rate key.
- [ ] Prevent empty, zero, and negative amounts.
- [ ] Format the final result to two decimal places.
- [ ] Add a swap button that exchanges the From and To selections.
- [ ] Compare the displayed rate with the provider's published rate and note the update timestamp.

## Source and scope

Based on the supplied transcript of *Last Lecture: Fetch API with Project | JavaScript Full Course* by Shradha Khapra. The source walks through the form layout and styling, currency dropdowns, a country/currency list, flag images, default USD-to-INR selection, change listeners, form submission prevention, amount validation, endpoint construction, Fetch/JSON parsing, nested rate lookup, multiplication, result text, and initial page-load conversion. Any API URL or response key shown as a placeholder here must be replaced with the exact details from the API documentation.
