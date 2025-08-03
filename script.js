const country = document.querySelector("#country");
const postalCode = document.querySelector("#postal-code");
const postalCodeMessage = document.querySelector("#postal-code-message");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const passwordMessage = document.querySelector("#password-message");
const email = document.querySelector("#email");
const emailMessage = document.querySelector("#email-message");
const confirmPasswordMessage = document.querySelector(
  "#confirm-password-message"
);
const fields = document.querySelectorAll("input");

fields.forEach(markInputAsEmpty);

function markInputAsEmpty(field) {
  field.classList.add("empty");
}

country.addEventListener("change", handleCountryPostalCode);

postalCode.addEventListener("input", validatePostalCode);

password.addEventListener("input", validatePassword);

confirmPassword.addEventListener("input", confirmPasswordToValidatePassword);

email.addEventListener("input", validateEmail);

const countryDetails = {
  nigeria: {
    pattern: "^[0-9]{6}$", 
    placeholder: "100010"
  },
  germany: {
    pattern: "^[0-9]{5}$", 
    placeholder: "34934"
  },
  usa: {
    pattern: "^([0-9]{5})(-[0-9]{4})?$", 
    placeholder: "53563 or 53356-9848"
  },
  uk: {
    pattern: "^[a-zA-Z0-9]{4} [a-zA-Z0-9]{3}$",
    placeholder: "GR43 4F9"
  },
  null: {
    pattern: "", 
    placeholder: 'No Country Selected'
  }
};

let countryDetailsProperty, countryPostalCodePatternRegExp;

countryDetailsProperty = countryDetails[null];

function handleCountryPostalCode() {
  countryDetailsProperty = countryDetails[country.value];

  if (countryDetailsProperty.pattern === "") {
    postalCodeMessage.textContent = "You have not selected your country";
    postalCodeMessage.classList.remove("valid");
    postalCodeMessage.classList.add("invalid");
    postalCode.classList.add("empty");
    return;
  }

  countryPostalCodePatternRegExp = new RegExp(countryDetailsProperty.pattern);

  setCountryDetailsToPostalCode();
  validatePostalCode();
}

function setCountryDetailsToPostalCode() {
  postalCode.setAttribute("pattern", countryDetailsProperty.pattern);
  postalCode.setAttribute("placeholder", countryDetailsProperty.placeholder);
}

setCountryDetailsToPostalCode()

function validatePostalCode(e) {
  if (postalCode.value === "") {
    postalCodeMessage.textContent = "";
    postalCode.classList.add("empty");

    if (e) {
      // Avoid selecting a country to call `handleCountryPostalCode` recursively
      // Only run `handleCountryPostalCode` when the event is handled by `validatePostalCode` function
      handleCountryPostalCode();
    }
    return;
  }
  if (countryDetailsProperty.pattern === "") {
    return;
  }

  removeClassEmpty({ field: postalCode });

  const isPostalCodeValid = countryPostalCodePatternRegExp.test(
    postalCode.value
  );

  let message, validityState;
  if (!postalCode.validity.valid && !isPostalCodeValid) {
    message = `Invalid Postal Code`;
    validityState = "invalid";
  } else if (postalCode.validity.valid && isPostalCodeValid) {
    message = "✓";
    validityState = "valid";
  }

  postalCodeMessage.textContent = message;

  colorMessage({ msgToColor: postalCodeMessage, validityState });
}

let isPasswordStrong;

function validatePassword() {
  if (password.value !== "") {
    password.classList.remove("empty");
  }

  const lowercase = /[a-z]/.test(password.value);
  const uppercase = /[A-Z]/.test(password.value);
  const number = /[0-9]/.test(password.value);
  const minLength = /.{7,}/.test(password.value);

  passwordMessage.value = "Password should contain";

  if (!lowercase) {
    passwordMessage.value += ", Lowercase";
  }
  if (!uppercase) {
    passwordMessage.value += ", Uppercase";
  }
  if (!number) {
    passwordMessage.value += ", Number";
  }
  if (!minLength) {
    passwordMessage.value += ", Minimum of 7 characters";
  }

  isPasswordStrong = lowercase && uppercase && number && minLength;

  let validityState;
  if (isPasswordStrong && password.validity.valid) {
    passwordMessage.value = "✓";
    validityState = "valid";
  } else if (!isPasswordStrong && !password.validity.valid) {
    validityState = "invalid";
  }

  colorMessage({ msgToColor: passwordMessage, validityState });

  if (confirmPassword.value != "") {
    confirmPasswordToValidatePassword();
  }

  if (password.value === "") {
    passwordMessage.value = "";
  }
}

function confirmPasswordToValidatePassword() {
  removeClassEmpty({ field: confirmPassword})

  if (confirmPassword.value === "") {
    confirmPasswordMessage.value = "";
    confirmPassword.classList.remove("invalid", "valid");

    return;
  }

  if (!isPasswordStrong && !password.validity.valid) {
    confirmPasswordMessage.value = "Your password is weak";
    colorMessage({
      msgToColor: confirmPasswordMessage,
      validityState: "invalid",
      field: confirmPassword,
    });

    return;
  }

  let validityState;

  if (password.value === confirmPassword.value) {
    confirmPasswordMessage.value = "✓";
    validityState = "valid";
  } else if (password.value !== confirmPassword.value) {
    validityState = "invalid";
    confirmPasswordMessage.value = "Password Mismatch";
  }

  colorMessage({
    msgToColor: confirmPasswordMessage,
    validityState,
    field: confirmPassword,
  });
}

function validateEmail() {
  removeClassEmpty({ field: email})

  const emailPattern = /^[a-zA-Z0-9]{4,}@(gmail|yahoo|hotmail).com$/;

  const isEmailValid = emailPattern.test(email.value)
  
  let validityState

  if(isEmailValid && email.validity.valid){
    emailMessage.value = "✓";
    validityState = 'valid'
  } else if(!isEmailValid && !email.validity.valid){
    emailMessage.value = 'Incorrect email'
    validityState = 'invalid'
  }

  colorMessage({ msgToColor: emailMessage, validityState})
}

function removeClassEmpty({ field }) {
  if (field.value !== "" && field.classList.contains("empty")) {
    field.classList.remove("empty");
  }
}

function colorMessage({ msgToColor, validityState, field }) {
  msgToColor.classList.add(validityState);

  if (field) {
    field.classList.add(validityState);
  }

  validityState = validityState === "valid" ? "invalid" : "valid";

  msgToColor.classList.remove(validityState);

  if (field) {
    field.classList.remove(validityState);
  }
}