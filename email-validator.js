import FormValidator from "./form-validator.js";

export default class Email{
    constructor({ email, emailMessage }){
        this.email = email
        this.emailMessage = emailMessage
        this.bindEvent = this.#bindEvent()
    }

    #bindEvent(){
        this.email.addEventListener('input', this.#validateEmail.bind(this))
    }
    
    #validateEmail() {
      FormValidator.removeClassEmpty({ field: this.email });
    
      const emailField = FormValidator.resetFieldStyle({
        field: this.email,
        fieldMessage: this.emailMessage,
      });
      if (emailField.empty) return;
    
      const emailPattern = /^[a-zA-Z0-9]{4,}@(gmail|yahoo|hotmail).com$/;
    
      const isEmailValid = emailPattern.test(this.email.value);
    
      let validityState;
    
      FormValidator.validateClientAndServerState({
        field: this.email,
        isFieldValid: isEmailValid,
        fieldMessage: this.emailMessage,
        msg: "Incorrect email",
      });
    
      FormValidator.colorCustomMessage({ msgToColor: this.emailMessage, validityState });
    }
}
