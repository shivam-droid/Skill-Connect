import AuthRepository from '../repository/auth-repository.js'

class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
    }

    async registerUser(userData) {
        try {
            const user = await this.authRepository.registerUser(userData);
            return user;
            
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async loginUser(email, password) {
        try {

            const user = await this.authRepository.loginUser(email, password);
            return user;
            
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw new Error('Error creating user: ' + error.message);
        }
    }
}

export default AuthService;