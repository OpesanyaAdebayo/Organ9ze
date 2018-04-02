let mongojs = require('mongojs');
let bcrypt = require('bcryptjs');
let db = mongojs(process.env.MLAB_URI, ['users']); // Replace with credentials from .env file
let salt = bcrypt.genSaltSync(10);

const processFormInput = (formInput) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({
            email: formInput.email
        }, (err, profile) => {
            if (err) {
                return reject(Error(err));
            } else if (!profile || !bcrypt.compareSync(formInput.password, profile.password)) {
                return reject(new Error('Invalid username or password.'));
            }
            resolve(profile);

        });
    });
};


module.exports = {
    processFormInput: processFormInput
};