const express = require('express');
const router = express.Router();
const User = require('../models/index.js');

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        res.json(data);
    })
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ 'message': 'Deleted' });
})

router.post('/', (req, res) => {
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    user.save(() => {
        res.json(user);
    })
})

router.put('/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ 'message': 'Updated' })
})

module.exports = router