
export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
        if (!isValid) {
            return {
                isValid: false,
                errorMessage: 'Empty Content.'
            }
        }
    }

    if (rules.password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        isValid = regex.test(value) && isValid;
        if (!isValid) {
            return {
                isValid: false,
                errorMessage: 'Password require at least eight characters, at least one letter, one number and one special character.'
            }
        }
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
        if (!isValid) {
            return {
                isValid: false,
                errorMessage: 'Invalid Email'
            }
        }
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
        if (!isValid) {
            return {
                isValid: false,
                errorMessage: 'Not numeric'
            }
        }
    }

    return { isValid: true, errorMessage: null };
}