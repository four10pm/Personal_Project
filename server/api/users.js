const express = require('express');
const util = require('util');

const router = express.Router();
// const { authRequired } = require('./utils');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../db/helpers/users');

router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        res.send(user)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        res.send(user)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.send(user)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id);
        res.send(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router;