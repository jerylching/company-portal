import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET

const removeBearerSubstring = (token) => token.slice(7);

const createAccessToken = (user) => {
    const data = { id: user._id, role: user.role };
    return jwt.sign(data, secret, { expiresIn: '6h' });
};

const verifyAccessToken = (request, response, next) => {
    let token = request.headers.authorization;

    if (typeof token !== 'undefined') {
        const cleanedToken = removeBearerSubstring(token);

        jwt.verify(cleanedToken, secret, (error, data) => {
            if (error) {
                response.status(401).json({
                    error: error.name,
                    message: 'Invalid or expired access token.',
                });
            } else {
                request.user = data;
                next();
            }
        });
    } else {
        response.status(401).json({
            error: 'token_missing',
            message: 'Access token is missing from the request.',
        });
    }
}

const authenticator = {
    createAccessToken,
    verifyAccessToken
};

export default authenticator;