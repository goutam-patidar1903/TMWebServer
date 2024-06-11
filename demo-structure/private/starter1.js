exports.processRequest=function(request,response){
console.log(request.data);
var name=request.data["name"];
var city=request.data["city"];
var gender=request.data["gender"];
response.setContentType("text/html");
response.write("<!DOCTYPE HTML>");
response.write("<head>");
response.write("<title>Server Side Resource</title>");
response.write("<meta charset='utf-8'>");
response.write("</head>");
response.write("<body>");
response.write("<h1>Starter1.js Server Side Resource</h1>");
response.write(`<p>Name : ${name}</p>`);
response.write(`<p>City : ${city}</p>`);
response.write(`<p>Gender : ${gender}</p>`);
response.write("</body>");
response.write("</HTML>");
}