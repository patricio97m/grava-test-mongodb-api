/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Ruta para actualizar un usuario por su ID
// eslint-disable-next-line consistent-return
router.put('/users/:id', async(req, res) => {
    const userId = req.params.id;
    const updatedFields = req.body;

    try {
        // Actualizo el usuario en la base de datos utilizando findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {new: true});

        if (!updatedUser) {
            // Si no se encuentra el usuario, devuelve un mensaje de error
            return res.status(404).json({error: 'User not found'});
        }

        // Si se actualiza correctamente, devuelve el usuario actualizado como respuesta
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
});

module.exports = router;
