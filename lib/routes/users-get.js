/* eslint-disable linebreak-style */
'use strict';
const router = require('express').Router();
const User = require('../models/user');

router.get('/users', async(req, res) => {
    try {
        let query = {}; //Consulta vacia
        const {enabled, sortBy} = req.query;
            
        query.enabled = enabled === 'true';
        

        let sortOption = {}; // Inicializo el objeto vacio para ordenar
        if (sortBy) { // Verifico si hay un parámetro ('sortBy') en la consulta.
            sortOption[sortBy] = 1; //Lo odeno de forma ascendente
        }

        const users = await User.find(query).sort(sortOption);
        res.json(users);
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
});

module.exports = router;
