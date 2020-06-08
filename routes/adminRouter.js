var express = require('express');
var router = express.Router();
var alldata = require('../utils/readusers');
var passwordHarsher = require('../utils/password');
var log = require('../utils/log');
let admin = {name:'zidane', password:'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='}
const formidable = require('formidable');
router.get('/', (req, res) => {
    res.render('login')
});
router.post('/', (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
    let password = passwordHarsher.getHashedPassword(fields.password)
        
        if(admin.name== fields.name && admin.password == password){
            //res.send(JSON.stringify(fields));
          log.writeLog('login')
        let course = alldata.getAlldata('course')
        let students = alldata.getAlldata('students')
        let staff = alldata.getAlldata('staff')
        let alllog = log.readLog();
            res.render('protected', {data: admin, students:students, course:course, staff:staff, log:alllog});
        }
        else{
            res.send('you are not registered');
        }
      
    });
    
});
module.exports = router;