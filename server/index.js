require('dotenv').config()
const connectDB = require('./database/connection');

const express = require('express');
const authRoutes = require('./routes/UserRoutes')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

connectDB();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server started running on ${PORT}`))