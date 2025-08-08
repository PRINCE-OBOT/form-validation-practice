import FormValidator from './form-validator.js'
import PostalCodeValidator from './postal-code-validator.js'
import EmailValidator from './email-validator.js'
import PasswordValidator from './password-validator.js';
import NameValidator from './name-validator.js';

const messages = document.querySelectorAll('output.show-message')
const inputs = document.querySelectorAll('input')

const country = document.querySelector("#country");
const postalCode = document.querySelector("#postal-code");
const postalCodeMessage = document.querySelector("#postal-code-message");

const btnSubmit = document.querySelector(".btn-submit");

const password = document.querySelector("#password");
const passwordMessage = document.querySelector("#password-message");

const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordMessage = document.querySelector(
  "#confirm-password-message"
);

const email = document.querySelector("#email");
const emailMessage = document.querySelector("#email-message");

const firstName = document.querySelector("#first-name");
const firstNameMessage = document.querySelector("#first-name-message");

const lastName = document.querySelector("#last-name");
const lastNameMessage = document.querySelector("#last-name-message");

new PostalCodeValidator({country: country, postalCode: postalCode, postalCodeMessage: postalCodeMessage})

new PasswordValidator({password: password, passwordMessage: passwordMessage, confirmPassword: confirmPassword, confirmPasswordMessage: confirmPasswordMessage})

new EmailValidator({ email: email, emailMessage: emailMessage})

new NameValidator({ name: firstName, nameMessage: firstNameMessage})

new NameValidator({ name: lastName, nameMessage: lastNameMessage})

new FormValidator({ buttonSubmit: btnSubmit, messages: messages, inputs: inputs })