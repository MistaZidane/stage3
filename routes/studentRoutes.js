const express = require('express');
const router = express.Router();
const studentReg = require('../models/jsonWorker');
var log = require('../utils/log');
var allStudents = require('../utils/readusers');
var idGenarator = require('../utils/idGenarator');
// getting all students
router.get('/', async(req,res)=>{
   res.json(allStudents.getAlldata('students'));
   log.writeLog('Got all students data')
})
// getting one student
router.get('/:id',(req,res)=>{
   res.json(allStudents.getdata('students',req.params.id));
});
// creating a stdent 
/* 
post structure
{
"name":"test",
"age":"17",
"email":"Testing@test.com",
"sex":"male"
}
*/
router.post('/', async(req,res)=>{
    req.body.id = idGenarator.genarate();
    let mesage = {title:""};
    await studentReg.register(req.body,'students')
   
   await studentReg.event.on('registered',()=>{
      // log file creation
    //   log.writeLog(fields.id,'registered on')
    log.writeLog('created a new student')
       mesage.title =  'Created Student succesfully'
       res.send("Created Student succesfully")
    })
   await studentReg.event.on('exist',()=>{
        mesage.title = 'student exist already';
        console.log('dsc');
        res.send("student exist already")
    })
   
});
// updating a shope item
router.patch('/:id/:name/:age/:email', (req,res)=>{
   let students = allStudents.getAlldata('students');
   let mesage = {title:"user not found"}
  let newStudents= students.filter((item)=>{
      if(item.id == req.params.id){
          if(req.params.name){
            item.name = req.params.name
          }
          if(req.params.age){
            item.age = req.params.age
          }
          if(req.params.email){
            item.email = req.params.email
          }
          mesage.title = 'Students edited completely'
          log.writeLog('edited a student')
      }
       return  true
   })
  // res.json(newStudents)
   console.log(newStudents)
  res.json(mesage)
  allStudents.writedata('students',newStudents)
});
// delleting one
router.delete('/:id', (req,res)=>{
    let students = allStudents.getAlldata('students');
    let mesage = {title:'user not found'}
    let newStudents= students.filter((item)=>{
       
       if(item.id == req.params.id){
           mesage.title = 'Students deleted'
           log.writeLog('delleted a student')
           return
       }
       
        return item.id != req.params.id
    })
    res.json(mesage)
   allStudents.writedata('students',newStudents)
});
module.exports  = router;