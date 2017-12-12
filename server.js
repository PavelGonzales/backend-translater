'use strict';

const express = require('express');
const app = express();
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv').load();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.send('Welcome to Passport with Sequelize');
});

const models = require('./api/models');
const authRoute = require('./api/routes/auth.js')(app,passport);

require('./config/passport/passport.js')(passport, models.user);

models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});

// const routes = require('./api/routes');
// routes(app);

app.listen(port);

console.log("Node application running on port " + port);  