# Currency Converter — Lecture Walkthrough

**Source:** “Last Lecture: Fetch API with Project | JavaScript Full Course” by Shradha Khapra.  
**Transcript:** auto-dubbed Hindi transcript supplied in this conversation.

This follows the instructor's project sequence. The narration is used as the source; where the auto-dubbed transcript does not preserve an exact URL or code token, the note says so instead of inventing one.

## 1. What the project does (32:14–32:55)

The project converts an amount from one currency to another. The instructor's example is converting US dollars (USD) to Indian rupees (INR). The app needs an exchange rate to calculate the converted amount.

## 2. HTML page and form (32:55–39:36)

The instructor creates an HTML page titled **Currency Converter** and links a `style.css` file.

The page is built in this order:

1. A main `div` named/container class.
2. An `h2` heading: Currency Converter.
3. A `form`.
4. An amount section with an “Enter Amount” label and an input. The initial value shown is 100.
5. A dropdown section with two selects:
   - **From** currency;
   - **To** currency.
6. The first select is initially shown with currency options such as USD and INR; EUR and AUD are added as examples.
7. Each currency select has a country flag image beside it.
8. A message area with an initial example like `1 USD = 80 INR`.
9. A button labelled **Get Exchange Rate**.

The initial visible conversion is USD → INR. The flag images are static at this stage; the instructor says the dynamic flag logic will be added in JavaScript.

### Why the form submits

The instructor clicks the button and observes that a button inside a form acts as a submit button by default. The page/form submission causes the browser's default behavior. Later, the JavaScript handler prevents that default so the app can run its own conversion code.

## 3. Styling the layout (around 39:36–52:55)

The instructor styles the page step by step in the browser/editor. The visible decisions include:

- center the converter on the page using flex layout;
- use a page background and a contrasting converter/container background;
- add padding and rounded corners to the container;
- style the amount input and select controls with borders, spacing, and rounded corners;
- place the From and To dropdowns next to each other;
- size and position the flag images;
- style the result/message spacing;
- give the Get Exchange Rate button a height, background colour, white text, font size, and pointer cursor.

These are the styling steps shown in the lesson, not a claim that the short list reproduces every CSS declaration.

## 4. Add the country/currency data files (51:42–53:03)

The instructor says the project uses two JavaScript files:
- `codes.js` — a supplied list containing each currency code and its corresponding country code (the narration says the list contains about 160 entries);
- `app.js` — where the project logic is written.

The instructor notes that learners can either use the supplied country list or begin with a smaller list of a few currencies.

Both scripts are linked in the HTML before the closing body tag, with `codes.js` included before `app.js` so the currency/country mapping is available to the app logic.

## 5. The APIs used (36:41–37:30 and 53:03–54:39)

Two kinds of external data are used:

- A flag-image service: the country code is placed in the image URL to display that country's flag. The instructor demonstrates changing the code to show India, the US, Nepal, and other flags.
- A currency exchange-rate API: its documentation/README describes the available endpoints. The instructor opens an endpoint and shows that it returns an update date and an exchange rate. The example shown includes USD to INR, with a rate of about 83 and a displayed update date.

The auto-dubbed transcript does not preserve the full literal URL reliably. The important narrated structure is a base URL plus the selected currency codes and the API's JSON endpoint format. Use the actual URL from the lesson's linked API documentation/code rather than treating a guessed URL as the source.

## 6. Populate both currency dropdowns (54:39–59:18)

The instructor selects the dropdown `select` elements using `document.querySelectorAll` and loops over them.

The supplied mapping contains:
- a currency code (example: INR);
- a country code (example: IN).

For each currency in the mapping:
1. create a new `option` element;
2. set its text/value to the currency code;
3. append the option to the current select.

This makes the full currency list appear in both dropdowns.

The instructor then sets the defaults:
- the select named **from** should start with **USD** selected;
- the select named **to** should start with **INR** selected.

The selection is made by checking the select's name and the current currency code, then marking the matching option as selected.

## 7. Change the flag when the currency changes (59:18–1:02:46)

The instructor creates an `updateFlag` function and adds a `change` event listener to each select.

The sequence is:

1. The select changes.
2. The event listener receives the event object.
3. `event.target` identifies the select that changed.
4. Read the selected currency code from the element's value.
5. Look up that currency's country code in the supplied mapping.
6. Build the flag image source using the country code.
7. Find the image inside the select's parent container and update its `src`.

The distinction matters: **currency code** is used for the exchange-rate request, while **country code** is used for the flag image.

## 8. Handle the Get Exchange Rate button (1:02:55–1:04:12)

The instructor selects the form button and adds an event listener. The form's default submission behavior is prevented so the page does not reload and the custom JavaScript conversion logic can run.

The key browser behavior being addressed is the default submit behavior of a button inside a form.

## 9. Read and validate the amount (1:04:12–1:05:47)

The amount input element is selected from the DOM. The instructor first logs the element, then corrects the code to read its `.value`.

The narration tests:
- an ordinary amount;
- an empty input;
- a negative amount such as -5.

The validation rule is: if the amount is empty or less than 1, set the amount to 1 and also update the input field to show 1.

Reconstructed logic:

```js
// Read the entered value from the input element.
let amountValue = amountInput.value;

// The lesson resets an empty amount or a value below 1 to 1.
if (amountValue === "" || amountValue < 1) {
  amountValue = 1;
  amountInput.value = "1";
}
```

The instructor later catches a related mistake: the calculation needs the input's value, not the input DOM element itself.

## 10. Build the currency API request (around 1:05:47–1:08:55)

The instructor reads the selected From and To currencies, converts their codes to lowercase, and inserts them into the base URL to form the request URL.

The narration describes the URL as the API base URL followed by the selected currency codes and a JSON suffix. Since the auto-dubbed transcript does not reliably preserve the complete URL, this is the structure—not a replacement literal endpoint:

```js
// Structural illustration of the URL construction described in the lesson.
// Use the exact base URL and path from the API documentation linked in the video.
const fromCurrency = fromSelect.value.toLowerCase();
const toCurrency = toSelect.value.toLowerCase();
const url = /* API base URL + fromCurrency + "/" + toCurrency + ".json" */;
```

The instructor makes the request with Fetch and waits for the response. The console shows status **200**, indicating that the request worked.

## 11. Parse the response and get the rate (1:08:55–1:10:10)

The response is parsed with `await response.json()`. The instructor logs the resulting data and accesses the exchange rate using the selected **To** currency's lowercase code as the key.

The lesson tests different target currencies and reads example rates:
- INR: about 83;
- JPY: about 142;
- AUD: about 1.49.

The response structure is API-specific. The important point demonstrated is to inspect the returned data and use the target currency's key; do not assume a different nested structure.

## 12. Calculate and display the conversion (1:10:10–1:13:45)

The calculation is:

```js
// Multiply the entered amount by the exchange rate returned by the API.
const finalAmount = amount * rate;
```

The instructor selects the message element and updates its `innerText` to show:
- the entered amount;
- the From currency;
- the calculated amount;
- the To currency.

During debugging, the instructor finds two mistakes:
- using the amount input element instead of its value;
- using an amount value that had not been correctly set/read.

After correcting these, the examples work. The lesson compares some results with online values and notes that the API's exchange rates are close but not perfectly up to date/accurate.

## 13. Run the conversion when the page loads (1:13:45–1:15:37)

The instructor changes the default amount from 100 to 1 to make the initial example simpler.

Then the instructor wants the default USD → INR conversion to appear as soon as the page loads. The conversion logic is placed in an `updateExchangeRate` function and the function is called from a load event listener.

A debugging correction is shown: the event listener needs to be attached to **window** for the behavior demonstrated.

Reconstructed event pattern:

```js
// Run the default conversion when the browser window finishes loading.
window.addEventListener("load", () => {
  updateExchangeRate();
});
```

## 14. Final tests and lecture wrap-up (1:15:37–1:17:07)

The instructor tests several conversions, including:
- INR → NPR;
- INR → JPY;
- USD → JPY;
- USD → AUD.

The basic converter is working. The instructor says the styling could be improved further, but the basic layout and mini-project are complete.

The lecture closes by connecting the project back to the JavaScript topics used: DOM, strings, arrays, and API calls.

## Transcript-faithfulness note

The source is an auto-dubbed transcript, not the original `index.html`, `style.css`, `codes.js`, and `app.js` files. The snippets above reconstruct only the logic that is clearly narrated. Exact API URLs, full CSS, and some identifiers should be checked against the original code linked in the video description.
