import { ValidationError } from "joi";

export default function getValidationMessages(error) {

    //verifica se o erro passado foi gerado pelo joi
    if(error instanceof ValidationError) {
        const result = {
            ValidationError: true,
            errorMessages: {}
        }

        for(let e of error.details) {
            result.errorMessages[e.context.key] = e.message
        }

        return result
    }
    else return {ValidationError: false, errorMessages: {}}
}