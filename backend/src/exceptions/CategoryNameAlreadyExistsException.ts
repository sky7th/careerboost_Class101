import HttpException from './HttpException';

class UserEmailAlreadyExistsException extends HttpException {
    constructor(name: string) {
        super(400, `Category name: ${name} already exists`);
    }
}

export default UserEmailAlreadyExistsException;