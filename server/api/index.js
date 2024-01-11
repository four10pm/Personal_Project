const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

// ROUTER: /api/dateList
router.use('/dateList', require('./dateList'));

// ROUTER: /api/dateExamples
router.use('/dateExamples', require('./dateExamples'));

router.use('/cities', require('./cities'));

router.use('/users', require('./users'));

module.exports = router;