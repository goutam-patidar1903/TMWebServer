const fs=require('fs');
var thisModule=this;
exports.processRequest=function(request,response){
var username=request.data["username"];
var password=request.data["password"];
var repassword=request.data["repassword"];
if(username!=null) username=username.trim(); else username="";
if(password!=null) password=password.trim(); else password="";
if(repassword!=null) repassword=repassword.trim(); else repassword="";
var resend=false;
if(username.length==0) resend=true;
if(password.length==0) resend=true;
if(password!=repassword) resend=true;
if(resend)
{
response.setContentType("text/html");
response.write("<!DOCTYPE HTML>");
response.write("<head>");
response.write("<title>College Message Board</title>");
response.write("<meta charset='utf-8'>");
response.write("</head>");
response.write("<body>");
response.write("<h1>Administration Module</h1>");
response.write("<h3>Setup Administrator Account</h3>");
response.write("<div style='color:red'>");
if(username.length==0) response.write("Username required <br>");
if(password.length==0) response.write("Password required <br>");
if(password!=repassword) response.write("Password Typed incorrectly<br>");
response.write("</div>");
response.write("<form action='createAdmin' method='POST'>");
response.write("<table border='0'>");
response.write("<tr>");
response.write("<td>Username</td>");
response.write("<td><input type='text' name='username' id='username' maxlength='15' size='16' value='"+username+"'></td>");
response.write("</tr>");
response.write("<tr>");
response.write("<td>Password</td>");
response.write("<td><input type='password' name='password' id='password' maxlength='15' size='16'></td>");
response.write("</tr>");
response.write("<tr>");
response.write("<td>Re-Password</td>");
response.write("<td><input type='repassword' name='repassword' id='repassword' maxlength='15' size='16'></td>");
response.write("</tr>");
response.write("<tr>");
response.write("<td colspan='2' align='center'><button type='submit'>Create Account</button></td>");
response.write("</tr>");
response.write("</table>");
response.write("</form>");
response.write("</body>");
response.write("</HTML>");
response.close();
return;
}
var administrator={
"username" : username,
"password" : password
};

fs.writeFileSync("./private/data/admin.conf",JSON.stringify(administrator));

response.write("<!DOCTYPE HTML>");
response.write("<head>");
response.write("<title>College Message Board</title>");
response.write("<meta charset='utf-8'>");
response.write("</head>");
response.write("<body>");
response.write("<h1>Administration Module</h1>");
response.write("<h3>Setup Administrator Account</h3>");
response.write("<h2>Account Created</h2>");
response.write("<form action='/admin'>");
response.write("<button type='submit'>Proceed to Login</button>");
response.write("</form>");
response.write("</body>");
response.write("</HTML>");
response.close();
}