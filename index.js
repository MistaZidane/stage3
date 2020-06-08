
var path = require('path')
var express = require('express');
const exphbs = require("express-handlebars"); 
var fs= require('fs')

// cofigure our server
const app  = express();
app.engine("handlebars", exphbs({partialsDir: path.join(__dirname + '/views/partials')} ));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const studentRouter = require('./routes/studentRoutes');
const staffRouter = require('./routes/staffRouter')
const courseRouter = require('./routes/courseRouter');
const adminRouter = require('./routes/adminRouter');
app.use('/student', studentRouter)
app.use('/staff', staffRouter)
app.use('/course', courseRouter)
app.use('/admin', adminRouter)


app.listen(8080,()=>{
    console.log(`server started in http://localhost:8080`);
})