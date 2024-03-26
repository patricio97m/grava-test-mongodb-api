/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
'use strict';
const router = require('express').Router();
const User = require('../models/user');

// Ruta para modificar información de un usuario por su ID
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const {name, email} = req.body;
        
    // Verificar si el usuario existe
    const user = User.findById(userId);
    if (!user) {
        return res.status(404).json({error: 'El usuario no existe'});
    }
        
    // Actualizar los campos nuevos
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
        
    // Guardo el usuario actualizado
    user.save();
        
    res.json({message: 'Información de usuario actualizada correctamente'});
});

module.exports = router;
