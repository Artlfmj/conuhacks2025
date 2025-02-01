const express = require("express");
const constant = require("./config/constant");
const { Logger, LogLevel } = require("./Logger");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const route = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/gamehive")

const logger = new Logger({colors: true, level: LogLevel.INFO, prefix: "API", timestamp: true})

const app = express();

app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(route)

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err)
    logger.error(`Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Error handling for unhandled routes
app.use((req, res) => {
    logger.warn(`404 - Route not found: ${req.originalUrl}`);
    res.status(404).json({ error: 'Route not found' });
});

app.listen(constant.PORT, () => {
    logger.warn(`Server listening on port ${constant.PORT}`)
}).on('error', (err) => {
    logger.error(`Server failed to start: ${err.message}`);
    process.exit(1);
});