const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db/db.connection');
app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
app.use('/api', routes);

app.listen(3100,()=>{
    console.log('Connected to  server ');
});
