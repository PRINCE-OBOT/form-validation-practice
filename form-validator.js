export default class FormValidator{
    constructor(){
        this.isPasswordValid = null
    }

    static removeClassEmpty({ field }) {
      if (field.value !== "" && field.classList.contains("empty")) {
        field.classList.remove("empty");
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
      if (field.value !== "") return { empty: false};
    
      fieldMessage.value = "";
      field.classList.remove("invalid", "valid");
      field.classList.add("empty");
    
      return { empty: true};
    }
    
    static validateClientAndServerState({field,isFieldValid,fieldMessage,msg,isReturn,field2}) {
      let message, validityState;
    
      if (!field.validity.valid && !isFieldValid) {
        message = msg;
        validityState = "invalid";
      } else if (field.validity.valid && isFieldValid) {
        message = "✓";
        validityState = "valid";
      }
    
      message ? (fieldMessage.textContent = message) : fieldMessage.textContent;
    
      this.colorCustomMessage({msgToColor: fieldMessage,validityState,field: field2});
    
      if (validityState === "invalid" && isReturn) {
        
        return { weak: true};

      } else if(isReturn){
        
        return {weak: false}
      }
    }
}


