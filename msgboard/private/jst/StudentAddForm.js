exports.processRequest=function(request,response)
{
response.write("<!DOCTYPE HTML>");
response.write("<head>");
response.write("<title>College Message Board</title>");
response.write("<meta charset='utf-8'>");
response.write("<script>");
response.write("function validateForm(f)");
response.write("{");
response.write("var rollNumber=f.rollNumber.value.trim();");
response.write("var name=f.name.value.trim();");
response.write("var rollNumberErrorSection=document.getElementById('rollNumberErrorSection');");
response.write("var nameErrorSection=document.getElementById('nameErrorSection');");
response.write("var errorSection=document.getElementById('errorMessage');");
response.write("rollNumberErrorSection.innerHTML='';");
response.write("nameErrorSection.innerHTML='';");
response.write("errorSection.innerHTML='';");
response.write("var valid=true;");
response.write("if(rollNumber.length==0)");
response.write("{");
response.write("valid=false;");
response.write("rollNumberErrorSection.innerHTML='Required';");
response.write("}");
response.write("if(name.length==0)");
response.write("{");
response.write("valid=false;");
response.write("nameErrorSection.innerHTML='Required';");
response.write("}");
response.write("if(rollNumber.length>0)");
response.write("{");
response.write("var e=0;");
response.write("var validSet='0123456789';");
response.write("while(e<rollNumber.length)");
response.write("{");
response.write("if(validSet.indexOf(rollNumber.charAt(e))==-1)");
response.write("{");
response.write("valid=false;");
response.write("rollNumberErrorSection.innerHTML='Should be a number';");
response.write("break;");
response.write("}");
response.write("e++;");
response.write("}");
response.write("}");
response.write("return valid;");
response.write("}");
response.write("</script>");
response.write("</head>");
response.write("<body>");
response.write("<h1>Administration</h1>");
response.write("<table width='100%' border='0'>");
response.write("<tr>");
response.write("<td><h3>Student (Add Module)</h3></td>");
response.write("<td align='right'><a href='logout' >Logout</a></td>");
response.write("</tr>");
response.write("</table>");
response.write("<span style='color:red' id='errorMessage'></span>");
response.write("<form action='addStudent' method='post' onsubmit='return validateForm(this)'>");
response.write("<table>");
response.write("<tr>");
response.write("<td>Roll Number</td>");
response.write("<td><input type='text' name='rollNumber' id='rollNumber' value='' >");
response.write("<span id='rollNumberErrorSection' style='color:red'></span></td>");
response.write("</tr>");
response.write("<tr>");
response.write("<td>Name</td>");
response.write("<td><input type='text' name='name' id='name' value=''>");
response.write("<span id='nameErrorSection' style='color:red'></span></td>");
response.write("</tr>");
response.write("<tr>");
response.write("<td colspan='2' align='center'><button type='submit'>Add</button></td>");
response.write("</tr>");
response.write("</table>");
response.write("</form>");
response.write("<br>");
response.write("<a href='AdminHomePage.html'>Home</a>");
response.write("</body>");
response.write("</HTML>");
response.write("");
response.close();
}
