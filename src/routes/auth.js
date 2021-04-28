const { Router } = require('express');

module.exports = function authRouter(app) {
    const router = Router();
    app.use('/auth', router);
    router.get('/', (req, res, next) => {
        res.cookie('hola', 'hola4');
        res.send('hola');
    });
    router.post('/register', (req, res, next) => {
        const user = {
            name: req.body.name,
            photo: req.body.photo,
        };
        if (req.cookies.user) {
            res.clearCookie('user');
        }
        res.cookie('user', user, { httpOnly: false });
        res.status(200).json({ message: 'User Registered', user });
    });
};
