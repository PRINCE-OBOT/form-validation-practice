import FormValidator from "./form-validator.js";

export default class PostalCodeValidator {
  constructor({ country, postalCode, postalCodeMessage }) {
    this.country = country
    this.postalCode = postalCode
    this.postalCodeMessage = postalCodeMessage

    this.countryDetails = this.#countryDetails()
    this.countryDetailsProperty = this.countryDetails[null];
    this.countryPostalCodePatternRegExp = null;
    this.render = this.#render();
  }

  #render() {
    this.#setCountryDetailsToPostalCode();
    this.#bindEvent()
  }

  #bindEvent(){
    this.country.addEventListener("change", this.#handleCountryPostalCode.bind(this));

    this.postalCode.addEventListener("input", this.#validatePostalCode.bind(this));
  }
  
  #countryDetails() {
    return {
      nigeria: {
        pattern: "^[0-9]{6}$",
        placeholder: "100010",
      },
      germany: {
        pattern: "^[0-9]{5}$",
        placeholder: "34934",
      },
      usa: {
        pattern: "^([0-9]{5})(-[0-9]{4})?$",
        placeholder: "53563 or 53356-9848",
      },
      uk: {
        pattern: "^[a-zA-Z0-9]{4} [a-zA-Z0-9]{3}$",
        placeholder: "GR43 4F9",
      },
      null: {
        pattern: "",
        placeholder: "No Country Selected",
      },
    };
  }

  #handleCountryPostalCode() {
    this.countryDetailsProperty = this.countryDetails[country.value];

    if (this.countryDetailsProperty.pattern === "") {
      this.postalCodeMessage.textContent = "You have not selected your country";
      this.postalCodeMessage.classList.remove("valid");
      this.postalCodeMessage.classList.add("invalid");
      this.postalCode.classList.add("empty");

      this.#setCountryDetailsToPostalCode()
      return;
    }

    this.countryPostalCodePatternRegExp = new RegExp(this.countryDetailsProperty.pattern);

    this.#setCountryDetailsToPostalCode();
    this.#validatePostalCode();
  }

  #setCountryDetailsToPostalCode() {
    this.postalCode.setAttribute("pattern", this.countryDetailsProperty.pattern);
    this.postalCode.setAttribute("placeholder", this.countryDetailsProperty.placeholder);
  }

  #validatePostalCode(e) {
    const postalCodeField = FormValidator.resetFieldStyle({
      field: this.postalCode,
      fieldMessage: this.postalCodeMessage,
    });
    if (postalCodeField.empty) return;

    if (e) {
      // Avoid selecting a country to call `handleCountryPostalCode` recursively
      // Only run `handleCountryPostalCode` when the event is handled by `validatePostalCode` function
      this.#handleCountryPostalCode();
    }
    if (this.countryDetailsProperty.pattern === "") {
      return;
    }

    FormValidator.removeClassEmpty({ field: this.postalCode });

    const isPostalCodeValid = this.countryPostalCodePatternRegExp.test(this.postalCode.value);

    FormValidator.validateClientAndServerState({field: this.postalCode,isFieldValid: isPostalCodeValid,fieldMessage: this.postalCodeMessage,msg: "Invalid Postal Code",});
  }
}
