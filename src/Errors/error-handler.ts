export default class ApiError extends Error {



    status: any;
    errors: any;



    constructor(status: number, message: string = '', errors: string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is unathorized')
    }

    static BadRequest() {
        return new ApiError(400, '', [])
    }

}