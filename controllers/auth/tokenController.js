const jwt = require('jsonwebtoken');

const assignToken = (userObj) => {
    return new Promise((resolve, reject) => {
        let token = jwt.sign({
            username: userObj.email
        }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                return reject(Error(err));
            }
            resolve(token);
        });

    });
};

const checkToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {
            if (error) {
                //chech for error types
                return reject(Error(err));
            }
            resolve(decodedToken);
        });
    });
};

module.exports = {
    assignToken: assignToken,
    checkToken: checkToken
};