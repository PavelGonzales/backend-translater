'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3003;

const routes = require('./api/routes');  
routes(app);

app.use(cors({credentials: true, origin: true}));
app.listen(port);

console.log("Node application running on port " + port);  