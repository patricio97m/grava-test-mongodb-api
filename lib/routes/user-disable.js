/* eslint-disable linebreak-style */
'use strict';
const router = require('express').Router();
const User = require('../models/user');

// eslint-disable-next-line consistent-return
router.post('/users/:id/disable', async(req, res) => {
    const userId = req.params.id;
    
    try {
        // Se verifica si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({error: 'El usuario no existe'});
        }

        // Se verifica si el usuario está habilitado
        if (!user.enabled) {
            return res.status(400).json({error: 'El usuario ya está deshabilitado'});
        }

        // Deshabilitar al usuario
        user.enabled = false;
        await user.save();

        return res.json({message: 'Usuario deshabilitado correctamente'});
    } catch (error) {
        return res.status(500).json({error: 'Server error'});
    }
});

module.exports = router;
