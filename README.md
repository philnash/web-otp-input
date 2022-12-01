<div style="text-align:center" align="center">
  <h1>📲 <code>&lt;web-otp-input&gt;</code> 💬</h1>

  <p><em>A web component that implements the <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebOTP_API">WebOTP API</a> so you don't have to.</em></p>
</div>

## About

Sending one time password codes over SMS is one way to implement two factor authentication in order to improve user account security. But it is a process that adds friction to the sign in experience. The Web OTP allows developers to request access to one time passwords contained within incoming SMS messages and use them, turning SMS two factor authentication into a one click/touch process.

When you include the `web-otp-input` script on your page, you can wrap a `<web-otp-input>` custom element around the `<input>` for your OTP code. If your user is on a device that supports the WebOTP API, then when an SMS message with the verification code arrives, the user will be prompted to enter the code from the SMS with a single permissions acceptance. The custom element handles entering the code into the `<input>` and automatically submitting the form.

## Browser support

This requires support for:

* Custom elements - https://caniuse.com/custom-elementsv1
* `OTPCredential` - https://developer.mozilla.org/en-US/docs/Web/API/OTPCredential

## Usage

In order to use the WebOTP API, you first need to update the text of the SMS message you use to send the one time password. You need to add an extra line at the end of the message that looks like this:

```
@example.com #123456
```

That is, you need an `@` symbol followed by the domain that the user will be signing in to. This helps reduce phishing of two factor authentication messages by only showing this permissions dialog on domains that are also contained within the message like this.

Then you need a space, a `#` symbol and then the one time code.

Once you have the message set up correctly, you can add the web component to the page.

### Installation and import instructions

If you are using npm, you can install the component to your application with:

```
npm i @philnash/web-otp-input
```

Then import the component with:

```js
import { WebOTPInput } from "@philnash/web-otp-input";
```

That will register the `<web-otp-input>` element for the page.

Alternatively, you can include the script on the page as an ES module, for example with unpkg:

```html
<script type="module" src="https://unpkg.com/@philnash/web-otp-input"></script>
```

Once that is loaded, it will register the web component.

### Using the web component

You should have a form on the page with an input element that is ready for the code. Wrap the `<web-otp-input>` element around your input element and that is all you need to do.

```html
<form action="/verification" method="POST">
  <div>
    <label for="otp">Enter your code:</label>
    <web-otp-input>
      <input type="text" autocomplete="one-time-code" inputmode="numeric" id="otp" name="otp" />
    </web-otp-input>
  </div>
  <button type="submit">Submit</button>
</form>
```

When the user comes to this page, if their browser supports it and an OTP code arrives, they will be prompted to read the code from the message and if they approve, the code will be autofilled in the input and the form will be submitted. Slick two factor authentication with one extra web component.

## License

MIT (c) 2022 Phil Nash