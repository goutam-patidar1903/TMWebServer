const qs=require('querystring');
const fs=require('fs');
const jst2js=require('./jst2js');
exports.parseRequest=function(data,mappings){
var request={};
request.isClassMapping=false;
request.forwardTo=null;
request.forward=function(forwardToResource)
{
this.forwardTo=forwardToResource;
}
request.isForwarded=function()
{
return this.forwardTo!=null;
}
var str=data.toString();
var splits=str.split("\n");
var firstLine=splits[0];
var words=firstLine.split(" ");
request.method=words[0].toUpperCase();
var queryString="";
request.data={};
request.error=0;
if(request.method=='GET')
{
var i = words[1].indexOf("?");
if(i!=-1)
{
queryString=words[1].substring(i+1);
request.data=JSON.parse(JSON.stringify(qs.decode(queryString)));
words[1]=words[1].substring(0,i);
}
}
if(request.method=='POST')
{
queryString=splits[splits.length-1];   // lastLine
request.data=JSON.parse(JSON.stringify(qs.decode(queryString)));
}
if(words[1].startsWith('/private'))
{
request.error=404;
request.resource=words[1].substring(1);
return request;
}

if(words[1]=="/") 
{
request.resource="index.html";
request.isClientSideTechnologyResource=true;
return request;
}
else if(words[1].toUpperCase().endsWith(".JST"))
{
if(fs.existsSync(words[1].substring(1)))
{
request.resource=jst2js.prepareJS(words[1].substring(1),request);
request.isClientSideTechnologyResource=false;
}
else
{
request.error=404;
request.resource=words[1].substring(1);
request.isClientSideTechnologyResource=true;
}
return request;
}
else 
{
var e=0;
while(e<mappings.paths.length)
{
if(mappings.paths[e].path==words[1] && mappings.paths[e].resource)
{
request.isClientSideTechnologyResource=false;
request.resource=mappings.paths[e].resource;
return request;
}

if(words[1].startsWith(mappings.paths[e].path+"/"))
{
if(mappings.paths[e].module)
{
if(mappings.paths[e].methods)
{
if(mappings.paths[e].methods[words[1].substring(words[1].indexOf("/",1))])
{
request.isClientSideTechnologyResource=false;
request.isClassMapping=true;
request.resource=mappings.paths[e].module+".js";
request.serviceMethod=mappings.paths[e].methods[words[1].substring(words[1].indexOf("/",1))];
return request;
}
}
}
}

e++;
}
request.resource=words[1].substring(1);
request.isClientSideTechnologyResource=true;
return request;
}
}