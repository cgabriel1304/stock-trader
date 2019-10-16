const express = require('express');
var proxy = require('express-http-proxy');
const http = require('http');
const path =  require('path');
const url =  require("url");

const app = express();
const port = process.env.PORT || 8080;
const env = process.env.ENVIRONMENT || 'local';


let proxyDef = {
    "source": "/api",
    "target": "/api",
    "secure": false,
    "logLevel": "error",
    "changeOrigin": true
};


switch (env) {
    case 'dev':  proxyDef.target = process.env.DEVBKURL || ""; break;
    case 'prod': proxyDef.target = process.env.PRODBKURL || ""; break;
    case 'local': proxyDef.target = process.env.LOCALBKURL || "http://localhost:9000"; break;
}

console.log('Using proxy definition:\n', proxyDef);


app.use(express.static(__dirname + '/dist'));
app.use(proxyDef.source , proxy(proxyDef.target, {
    limit: '50mb',
    // this passes any URL params on to the external api
    // eg /api/user/1234 -> example.com/api/user/1234
    proxyReqPathResolver: function(req) {
        const route  =  url.parse( proxyDef.source + req.url).path ;
        console.log( route + ' => ' + proxyDef.target + route );
        return route;
    }  
}));

app.get('*', function(req, res) {
    res.sendfile( path.join(__dirname) + '/dist/index.html');
})

const server =  http.createServer(app);


server.listen(port, () => {console.log('Running on port ' + port)});