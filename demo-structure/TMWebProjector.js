const fs=require('fs');
const net=require('net');
const mt=require('mime-types');
const configuration=require('./configuration');
const errors=require('./errors');
const requestParser=require('./requestParser');
var mappings = configuration.getConfiguration();

function Response(socket)
{
this.responseInitiated=false;
this.contentType="text.html";
this.$$$socket=socket;
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
if(request.error!=0)
{
errors.processError(request.error,socket,request.resource);
return;
}
if(request.isClientSideTechnologyResource)
{
serveResource(socket,request.resource);
}
else
{
console.log("Server side resource : "+request.resource);
const service=require(`./private/${request.resource}`);
service.processRequest(request,new Response(socket));
}
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