const express = require('express');
const util = require('util');

const router = express.Router();
// const { authRequired } = require('./utils');
const { getAllCities, getCityById, createCity, updateCity, deleteCity } = require('../db/helpers/cities');

router.get('/', async (req, res, next) => {
    try {
        const cities = await getAllCities();
        res.send(cities);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const city = await getCityById(req.params.id);
        res.send(city)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const city = await createCity(req.body);
        res.send(city)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const city = await updateCity(req.params.id, req.body);
        res.send(city)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const city = await deleteCity(req.params.id);
        res.send(city)
    } catch (error) {
        next(error)
    }
})

module.exports = router;