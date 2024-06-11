const fs=require('fs');
var thisModule=this;
exports.processRequest=function(request,response)
{
var rollNumber=parseInt(request.data["rollNumber"]);
var name=request.data["name"];
var students=[];
if(fs.existsSync("./private/data/student.db"))
{
students=JSON.parse(fs.readFileSync("./private/data/student.db")).students;
}
var found=false;
for(var i=0;i<students.length;i++)
{
if(students[i].rollNumber==rollNumber)
{
found=true;
break;
}
}
if(found)
{
request.errorMessage=`Roll number : ${rollNumber} already exists.`;
request.rollNumber=rollNumber;
request.name=name;
request.forward("StudentAddForm.jst");
return;
}

students[students.length]={
"rollNumber" : rollNumber,
"name" : name
};

var jsonToWrite={
"students" : students
};

fs.writeFileSync("./private/data/student.db",JSON.stringify(jsonToWrite));

request.forward("StudentAddedNotification.html");
}