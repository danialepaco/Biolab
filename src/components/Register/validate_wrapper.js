import validation from 'validate.js'

export default function validate(fieldName, value) {
    var constraints = {
        Email: {
            presence: true,
            format: {
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'is invalid',
            }
        },
        Password: {
            presence: true,
            length: {
                minimum: 6,
                maximum: 20,
                message: 'is invalid',
            }
        },
        confirmPassword: {
            presence: true,
            equality: 'password'
        },
        
        Name: {
            presence: true,
            length: {
                minimum: 3,
                maximum: 20,
                message: 'is invalid',
            }
        },
        Username: {
            presence: true,
            length: {
                minimum: 6,
                maximum: 20,
                message: 'is invalid',
            }
        },
        id: {
            presence: true,
            length: {
                minimum: 6,
                maximum: 20,
                message: 'is invalid',
            }
        },
        Address: {
            presence: true,
            length: {
                minimum: 6,
                maximum: 20,
                message: 'is invalid',
            }
        },
        Lastname: {
            presence: true,
            length: {
                minimum: 3,
                maximum: 20,
                message: 'is invalid',
            }
        },
    };

    var formValues = {}
    formValues[fieldName] = value

    var formFields = {}
    formFields[fieldName] = constraints[fieldName]


    const result = validation(formValues, formFields)

    if (result) {
	return result[fieldName][0]
    }
    return null
}