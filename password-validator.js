import FormValidator from "./form-validator.js"

export default class Password{
  constructor({password, passwordMessage, confirmPassword, confirmPasswordMessage}){
    this.password = password
    this.passwordMessage = passwordMessage
    this.confirmPassword = confirmPassword
    this.confirmPasswordMessage = confirmPasswordMessage
    this.isPasswordValid = null
    this.bindEvent = this.#bindEvent()
  }

  #bindEvent(){
    this.password.addEventListener('input', this.#validatePassword.bind(this))
    
    this.confirmPassword.addEventListener('input', this.#confirmPasswordToValidatePassword.bind(this))
  }

  #validatePassword() {
    FormValidator.hasUserInteract({ field: this.password})
    
    FormValidator.removeInvalidHighlightFromInput({ field: this.password });
    
    const passwordField = FormValidator.resetFieldStyle({
      field: this.password,
      fieldMessage: this.passwordMessage,
    });
    if (passwordField.empty) return;
  
    const lowercase = /[a-z]/.test(password.value);
    const uppercase = /[A-Z]/.test(password.value);
    const number = /[0-9]/.test(password.value);
    const minLength = /.{7,}/.test(password.value);
  
    this.passwordMessage.value = "Password should contain";
  
    if (!lowercase) {
      this.passwordMessage.value += ", Lowercase";
    }
    if (!uppercase) {
      this.passwordMessage.value += ", Uppercase";
    }
    if (!number) {
      this.passwordMessage.value += ", Number";
    }
    if (!minLength) {
      this.passwordMessage.value += ", Minimum of 7 characters";
    }
  
    this.isPasswordValid = lowercase && uppercase && number && minLength;
  
    FormValidator.validateClientAndServerState({
      field: this.password,
      isFieldValid: this.isPasswordValid,
      fieldMessage: this.passwordMessage,
    });
  
    if (this.confirmPassword.value !== "") {
      this.#confirmPasswordToValidatePassword();
    }
  }
  
  #confirmPasswordToValidatePassword() {
    FormValidator.hasUserInteract({ field: this.confirmPassword})
    
    FormValidator.removeInvalidHighlightFromInput({
      field: this.confirmPassword,
    });
    
    const confirmPasswordField = FormValidator.resetFieldStyle({
      field: this.confirmPassword,
      fieldMessage: this.confirmPasswordMessage,
    });
    if (confirmPasswordField.empty) return;
  
    const passwordStatus = FormValidator.validateClientAndServerState({
      field: this.password,
      isFieldValid: this.isPasswordValid,
      fieldMessage: this.confirmPasswordMessage,
      field2: this.confirmPassword,
      msg: "Your password is weak",
      isReturn: true,
    });
    if (passwordStatus.weak) return;
  
    let validityState;
  
    if (this.password.value === this.confirmPassword.value) {
      
      this.confirmPasswordMessage.value = "✓";
      validityState = "valid";
    } else if (this.password.value !== this.confirmPassword.value) {
      
      validityState = "invalid";
      this.confirmPasswordMessage.value = "Password Mismatch";
    }
  
    FormValidator.colorCustomMessage({
      msgToColor: this.confirmPasswordMessage,
      validityState,
      field: this.confirmPassword,
    });
  }
}
