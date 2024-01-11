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