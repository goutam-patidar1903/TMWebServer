const fs=require('fs');
const path=require('path');
const jst2js=require('./jst2js');
const net=require('net');
const mt=require('mime-types');
const configuration=require('./configuration');
const errors=require('./errors');
const requestParser=require('./requestParser');
var mappings = configuration.getConfiguration();

function Response(socket)
{
this._isClosed=false;
this.responseInitiated=false;
this.contentType="text.html";
this.$$$socket=socket;
this.close=function()
{
if(this._isClosed) return;
socket.end();
this._isClosed=true;
}
this.setContentType=function(str)
{
this.contentType=str;
}
this.write=function(data)
{
if(this.responseInitiated==false)
{
this.$$$socket.write("HTTP/1.1 200 OK\n");
this.$$$socket.write(new Date().toGMTString()+"\n");
this.$$$socket.write("Server:TMWebProjector\n");
this.$$$socket.write(`Content-Type:${this.contentType}\n`);
this.$$$socket.write("Connection:close\n\n");
this.responseInitiated=true;
}
this.$$$socket.write(data);
}
}

function serveResource(socket,resource)
{
console.log("Resource to serve : "+resource);
if(!fs.existsSync(resource))
{
errors.send404(socket,resource);
return;
}

//later change code to 1024 chunk format
var data=fs.readFileSync(resource,'utf-8');
var header="HTTP/1.1 200 OK\n";
header=header+`Content-Type:${mt.lookup(resource)}\n`;
header=header+`Content-Length:${data.length}\n`;
header=header+"\n";
var response=header+data;
socket.write(response);
}

var httpServer=net.createServer(function(socket){
socket.on('data',function(data){
var request=requestParser.parseRequest(data,mappings);
console.log(`***${JSON.stringify(request)}***`);
while(true)
{
if(request.error!=0)
{
errors.processError(request.error,socket,request.resource);
return;
}
if(request.isClientSideTechnologyResource)
{
serveResource(socket,request.resource);
return;
}
else
{
console.log("Server side resource : "+request.resource);
var absolutePath=path.resolve("./private/"+request.resource);
delete require.cache[absolutePath];

const service=require("./private/"+request.resource);
if(request.isClassMapping)
{
var requestData={};
var object=new service();
object[request.serviceMethod](requestData);
// some more code later on
break;
}
service.processRequest(request,new Response(socket));
if(request.isForwarded()==false) return;
var forwardTo=request.forwardTo;
request.forwardTo=null;
request.isClientSideTechnologyResource=true;
if(forwardTo=="/private" || forwardTo.startsWith("/private/") || forwardTo.startsWith("private/"))
{
request.error=500;
}
if(forwardTo=='/')
{
request.resource="index.html";
}
else if(forwardTo.toUpperCase().endsWith(".JST"))
{
if(fs.existsSync(forwardTo))
{
request.resource=jst2js.prepareJS(forwardTo,request);
request.isClientSideTechnologyResource=false;
}
else
{
request.error=404;
request.resource=forwardTo;
}
}
else
{
var e=0;
while(e<mappings.paths.length)
{
if(mappings.paths[e].path=="/"+forwardTo)
{
request.resource=mappings.paths[e].resource;
request.isClientSideTechnologyResource=false;
break;
}
e++;
}
if(request.isClientSideTechnologyResource)
{
request.resource=forwardTo;
}
}
}
}//infinite loop ends here
});
socket.on('error',function(){
console.log("Some problem at client side");
});
socket.on('end',function(){
console.log("Connection closed at client side");
});
});

httpServer.listen(8080,'localhost');
console.log("TMWebProjector is UP at port : 8080");