const { check } = require('express-validator');

exports.signupValidator = [

    check('firstName')
    .trim()
    .notEmpty()
    .withMessage('First Name Required')
    .matches(/^[a-zA-Z\u0080-\u024F\s\,-]/i)
    // .matches(/^[a-zA-Z ]*$/)
    .withMessage('Only Characters with white space are allowed'),

    check('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last Name Required')
    .matches(/^[a-zA-Z\u0080-\u024F\s\,-]/i)
    // .matches(/^[a-zA-Z ]*$/)
    .withMessage('Only Characters with white space are allowed'),

    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('👎 It must be something like this : your.name@groupomania.fr')
    .matches(/^([a-z\d\.-]+)@([groupomania\d-]+)\.([fr]{2})/),

    check('password')
    .trim()
    .isStrongPassword()
    .withMessage('👀 Password Must Be at Least 8 Characters & a min of: 1 Lowercase, 1 Uppercase, 1 number, 1 symbol')
    // .matches('[0-9]')
    // .withMessage('with 1 number')
    // .matches('[a-z]')
    // .withMessage('with 1 Lowercase')
    // .matches('[A-Z]')
    // .withMessage('with 1 Uppercase')
    // .matches('[~`!@#$%^&*()-_+={}[]|;:"<>,./?]')
    // .withMessage('with 1 symbol')

    // .escape()

]



exports.loginValidator = [


]

exports.profileValidator = [


]