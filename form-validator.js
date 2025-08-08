export default class FormValidator {
  constructor({ buttonSubmit, messages, inputs }) {
    this.buttonSubmit = buttonSubmit;
    this.messages = messages;
    this.inputs = inputs;
    this.bindEvent = this.#render();
  }

  #render(){
    this.#bindEvent()
  }

  #bindEvent() {
    this.buttonSubmit.addEventListener("click", this.#customCheckValidity.bind(this));
  }

  #customCheckValidity() {
    const isEveryInputValid = [...this.messages].every(
      (input) => input.validity.valid
    );

    const isEveryMessageValid = [...this.messages].every((message) =>
      message.classList.contains("valid")
    );

    if (isEveryMessageValid && isEveryInputValid) {
      alert("gotcha");
    } else {
      const invalidInputs = [...this.inputs].filter(
        (input) => !input.validity.valid
      );

      invalidInputs.forEach((invalidInput) => {
        invalidInput.classList.add("invalid");
      });
    }
  }

  static hasUserInteract({ field }) {
    if (field.value !== "" && !field.classList.contains("user-interact")) {
      field.classList.add("user-interact");
    }
  }
  
  static removeInvalidHighlightFromInput({ field }){
    if (field.classList.contains("invalid")) {
      field.classList.remove("invalid");
    }
  }

  static colorCustomMessage({ msgToColor, validityState, field }) {
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

  static resetFieldStyle({ field, fieldMessage }) {
    if (field.value !== "") return { empty: false };

    fieldMessage.value = "";
    field.classList.remove("invalid", "valid");

    return { empty: true };
  }

  static validateClientAndServerState({
    field,
    isFieldValid,
    fieldMessage,
    msg,
    isReturn,
    field2,
  }) {
    let message, validityState;

    if (!field.validity.valid && !isFieldValid) {
      message = msg;
      validityState = "invalid";
    } else if (field.validity.valid && isFieldValid) {
      message = "✓";
      validityState = "valid";
    }

    message ? (fieldMessage.textContent = message) : fieldMessage.textContent;

    this.colorCustomMessage({
      msgToColor: fieldMessage,
      validityState,
      field: field2,
    });

    if (validityState === "invalid" && isReturn) {
      return { weak: true };
    } else if (isReturn) {
      return { weak: false };
    }
  }
}
