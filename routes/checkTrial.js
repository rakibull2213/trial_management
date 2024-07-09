const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/check-trial', async (req, res) => {
    const userId = req.query.userId;
    const user = await User.findOne({ userId });

    if (!user) {
        return res.status(404).json({ valid: false, message: 'User not found' });
    }

    const currentDate = new Date();
    const trialEndDate = new Date(user.trialStartDate);
    trialEndDate.setDate(trialEndDate.getDate() + user.trialDuration);

    const isValid = currentDate < trialEndDate;
    isValid === true
        ? res.json({ 
            valid: isValid,
            message: 'User trial is still active',
            data: {
                userId: user.userId,
                appName: user.appName,
                description: user.description,
                trialStartDate: user.trialStartDate,
                trialEndDate: trialEndDate,
                currentDate: currentDate,
                reminder: isValid ? `Trial ends in ${Math.ceil((trialEndDate - currentDate) / (1000 * 60 * 60 * 24))} days` : 'Trial has ended already'
            }
         })
        : res.status(401).json({ valid: false, message: 'User trial has expired' });




});

module.exports = router;
