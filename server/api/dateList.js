const express = require('express');
const util = require('util');

const router = express.Router();
// const { authRequired } = require('./utils');
const { getAllDateList, getDateTypes, getDateListItemById, createDateListItem, updateDateListItem, deleteDateListItem } = require('../db/helpers/dateList');

router.get('/', async (req, res, next) => {
    try {
        const dateList = await getAllDateList();
        res.send(dateList);
    } catch (error) {
        next(error);
    }
});

router.get('/types', async (req, res, next) => {
    try {
        const dateTypes = await getDateTypes();
        res.send(dateTypes);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const dateListItem = await getDateListItemById(req.params.id);
        res.send(dateListItem)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const dateListItem = await createDateListItem(req.body);
        res.send(dateListItem)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const dateListItem = await updateDateListItem(req.params.id, req.body);
        res.send(dateListItem)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const dateListItem = await deleteDateListItem(req.params.id);
        res.send(dateListItem)
    } catch (error) {
        next(error)
    }
})

module.exports = router;