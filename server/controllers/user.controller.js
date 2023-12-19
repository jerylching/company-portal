import bcrypt from 'bcrypt';
import authenticator from '../modules/authenticator.js';
import User from '../models/user.model.js';

const createUser = async (params, loggedInUserRole) => {
    try {
        if (loggedInUserRole === 'admin') {
            let user = new User({
                firstName: params.firstName,
                lastName: params.lastName,
                email: params.email,
                password: params.password,
                role: 'user'
            });

            await user.save();

            return {
                status: 'create_user_success',
                message: 'The user has been registered to the database.'
            };
        } else {
            // If the user is not an admin, return an error message
            return {
                error: 'access_denied',
                message: 'Only admins can create new users.'
            };
        }
    } catch (error) {
        return {
            error: 'operation_failed',
            message: error.message
        };
    }
};

const login = async (params) => {
    try {
        const user = await User.findOne({ email: params.email });

        if (user === null) {
            return {
                error: 'auth_failed',
                message: 'User not found.'
            };
        }

        const passwordMatched = await bcrypt.compare(params.password, user.password);

        if (passwordMatched) {
            return {
                fullName: `${user.firstName} ${user.lastName}`,
                accessToken: authenticator.createAccessToken(user.toObject()),
                role: user.role
            };
        } else {
            return {
                error: 'auth_failed',
                message: 'Password is incorrect.'
            };
        }
    } catch (error) {
        return {
            error: 'operation_failed',
            message: error.message
        };
    }
}

export { createUser, login };