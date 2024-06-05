const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const workersRoutes = require('./routes/workers');
const daysRoutes = require('./routes/days');
const eventsRoutes = require('./routes/events');
const scheduleRoutes = require('./routes/schedule');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/workers', workersRoutes);
app.use('/days', daysRoutes);
app.use('/events', eventsRoutes);
app.use('/schedule', scheduleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
