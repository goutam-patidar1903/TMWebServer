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
response.write("<td><h3>Student (Edit Module)</h3></td>");
response.write("<td align='right'><a href='logout' >Logout</a></td>");
response.write("</tr>");
response.write("</table>");
response.write("<span style='color:red'>"+ rollNumber +" not exists</span>");
response.write("<form action='getStudents'>");
response.write("<button type='submit'>Ok</button>");
response.write("</form>");
response.write("</body>");
response.write("</HTML>");
response.close();
return;
}

response.setContentType('text/html');
response.write("<!DOCTYPE HTML>");
response.write("<head>");
response.write("<title>College Message Board</title>");
response.write("<meta charset='utf-8'>");
response.write("<script>");
response.write("function validateForm(f)");
response.write("{");
response.write("var name=f.name.value.trim();");
response.write("var nameErrorSection=document.getElementById('nameErrorSection');");
response.write("nameErrorSection.innerHTML='';");
response.write("var valid=true;");
response.write("if(name.length==0)");
response.write("{");
response.write("valid=false;");
response.write("nameErrorSection.innerHTML='Required';");
response.write("}");
response.write("return valid;");
response.write("}");
response.write("function cancelUpdation()");
response.write("{");
response.write("document.getElementById('cancelButtonForm').submit();");
response.write("}");
response.write("</script>");
response.write("</head>");
response.write("<body>");
response.write("<h1>Administration</h1>");
response.write("<table width='100%' border='0'>");
response.write("<tr>");
response.write("<td><h3>Student (Edit Module)</h3></td>");
response.write("<td align='right'><a href='logout' >Logout</a></td>");
response.write("</tr>");
response.write("</table>");
response.write("<form action='updateStudent' method='post' onsubmit='return validateForm(this)'>");
response.write("<table>");
response.write("<tr>");
response.write("<td>Roll Number</td>");
response.write("<td><input type='hidden' name='rollNumber' id='rollNumber' value='"+rollNumber+"'>");
response.write("<b>"+ rollNumber +"</b></td>");
response.write("</tr>");
response.write("<tr>");
response.write("<td>Name</td>");
response.write("<td><input type='text' name='name' id='name' value='"+students[i].name+"'>");
response.write("<span id='nameErrorSection' style='color: red;'></span></td>");
response.write("</tr>");
response.write("<tr>");
response.write("<td colspan='2' align='center'><button type='submit'>Update</button>&nbsp;&nbsp;<button type='button' onclick='cancelUpdation()'>Cancel</button></td>");
response.write("</tr>");
response.write("</table>");
response.write("</form>");
response.write("<form action='getStudents' id='cancelButtonForm'></form>");
response.write("<br>");
response.write("<a href='AdminHomePage.html'>Home</a>");
response.write("</body>");
response.write("</HTML>");
response.close();
}
