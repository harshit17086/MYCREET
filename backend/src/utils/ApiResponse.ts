class ApiResponse {
    // had to define the types for the api response object
    statusCode: number;
    data: any;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: any, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }