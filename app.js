const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();

const workersRoutes = require('./routes/workers');
const daysRoutes = require('./routes/days');
const eventsRoutes = require('./routes/events');
const scheduleRoutes = require('./routes/schedule');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/workers', workersRoutes);
app.use('/days', daysRoutes);
app.use('/events', eventsRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
