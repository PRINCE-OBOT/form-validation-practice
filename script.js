 const country = document.querySelector('#country')
    const postalCode = document.querySelector('#postal-code')
    const postalCodeMessage = document.querySelector('#postal-code-message')
    const inputs = document.querySelectorAll('input')

    inputs.forEach(markInputAsEmpty)

    function markInputAsEmpty(input) {
      input.classList.add('empty')
    }

    country.addEventListener('change', handleCountryPostalCode)

    postalCode.addEventListener('input', validatePostalCode)

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

    let countryPostalCodepattern
    function handleCountryPostalCode() {
      countryPostalCodepattern = countryPostalCode[country.value][0]

      if (countryPostalCodepattern === '') {
        postalCodeMessage.textContent = 'You have not selected a country code'
        postalCodeMessage.classList.remove('valid', 'invalid')
        postalCodeMessage.classList.add('void')
        postalCode.classList.add('empty')
        return
      }

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

      let message,
      validityState
      if (!postalCode.validity.valid) {
        message = `Invalid Postal Code`
        validityState = 'invalid'
      } else {
        message = '✓'
        validityState = 'valid'
      }

      postalCodeMessage.textContent = message
      postalCodeMessage.classList.add(validityState)

      validityState = validityState === 'valid' ? 'invalid': 'valid'

      postalCodeMessage.classList.remove(validityState, 'void')
    }

