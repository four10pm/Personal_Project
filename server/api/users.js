const express = require('express');
const util = require('util');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const SALT_ROUNDS = 2;

// const { authRequired } = require('./utils');
const { getAllUsers, getUserById, getFavorites, addFavorites, deleteFavorites, createUser, updateUser, deleteUser} = require('../db/helpers/users');

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

router.get('/:id/favorites', async(req, res, next) => {
    try {
        const favorites=await getFavorites(req.params.id);
        res.send(favorites)
    } catch (error) {
        next(error)
    }
})

router.post('/:id/favorites', async(req, res, next) => {
    try {
        const favorites=await addFavorites(req.body)
        res.send(favorites)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id/favorites/', async(req, res, next) => {
    try {
        const favorites=await deleteFavorites(req.body)
        res.send(favorites)
    } catch (error) {
        next(error)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const {name, username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        console.log(hashedPassword)
        const user = await createUser({ name, username, password: hashedPassword });
        console.log(user)
        delete user.password;
        
        const token=jwt.sign(user, JWT_SECRET)
        console.log(token)
        res.cookie("token", token, {
            sameSite: "strict",
            httpOnly: true,
            signed: true
        });
        
        res.send({token, user})
    } catch (error) {
        next(error)
    }
})

router.post('/login', async(req, res, next) => {
    try {
        const {username, password} = req.body
        console.log(username,  password)
        const user = await getUserById(username)
        console.log(user)
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword) {
            console.log("valid")
            const token = jwt.sign(user, JWT_SECRET)
            res.cookie("token", token, {
				sameSite: "strict",
				httpOnly: true,
				signed: true
            })
        //     delete user.password
            res.send({token, user})
        }
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