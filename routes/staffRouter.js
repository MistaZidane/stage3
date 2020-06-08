const express = require('express');
const router = express.Router();
const staffReg = require('../models/jsonWorker');
var log = require('../utils/log');
var allstaff = require('../utils/readusers');
var idGenarator = require('../utils/idGenarator');
// getting all students
router.get('/', async(req,res)=>{
   res.json(allstaff.getAlldata('staff'));
   log.writeLog('Got all staff data')
})
// getting one student
router.get('/:id',(req,res)=>{
   res.json(allstaff.getdata('staff',req.params.id));
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
    await staffReg.register(req.body,'staff')
   
   await staffReg.event.on('registered',()=>{
      // log file creation
    //   log.writeLog(fields.id,'registered on')
    log.writeLog('created a new staff')
       mesage.title =  'Created staff succesfully'
       res.send("Created staff succesfully")
    })
   await staffReg.event.on('exist',()=>{
        mesage.title = 'staff exist already';
        console.log('dsc');
        res.send("student exist already")
    })
   
});
// updating a shope item
router.patch('/:id/:name/:age/:email', (req,res)=>{
   let staffs = allstaff.getAlldata('staff');
   let mesage = {title:"user not found"}
  let newStaff= staffs.filter((item)=>{
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
          mesage.title = 'staff edited completely'
          log.writeLog('edited a  staff')
      }
       return  true
   })
  // res.json(newStudents)
   console.log(newStaff)
  res.json(mesage)
  allstaff.writedata('staff',newStaff)
});
// delleting one
router.delete('/:id', (req,res)=>{
    let students = allstaff.getAlldata('staff');
    let mesage = {title:"user not found"}
    let newStaff= students.filter((item)=>{
       
       if(item.id == req.params.id){
           mesage.title = 'staff deleted'
           log.writeLog('delleted a staff')
           return
       }
        return item.id != req.params.id
    })
    res.json(mesage)
   allstaff.writedata('staff',newStaff)
});
module.exports  = router;