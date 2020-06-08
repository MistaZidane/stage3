const os = require('os');
var fs = require('fs')
let ram = os.totalmem() / (1024 * 1024 * 1024);
let freeRam = os.freemem() / (1024 * 1024 * 1024);
let arch = os.arch();
let cores = os.cpus();
let numCores = 0;
cores.forEach((cores, index) => {
    numCores += 1
})
let type = os.type();
let uptime = os.uptime();
let userName = os.userInfo().username
let temp = os.tmpdir();
let hostName = os.hostname();
let osRealease = os.release();
let osInfo = {
    userName,
    arch,
    type,
    numCores,
    temp,
    uptime,
    ram,
    freeRam,
    osRealease,
    hostName
};
console.log(osInfo)
exports.info = osInfo;


// file mananger

// create file
function createFile(name,path, data){
    fs.writeFileSync(path+name,data);
}
createFile('zidane.txt','./', "this is a test");


// delete file
function deleteFile(path){
    fs.unlinkSync(path);
}
//deleteFile('zidane.txt')
// rename

function renameFile(newName, path){
    fs.renameSync(path,newName)
}
renameFile('zandroid.txt','zidane.txt');

// readfile 
function readFile(extension,path){
    if(extension =='txt'){
        var data = fs.readFileSync(path);
        console.log(data.toString());
    }
  
}
readFile('txt','zandroid.txt')