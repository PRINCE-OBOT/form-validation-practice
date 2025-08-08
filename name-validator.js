import FormValidator from "./form-validator.js";

export default class NameValidator {
  constructor({
    name: name, nameMessage: nameMessage
  }) {
    this.name = name
    this.nameMessage = nameMessage
    this.bindEvent = this.#bindEvent()
  }

  #bindEvent() {
    this.name.addEventListener("input", () => this.#validateName( {
      name: this.name, nameMessage: this.nameMessage
    }));
  }

  #validateName({ name, nameMessage}) {
    FormValidator.hasUserInteract({
      field: this.name
    })
   
    FormValidator.removeInvalidHighlightFromInput({
      field: this.name,
    });

    const nameField = FormValidator.resetFieldStyle({
      field: name,
      fieldMessage: nameMessage,
    });
    if (nameField.empty) return;

    const pattern = /^[a-zA-Z]{1,}$/;

    const isNameValid = pattern.test(name.value);

    FormValidator.validateClientAndServerState({
      field: name,
      isFieldValid: isNameValid,
      fieldMessage: nameMessage,
      msg: "Incorrect name",
    });
  }
}