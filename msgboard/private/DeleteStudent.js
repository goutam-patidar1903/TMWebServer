const fs=require('fs');
var thisModule=this;
exports.processRequest=function(request,response)
{
var rollNumber=parseInt(request.data["rollNumber"]);
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
if(!found)
{
response.setContentType('text/html');
response.write("<!DOCTYPE HTML>");
response.write("<head>");
response.write("<title>College Message Board</title>");
response.write("<meta charset='utf-8'>");
response.write("</head>");
response.write("<body>");
response.write("<h1>Administration</h1>");
response.write("<table width='100%' border='0'>");
response.write("<tr>");
response.write("<td><h3>Student (Delete Module)</h3></td>");
response.write("<td align='right'><a href='logout' >Logout</a></td>");
response.write("</tr>");
response.write("</table>");
response.write("<span style='color:red'>"+ rollNumber +" not exists</span>");
response.write("<form action='getStudents'>");
response.write("<button type='submit'>OK</button>");
response.write("</form>");
response.write("</body>");
response.write("</HTML>");
response.close();
return;
}

students.splice(i,1);

var jsonToWrite={
"students" : students
};

fs.writeFileSync("./private/data/student.db",JSON.stringify(jsonToWrite));

response.setContentType('text/html');
response.write("<!DOCTYPE HTML>");
response.write("<head>");
response.write("<title>College Message Board</title>");
response.write("<meta charset='utf-8'>");
response.write("</head>");
response.write("<body>");
response.write("<h1>Administration</h1>");
response.write("<table width='100%' border='0'>");
response.write("<tr>");
response.write("<td><h3>Student (Delete Module)</h3></td>");
response.write("<td align='right'><a href='logout' >Logout</a></td>");
response.write("</tr>");
response.write("</table>");
response.write("<form action='getStudents'>");
response.write("<center>");
response.write("Student Deleted <br>");
response.write("<button type='submit'>OK</button>");
response.write("</center>");
response.write("</form>");
response.write("<br>");
response.write("<a href='AdminHomePage.html'>Home</a>");
response.write("</body>");
response.write("</HTML>");
response.close();
}
