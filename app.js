// const express = require('express')
const express = require('express');
const app = express();

app.use(express.json())

// Route Imports
const product = require('./routes/productRoutes')
const user = require('./routes/UserRoutes')
const admin = require('./routes/adminRoutes')
app.use('/api/v1',product)
app.use('/api/v1',user)
app.use('/api/v1',admin)
module.exports = app;