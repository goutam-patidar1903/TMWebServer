const fs=require('fs');
var thisModule=this;
exports.processRequest=function(request,response){
var username=request.data["username"];
var password=request.data["password"];
var repassword=request.data["repassword"];
var administrator = JSON.parse(fs.readFileSync('./private/data/admin.conf'));
if(administrator.username!=username || administrator.password!=password)
{
response.setContentType("text/html");
response.write("<script>");
response.write("function validateForm(f)");
response.write("{");
response.write("var username=f.username.value.trim();");
response.write("var password=f.password.value.trim();");
response.write("if(username.length==0)");
response.write("{");
response.write("alert('Username required');");
response.write("f.username.focus();");
response.write("return false;");
response.write("}");
response.write("if(password.length==0)");
response.write("{");
response.write("alert('Password required');");
response.write("f.password.focus();");
response.write("return false;");
response.write("}");
response.write("return true;");
response.write("}");
response.write("</script>");
response.write("<body>");
response.write("<h1>Administration Module</h1>");
response.write("<h3>Authentication</h3>");
response.write("<form action='authenticateAdmin' method='POST' onsubmit='return validateForm(this)'>");
response.write("<table border='0'>");
response.write("<tr>");
response.write("<td>Username</td>");
response.write("<td><input type='text' name='username' id='username' maxlength='15' size='16'></td>");
response.write("</tr>");
response.write("<tr>");
response.write("<td>Password</td>");
response.write("<td><input type='password' name='password' id='password' maxlength='15' size='16'></td>");
response.write("</tr>");
response.write("<tr>");
response.write("<td colspan='2' align='center'><button type='submit'>Login</button></td>");
response.write("</tr>");
response.write("</table>");
response.write("</form>");
response.write("</body>");
response.write("</HTML>");
response.close();
return;
}

response.write("<!DOCTYPE HTML>");
response.write("<head>");
response.write("<title>College Message Board</title>");
response.write("<meta charset='utf-8'>");
response.write("</head>");
response.write("<body>");
response.write("<h1>Administration Module</h1>");
response.write("<a href='StudentAddForm.jst'>Add Student</a><br>");
response.write("<a href='getStudents'>Student List</a><br>");
response.write("<a href='messageForm.html'>Post Message</a><br>");
response.write("<a href='messageBoard'>Message Board</a><br>");
response.write("<a href='logout'>Logout</a><br>");
response.write("</body>");
response.write("</HTML>");
response.close();
}