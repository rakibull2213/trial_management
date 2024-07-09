require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const port = process.env.PORT || 3000;

// Connect to database and start server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
