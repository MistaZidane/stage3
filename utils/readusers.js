var fs = require('fs');
var path = require('path');

exports.getAlldata = (file)=>{
    let data = fs.readFileSync(path.join(__dirname + `../../database/${file}/${file}.json`));
   return JSON.parse(data.toString());
}
exports.getdata = (file,id)=>{
    let data = fs.readFileSync(path.join(__dirname +`../../database/${file}/${file}.json`));
    
   let users =JSON.parse(data.toString());
   let user = users.filter((item)=>{
        return item.id.trim() ==id.trim();
    });
    return user
}

exports.writedata = (file,users)=>{
    fs.writeFileSync(path.join(__dirname + `../../database/${file}/${file}.json`),JSON.stringify(users));

}