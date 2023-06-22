const router = require('express').Router();

const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    try {
        const result = await userService.register(req.body);

        res.json(result);
    } catch (err) {
        res.status(400).json({
            message: 'Error occured!'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await userService.login(req.body);
       
        res.json(result);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.get('/logout', (req, res) => {
    //TODO: invalidate token

    res.end();
});

module.exports = router;