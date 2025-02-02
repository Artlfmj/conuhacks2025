const express = require('express');
const {Logger, LogLevel} = require('./Logger');

const logger = new Logger('frontend', LogLevel.INFO, true);

const app = express();

// EJS 
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    logger.info('GET /');
    res.render('index');
});

app.get("/review", (req, res) => {
  res.render("review")
})

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});