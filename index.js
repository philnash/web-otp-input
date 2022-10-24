export class WebOTPInput extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();

    if ("OTPCredential" in window) {
      /** @type {HTMLInputElement | null} */
      const otpInput = this.querySelector("input");
      if (otpInput) {
        /** @type {HTMLInputElement} */
        this.otpInput = otpInput;
      } else {
        this.otpInput = document.createElement("input");
        this.otpInput.setAttribute("name", this.getAttribute("name") || "otp");
      }
      this.otpInput.setAttribute("inputmode", "numeric");
      this.otpInput.setAttribute("autocomplete", "one-time-code");
      this.appendChild(this.otpInput);
    }
  }

  async connectedCallback() {
    let parentForm = this.parentElement;
    while (parentForm !== null && parentForm.tagName !== "FORM") {
      parentForm = parentForm.parentElement;
    }
    this.abortController = new AbortController();
    if (parentForm) {
      this.form = /** @type {HTMLFormElement} */ (parentForm);
      this.abortCredentialRequest = () => {
        if (this.abortController) {
          this.abortController.abort();
        }
      };
      this.form.addEventListener("submit", this.abortCredentialRequest);
    }
    try {
      /** @type {OTPCredential} */
      const otp = await navigator.credentials.get({
        otp: {
          transport: ["sms"],
        },
        signal: this.abortController.signal,
      });
      if (otp) {
        this.otpInput.value = otp.code;
        if (this.form) {
          this.form.submit();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  disconnectedCallback() {
    if (this.form && this.abortCredentialRequest) {
      this.form.removeEventListener("submit", this.abortCredentialRequest);
    }
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this.otpInput.setAttribute(name, newValue);
  }
}

window.customElements.define("web-otp-input", WebOTPInput);
