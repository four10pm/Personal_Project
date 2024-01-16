const express = require('express');
const util = require('util');

const router = express.Router();
// const { authRequired } = require('./utils');
const { getAllDateExamples, getDateExampleById, createDateExample, updateDateExample, deleteDateExample, getDateExamplesByCity } = require('../db/helpers/dateExamples');

router.get('/', async (req, res, next) => {
    try {
        const dateExamples = await getAllDateExamples();
        res.send(dateExamples);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const dateExample = await getDateExampleById(req.params.id);
        res.send(dateExample)
    } catch (error) {
        next(error)
    }
})

router.get('/cities/:city', async (req, res, next) => {
    try {
        const dateExamples = await getDateExamplesByCity(req.params.city);
        res.send(dateExamples)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const dateExample = await createDateExample(req.body);
        res.send(dateExample)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const dateExample = await updateDateExample(req.params.id, req.body);
        res.send(dateExample)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const dateExample = await deleteDateExample(req.params.id);
        res.send(dateExample)
    } catch (error) {
        next(error)
    }
})

module.exports = router;