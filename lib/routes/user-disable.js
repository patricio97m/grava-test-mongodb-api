/* eslint-disable linebreak-style */
'use strict';
const router = require('express').Router();
const User = require('../models/user');

// eslint-disable-next-line consistent-return
router.post('/:id/disable', (req, res) => {
    const userId = req.params.id;
    
    // Se verifica si el usuario existe
    const user = User.findById(userId);
    if (!user) {
        return res.status(400).json({error: 'El usuario no existe'});
    }

    // Se verifica si el usuario está habilitado
    if (!user.enabled) {
        return res.status(400).json({error: 'El usuario ya está deshabilitado'});
    }

    // Deshabilitar al usuario
    user.enabled = false;
    user.save();

    res.json({message: 'Usuario deshabilitado correctamente'});
});

module.exports = router;
