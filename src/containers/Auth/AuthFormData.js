export const signUpFormData = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Mail Address'
    },
    value: '',
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  },
  firstName: {
    elementType: 'input',
    elementConfig: {
      type: 'input',
      placeholder: 'First Name'
    },
    value: '',
    validation: {
        required: true,
    },
    valid: false,
    touched: false
  },
  lastName: {
    elementType: 'input',
    elementConfig: {
      type: 'input',
      placeholder: 'Last Name'
    },
    value: '',
    validation: {
        required: true,
    },
    valid: false,
    touched: false
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password'
    },
    value: '',
    validation: {
      required: true,
      password: true
    },
    valid: false,
    touched: false
  },
  confirmPassword: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password Confirmation'
    },
    value: '',
    validation: {
      required: true,
      password: true
    },
    valid: false,
    touched: false
  }
}


export const loginFormData = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Mail Address'
    },
    value: '',
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password'
    },
    value: '',
    validation: {
      required: true,
      password: true
    },
    valid: false,
    touched: false
  }
}