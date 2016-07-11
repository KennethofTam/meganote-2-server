var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// Login
router.post('/', (req, res) => {
  User
    .findOne({
      username: req.body.user.username
    })
    .then (
      user => {
        if (user) {
          // User exists, check if password matches
          user.authenticate(req.body.user.password, (isMatch) => {
            if (isMatch) {
              // Correct password
              var token = jwt.sign(userData._id, process.env.JWT_SECRET, {
                expiresIn: 60*60*24
              });
              res.json({
                user,
                authToken: token
              });
            }
            else {
              // Wrong password
              res.status(401).json({
                message: 'We are unable to log you in with those credentials'});
            }
          });

        }
        else {
          // User does not exist
          res.status(401).json({
            message: 'We are unable to log you in with those credentials'});
        }
      }
    )
});

module.exports = router;
