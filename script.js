 const country = document.querySelector('#country')
    const postalCode = document.querySelector('#postal-code')
    const postalCodeMessage = document.querySelector('#postal-code-message')
    const password = document.querySelector('#password')
    const confirmPassword = document.querySelector("#confirm-password");
    const passwordMessage = document.querySelector('#password-message')
    const confirmPasswordMessage = document.querySelector('#confirm-password-message')
    const inputs = document.querySelectorAll('input')

    inputs.forEach(markInputAsEmpty)

    function markInputAsEmpty(input) {
      input.classList.add('empty')
    }

    country.addEventListener('change', handleCountryPostalCode)

    postalCode.addEventListener('input', validatePostalCode)
    
    password.addEventListener('input', validatePassword)

    confirmPassword.addEventListener('input', confirmPasswordToValidatePassword)

    const countryPostalCode = {
      nigeria: ['^[0-9]{6}$',
        'Nigeria'],
      germany: ['^[0-9]{5}$',
        'Germany'],
      usa: ['^([0-9]{5})(-[0-9]{4})?$',
        'USA'],
      uk: ['^[a-zA-Z0-9]{4} [a-zA-Z0-9]{3}$',
        'USA'],
      null: ['']
    }

    let countryPostalCodePattern, countryPostalCodePatternRegExp
    function handleCountryPostalCode() {
      countryPostalCodePattern = countryPostalCode[country.value][0]

      if (countryPostalCodePattern === '') {
        postalCodeMessage.textContent = 'You have not selected a country code'
        postalCodeMessage.classList.remove('valid')
        postalCodeMessage.classList.add('invalid')
        postalCode.classList.add('empty')
        return
      }
      
     countryPostalCodePatternRegExp = new RegExp(countryPostalCodePattern)

      setCountryPatternToPostalCode()
      validatePostalCode()
    }

    function setCountryPatternToPostalCode() {
      postalCode.setAttribute('pattern', countryPostalCodePattern)
    }

    function validatePostalCode(e) {
      if (postalCode.value === '') {
        postalCodeMessage.textContent = ''
        postalCode.classList.add('empty')

        if(e){
          // Avoid selecting a country to call `handleCountryPostalCode` recursively
          // Only run `handleCountryPostalCode` when the event is handled by `validatePostalCode` function
          handleCountryPostalCode()
        }
        return
      }
      if(countryPostalCodePattern === ''){
        return
      }
      postalCode.classList.remove('empty')
       
       const isPostalCodeValid = countryPostalCodePatternRegExp.test(postalCode.value)

      let message,
      validityState
      if (!postalCode.validity.valid && !isPostalCodeValid) {
      
        message = `Invalid Postal Code`
        validityState = 'invalid'
        
      } else if (postalCode.validity.valid && isPostalCodeValid) {
       
        message = '✓'
        validityState = 'valid'
        
      }

      postalCodeMessage.textContent = message

      colorMessage({msgToColor: postalCodeMessage, validityState})
    }

    let isPasswordStrong
    function validatePassword(){
     if(password.value !== ''){
        password.classList.remove('empty')
     }
    
    const lowercase = /[a-z]/.test(password.value)  
    const uppercase = /[A-Z]/.test(password.value)  
    const number = /[0-9]/.test(password.value)  
    const minLength = /.{7,}/.test(password.value)
    
    passwordMessage.value = 'Password should contain'
    
    if(!lowercase){
      passwordMessage.value += ', Lowercase'
    }
    if(!uppercase){
      passwordMessage.value += ', Uppercase'
    }
    if(!number){
      passwordMessage.value += ', Number'
    }
    if(!minLength){
      passwordMessage.value += ', Minimum of 7 characters'
    }
    
  isPasswordStrong = lowercase && uppercase && number && minLength
  
  let validityState
    if(isPasswordStrong && password.validity.valid){
      passwordMessage.value = '✓'
      validityState = 'valid'
      
    } else if(!isPasswordStrong && !password.validity.valid){
      validityState = 'invalid'
    }

    colorMessage({ msgToColor: passwordMessage, validityState })
    
    if(password.value === ''){
      passwordMessage.value = ''
    }  
     
  }

  function confirmPasswordToValidatePassword(e){
    if(!isPasswordStrong && !password.validity.valid) return

    let validityState;

    if (password.value === e.target.value) {
      confirmPasswordMessage.value = "✓";
      validityState = "valid";
      
    } else if (password.value !== e.target.value) {
      validityState = "invalid";
      confirmPasswordMessage.value = 'Password Mismatch'
    }

    colorMessage({ msgToColor: confirmPasswordMessage, validityState, field: e.target });
  }

  function colorMessage({ msgToColor, validityState, field }) {
    msgToColor.classList.add(validityState);

    if(field){
      field.classList.add(validityState)
    }
    
    validityState = validityState === "valid" ? "invalid" : "valid";

    msgToColor.classList.remove(validityState);

    if(field){
      field.classList.remove(validityState)
    }

  }

