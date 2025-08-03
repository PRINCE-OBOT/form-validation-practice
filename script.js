const country = document.querySelector("#country");
const postalCode = document.querySelector("#postal-code");
const postalCodeMessage = document.querySelector("#postal-code-message");

const password = document.querySelector("#password");
const passwordMessage = document.querySelector("#password-message");

const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordMessage = document.querySelector("#confirm-password-message");

const email = document.querySelector("#email");
const emailMessage = document.querySelector("#email-message");

const firstName = document.querySelector("#first-name");
const firstNameMessage = document.querySelector("#first-name-message");

const lastName = document.querySelector("#last-name");
const lastNameMessage = document.querySelector("#last-name-message");

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

firstName.addEventListener('input', ()=> validateName({name: firstName, nameMessage: firstNameMessage}))

lastName.addEventListener('input', ()=> validateName({name: lastName, nameMessage: lastNameMessage}))

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
  const isFieldEmpty = resetField({ field: postalCode, fieldMessage: postalCodeMessage})
  if(isFieldEmpty) return

  if (e) {
    // Avoid selecting a country to call `handleCountryPostalCode` recursively
    // Only run `handleCountryPostalCode` when the event is handled by `validatePostalCode` function
    handleCountryPostalCode();
  }
  if (countryDetailsProperty.pattern === "") {
    return;
  }

  removeClassEmpty({ field: postalCode });

  const isPostalCodeValid = countryPostalCodePatternRegExp.test(
    postalCode.value
  );

  validateClientAndServerState({
    field: postalCode,
    isFieldValid: isPostalCodeValid,
    fieldMessage: postalCodeMessage,
    msg: "Invalid Postal Code",
  });

}

let isPasswordValid;

function validatePassword() {
  removeClassEmpty({ field: password });

  const isPasswordEmpty = resetField({ field: password, fieldMessage: passwordMessage });
  if(isPasswordEmpty) return

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

  isPasswordValid = lowercase && uppercase && number && minLength;

  validateClientAndServerState({field: password, isFieldValid: isPasswordValid, fieldMessage: passwordMessage})

  if (confirmPassword.value != "") {
    confirmPasswordToValidatePassword();
  }
}

function confirmPasswordToValidatePassword() {
  removeClassEmpty({ field: confirmPassword})

  const isConfirmPasswordEmpty = resetField({field: confirmPassword, fieldMessage: confirmPasswordMessage})
  if(isConfirmPasswordEmpty) return

  const isPasswordWeak = validateClientAndServerState({field: password, isFieldValid: isPasswordValid, fieldMessage: confirmPasswordMessage, field2: confirmPassword, msg: 'Your password is weak', isReturn: true})
  if (isPasswordWeak) return;

  let validityState;

  if (password.value === confirmPassword.value) {
    
    confirmPasswordMessage.value = "✓";
    validityState = "valid";

  } else if (password.value !== confirmPassword.value) {
    
    validityState = "invalid";
    confirmPasswordMessage.value = "Password Mismatch";

  }

  colorMessage({msgToColor: confirmPasswordMessage,validityState,field: confirmPassword});
}

function validateEmail() {
  removeClassEmpty({ field: email})
  
  const isEmailEmpty = resetField({ field: email, fieldMessage: emailMessage });
  if (isEmailEmpty) return;

  const emailPattern = /^[a-zA-Z0-9]{4,}@(gmail|yahoo|hotmail).com$/;

  const isEmailValid = emailPattern.test(email.value)
  
  let validityState
  
  validateClientAndServerState({field: email, isFieldValid: isEmailValid, fieldMessage: 'Incorrect email'})
  
  colorMessage({ msgToColor: emailMessage, validityState})
  
}


function validateName({name, nameMessage}){
  removeClassEmpty({ field: name})
  
  const isNameEmpty =  resetField({ field: name, fieldMessage: nameMessage})
  if(isNameEmpty) return

  const pattern = /^[a-zA-Z]{1,}$/

  const isNameValid = pattern.test(name.value)

  validateClientAndServerState({field: name, isFieldValid: isNameValid, fieldMessage: nameMessage, msg: 'Incorrect name'})
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

  function resetField({field, fieldMessage}){
     if(field.value !== '') return

     fieldMessage.value = "";
     field.classList.remove("invalid", "valid");
     field.classList.add('empty')

     return true
  }

  function validateClientAndServerState({ field, isFieldValid, fieldMessage, msg, isReturn, field2 }) {
    let message, validityState;

    if (!field.validity.valid && !isFieldValid) {

      message = msg;
      validityState = "invalid";

    } else if (field.validity.valid && isFieldValid) {
     
      message = "✓";
      validityState =  "valid";

    }

    message ? fieldMessage.textContent = message : fieldMessage.textContent;

    colorMessage({ msgToColor: fieldMessage, validityState, field: field2 });

    if(validityState === 'invalid' && isReturn){
      return true
    }
  }