const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors')
const app = express();
connectDB();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())

// Mount the routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/employees', employeeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));