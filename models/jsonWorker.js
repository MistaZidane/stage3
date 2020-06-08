var fs = require('fs');
var path = require('path');
var event = require('events');
var eventEmitter = new event.EventEmitter();
function checkIfUserIsRegistered(userName, file){
    console.log(userName, file)
    let usersJson = fs.readFileSync(path.join(__dirname + `../../database/${file}/${file}.json`));
    let users = JSON.parse(usersJson);
    let checker = false;
    users.forEach(element => {
        if(element.name == userName){
            checker =  true;
            return;
        }
    });
    return checker;
}
exports.register = (data,file)=>{
    console.log(data);
    let status = [];
        fs.stat(path.join(__dirname + `../../database/${file}/${file}.json`),(err,stat)=>{
            if(err){
                fs.writeFile(path.join(__dirname + `../../database/${file}/${file}.json`),`[ ${data}]` ,(err)=>{
                    if(err){
                        console.log(err);
                    }
                 })
            }
           
            else{
                if(checkIfUserIsRegistered(data.name, file)){
                    console.log('user exist already');
                    eventEmitter.emit("exist");
                    return;
                }
                else{
                 var usersJson =  fs.readFileSync(path.join(__dirname + `../../database/${file}/${file}.json`));
                 var user = JSON.parse(usersJson);
                 eventEmitter.emit('registered')
                user.push(data)
                fs.writeFile(path.join(__dirname + `../../database/${file}/${file}.json`), JSON.stringify(user),(err)=>{
                    if(err){
                        console.log(err);
                    }
                 });
                 
                 return;
                }
               
            }
        })
    }
    
exports.event = eventEmitter;
