// const express = require('express')
const express = require('express');
const app = express();

app.use(express.json())

// Route Imports
const user = require('./routes/UserRoutes')
const admin = require('./routes/adminRoutes')
const fields = require('./routes/FieldRoutes')


app.use('/api/v1',user)
app.use('/api/v1',admin)
app.use('/api/v1',fields)
module.exports = app;