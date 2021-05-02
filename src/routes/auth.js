const { Router } = require('express');
const UserService = require('../services/Users')
const userService = new UserService()

module.exports = function authRouter(app) {
    const router = Router();
    app.use('/auth', router);

    router.post('/register', (req, res, next) => {
        const user = {
            name: req.body.name,
            photo: req.body.photo,
        };
        if (req.cookies.user) {
            res.clearCookie('user');
        }
        res.cookie('user', user.name, { httpOnly: false });
        res.status(200).json({ message: 'User Registered', user });
    });

    router.post('/sign-in', (req, res, next) => {
        
    })
};
