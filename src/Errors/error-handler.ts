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
        console.log('User is unathorized');
        
        return new ApiError(401, 'User is unathorized')
    }

    static BadRequest(message:string,errors:any) {
        console.log(message);
        return new ApiError(400, message, )
    }

}