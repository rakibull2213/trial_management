const express = require('express');
const User = require('../models/user');

const router = express.Router();


router.get('/all-user', async (req, res) => {
    const users = await User.find();
    users.sort((a, b) => a.trialStartDate - b.trialStartDate);


    if (!users) {
        return res.status(404).json({ message: 'No user found' });
    }

    res.json({ Total: users.length, data: [
        ...users.map(user => ({
            userId: user.userId,
            appName: user.appName,
            description: user.description,
            trialStartDate: user.trialStartDate,
            trialDuration: user.trialDuration,
            reminder: `Trial ends in ${Math.ceil((new Date(user.trialStartDate).setDate(new Date(user.trialStartDate).getDate() + user.trialDuration) - new Date()) / (1000 * 60 * 60 * 24))} days`
        }))
    ]});
}
);









module.exports = router;