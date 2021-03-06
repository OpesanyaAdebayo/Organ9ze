var express = require('express');
var router = express.Router();

let loginController = require('../controllers/auth/loginController');
let signupController = require('../controllers/auth/signupController');
let tokenController = require('../controllers/auth/tokenController');


router.post('/login', function (req, res, next) {
  let userObject = {
    email: req.body.email,
    password: req.body.password
  };

  loginController
    .processFormInput(userObject)
    .then(profile => tokenController.assignToken(profile))
    .then(token => res.json({
      token: token
    }))
    .catch((err) => res.status(401).json({
      error: err.message.toString()
    }));


});

router.post('/signup', function (req, res, next) {
  
  let userObject = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
    password: req.body.password
  };

  signupController
    .processFormInput(userObject)
    .then(profile => tokenController.assignToken(profile))
    .then(token => {
      res.json({
        token: token
      });
    })
    .catch((err) => res.status(400).json({
      error: err.message.toString()
    }));
});

module.exports = router;