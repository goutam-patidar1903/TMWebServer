exports.processRequest=function(socket){
var body="<!DOCTYPE HTML>";
body=body+"<head>";
body=body+"<title>Server Side Resource</title>";
body=body+"<meta charset='utf-8'>";
body=body+"</head>";
body=body+"<body>";
body=body+"<h1>Starter3.js Server Side Resource</h1>";
body=body+`<p>My name is Goutam Patidar</p>`;
body=body+"</body>";
body=body+"</HTML>";
var header="HTTP/1.1 200 OK\n";
header=header+new Date().toGMTString()+"\n";
header=header+"Server:TMWebProjector\n";
header=header+"Content-Type:text/html\n";
header=header+`Content-Length:${body.length}\n`;
header=header+"Connection:close\n";
header=header+"\n";
socket.write(header+body);
}