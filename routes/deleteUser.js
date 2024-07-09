const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.delete('/delete-user', async (req, res) => {
    const userId = req.query.userId;
    const user = await User.findOne ({ userId });


    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
     
    try {
        await User.deleteOne({ userId });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}
);

module.exports = router;