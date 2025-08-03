 const country = document.querySelector('#country')
    const postalCode = document.querySelector('#postal-code')
    const postalCodeMessage = document.querySelector('#postal-code-message')
    const password = document.querySelector('#password')
    const passwordMessage = document.querySelector('#password-message')
    const inputs = document.querySelectorAll('input')

    inputs.forEach(markInputAsEmpty)

    function markInputAsEmpty(input) {
      input.classList.add('empty')
    }

    country.addEventListener('change', handleCountryPostalCode)

    postalCode.addEventListener('input', validatePostalCode)
    
    password.addEventListener('input', validatePassword)

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

    let countryPostalCodepattern, countryPostalCodepatternRegExp
    function handleCountryPostalCode() {
      countryPostalCodepattern = countryPostalCode[country.value][0]

      if (countryPostalCodepattern === '') {
        postalCodeMessage.textContent = 'You have not selected a country code'
        postalCodeMessage.classList.remove('valid', 'invalid')
        postalCodeMessage.classList.add('void')
        postalCode.classList.add('empty')
        return
      }
      
     countryPostalCodepatternRegExp = new RegExp(countryPostalCodepattern)

      setCountryPatternToPostalCode()
      validatePostalCode()
    }

    function setCountryPatternToPostalCode() {
      postalCode.setAttribute('pattern', countryPostalCodepattern)
    }

    function validatePostalCode() {
      if (postalCode.value === '') {
        postalCodeMessage.textContent = ''
        postalCode.classList.add('empty')
        return
      }
      postalCode.classList.remove('empty')
       
       const isPostalCodeValid = countryPostalCodepatternRegExp.test(postalCode.value)

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
      postalCodeMessage.classList.add(validityState)

      validityState = validityState === 'valid' ? 'invalid': 'valid'

      postalCodeMessage.classList.remove(validityState, 'void')
    }
    
   
    
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
    
  const isPasswordStrong = lowercase && uppercase && number && minLength
  
    if(isPasswordStrong && password.validity.valid){
      passwordMessage.value = '✓'
    }
    
    if(password.value === ''){
      passwordMessage.value = ''
    }  
     
  }

