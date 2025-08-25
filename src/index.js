const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();


const PORT = process.env.PORT || 5000;


(async () => {
try {
await connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
console.error('Failed to start server:', err.message);
process.exit(1);
}
})();