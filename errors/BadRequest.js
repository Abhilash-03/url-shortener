import { CustomApiError } from "./CustomApiError.js";

class BadRequest extends CustomApiError{
    constructor(message, status){
        super(message);
        this.status = status;

    }
}

export { BadRequest }