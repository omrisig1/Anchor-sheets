export default class validationException extends Error {
    status;
    message;
    constructor(status, message){
        super(message);
        this.status = status;
        this.message = message;
    }
}
