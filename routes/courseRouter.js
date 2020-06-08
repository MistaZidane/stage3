const express = require('express');
const router = express.Router();
const coursereg = require('../models/jsonWorker');
var log = require('../utils/log');
var allstaff = require('../utils/readusers');
var idGenarator = require('../utils/idGenarator');
// getting all students
router.get('/', async(req,res)=>{
   res.json(allstaff.getAlldata('course'));
   log.writeLog('Got all course data')
})
// getting one student
router.get('/:id',(req,res)=>{
   res.json(allstaff.getdata('course',req.params.id));
});
// creating a stdent 
/* 
post structure
{
"name":"web dev",
"title":"17dd df df df",
"description":"this is the description"
}
*/
router.post('/', async(req,res)=>{
    req.body.id = idGenarator.genarate();
    let mesage = {title:""};
    await coursereg.register(req.body,'course')
   
   await coursereg.event.on('registered',()=>{
      // log file creation
    //   log.writeLog(fields.id,'registered on')
    log.writeLog('created a new course')
       mesage.title =  'Created course succesfully'
       res.send("Created course succesfully")
    })
   await coursereg.event.on('exist',()=>{
        mesage.title = 'course exist already';
        console.log('dsc');
        res.send("course exist already")
    })
   
});
// updating a shope item
router.patch('/:id/:name/:age/:email', (req,res)=>{
   let staffs = allstaff.getAlldata('course');
   let mesage = {title:"course not found"}
  let newcourse= staffs.filter((item)=>{
      if(item.id == req.params.id){
          if(req.params.name){
            item.name = req.params.name
          }
          if(req.params.title){
            item.title = req.params.title
          }
          if(req.params.description){
            item.description = req.params.description
          }
          mesage.title = 'course edited completely'
          log.writeLog('editted a  course')
      }
       return  true
   })

   console.log(newcourse)
  res.json(mesage)
  allstaff.writedata('course',newcourse)
});
// delleting one
router.delete('/:id', (req,res)=>{
    let students = allstaff.getAlldata('course');
    let mesage = {title:""}
    let newcourse= students.filter((item)=>{
       
       if(item.id == req.params.id){
           mesage.title = 'staff deleted'
           log.writeLog('del a course')
           return
       }
       else{
        mesage.title = 'course not found'

       }
        return item.id != req.params.id
    })
    res.json(mesage)
   allstaff.writedata('course',newcourse)
});
module.exports  = router;