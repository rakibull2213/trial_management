const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/add-user', async (req, res) => {
    const { userId,appName,description, trialStartDate, trialDuration } = req.body;

    if (!userId || !appName || !trialStartDate || !trialDuration) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = new User({
        userId,
        appName,
        description,
        trialStartDate: new Date(trialStartDate),
        trialDuration,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' , data : [
            {
                userId: userId,
                appName: appName,
                description: description,
                trialStartDate: trialStartDate,
                trialDuration: trialDuration
            }
        ] });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'User ID already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

module.exports = router;
