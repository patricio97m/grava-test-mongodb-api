'use strict';
const router = require('express').Router();
const logger = require('../logger');
const {User, UserInformation} = require('../models');
const Joi = require('joi');

function validateFields(req, res, next) {
    // - name: string, al menos 3 caracteres
    // - color: string, uno de estos valores: "red", "green", "blue"
    // - email: string
    // - name: String
    // Ver los campos que son requeridos

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        color: Joi.string().valid('red', 'green', 'blue').required(),
        email: Joi.string().email().required()
    });

    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
   
    return next();
}

function createUserInformation(req, res, next) {
    // Creo el modelo UserInformation relacionado a User
    const userInformationData = {
        name: req.body.name,
        lastName: req.body.lastName,
        dni: req.body.dni,
        age: req.body.age
    };
   
    // Guardo UserInformation en la base de datos
    UserInformation.create(userInformationData)
        .then((userInformation) => {
            // Guardo la información del usuario en req para usarlo despues
            req.user.userInformation = userInformation;
            next();
        })
        .catch((error) => {
            logger.error(`createUserInformation error: ${error.message}`);
            res.status(500).json({
                code: 'internal_error',
                message: 'Internal error'
            });
        });
}

function saveUser(req, res) {
    return User.create({
        name: req.body.name,
        color: req.body.color
    })
        .then((user) => {
            return res.status(201).json(user.toJSON());
        })
        .catch((error) => {
            logger.error(`POST /users - saveUser error: ${error.message}`);
            return res.status(500).json({
                code: 'internal_error',
                message: 'Internal error'
            });
        });
}

router.post(
    '/users',
    validateFields,
    createUserInformation,
    saveUser
);

module.exports = router;
