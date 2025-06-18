const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/Auth');
const habitRoutes = require('./routes//Habit');
const errorHandler = require('./middlewares/error');
const { swaggerUi, swaggerSpec } = require('./swagger');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
