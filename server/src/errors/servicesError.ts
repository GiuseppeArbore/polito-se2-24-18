
const Service_ALREADY_EXISTS = "The service type is already exists";

class ServiceAlreadyExistsError extends Error {
    customMessage: String;
    customCode: Number;

    constructor() {
        super()
        this.customMessage = Service_ALREADY_EXISTS
        this.customCode = 401;
    }
}

export { ServiceAlreadyExistsError }