/* eslint-disable linebreak-style */
'use strict';
const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
    let query = {}; // Query vacío
    const {enabled, sortBy} = req.query; // Se obtienen parámetros para la consulta
        
    query.enabled = enabled === 'true'; // Convertir a booleano
        
    // Se aplica la calificación
    let sortOption = {};
    sortOption[sortBy] = 1; // 1 para orden ascendente, -1 para orden descendente
   
        
    // Se obtienen usuarios de la base de datos con filtros y clasificación aplicados
    const users = User.find(query).sort(sortOption);
        
    // Se envian todos los usuarios
    res.json(users);
});

module.exports = router;
