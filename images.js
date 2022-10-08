var Server_Name = 'imagesdata-API'
var Port = 5000;
var Host = '127.0.0.1';

var restify = require('restify')

, imagesSave = require('save')('images')

, server = restify.createServer({ name: Server_Name })

server.listen(Port, Host, function()
{
    console.log('Server is listening at %s', server.url)
    console.log('Endpoints:')
    console.log(server.url + '/images')
    console.log('method: GET, POST, DELETE')
})

server
    .use(restify.fullResponse())
    .use(restify.bodyParser())
