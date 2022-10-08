var Server_Name = 'imagesdata-API'
var Port = 5000;
var Host = '127.0.0.1';

var restify = require('restify')
 // Get a persistence engine for the images
, imagesSave = require('save')('images')
  // Create the restify server
, server = restify.createServer({ name: Server_Name })

server.listen(Port, Host, function()
{
    console.log('Server is listening at %s', server.url)
    console.log('Endpoints:')
    console.log(server.url + '/images')
    console.log('method: GET, POST, DELETE')
})

server
    // Allow the use of POST
    .use(restify.fullResponse())
    // Maps req.body to req.params so there is no switching between them
    .use(restify.bodyParser())

// Get all images in the system
server.get('/images', function (req, res, next)
{
    console.log('')
    // Log request information
    console.log('> images GET ALL: received request')
    // Find every entity within the given collection
    imagesSave.find({}, function (error, images)
    {
        res.send(images)
    })
    //Log response information
    console.log('< images GET ALL: sending response')
})