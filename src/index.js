import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
 // ✅ this must match your db.js export

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect to DB
connectDB();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
