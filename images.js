var Server_Name = 'imagesdata-API'
var Port = 5000;
var Host = '127.0.0.1';
var ReqPost = 0;
var ReqGet = 0;

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

// Getting all images in the system
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
    // Log response information
    console.log('< images GET ALL: sending response')
    // Request Counters (GET & POST)
    console.log('Processed Request Count-->')
    console.log('GET: ' + ReqGet)
    console.log('POST: ' + ReqPost)
})

// Creating a new image
server.post('/images', function (req, res, next)
{
    console.log('')
    console.log('> images POST: received request')
    // Make sure name is defined
    if (req.params.imageID === undefined ) 
    {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('imageID must be supplied'))
    }
    if (req.params.name === undefined ) 
    {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('name must be supplied'))
    }
    if (req.params.url === undefined ) 
    {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('url must be supplied'))
    }
    if (req.params.size === undefined ) 
    {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('size must be supplied'))
    }
    var newImage = 
    {
        imageID: req.params.imageID,
        name: req.params.name,
        url: req.params.url,
        size: req.params.size
    }
    // Creating the image using the persistence engine
    imagesSave.create( newImage, function (error, image)
    {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send(201, image)
    })
    console.log('< images POST: saving response')
    // Request Counters (GET & POST)
    console.log('Processed Request Count-->')
    console.log('GET: ' + ReqGet)
    console.log('POST: ' + ReqPost)
})

server.del('/images', function (req, res, next)
{
    console.log('')
    console.log('> images DELETE ALL: received request')
    imagesSave.deleteMany({}, function (error, image)
    {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send(200, 'Images Deleted')
    })
    console.log('< images DELETE ALL: executed')
    // Request Counters (GET & POST)
    console.log('Processed Request Count-->')
    console.log('GET: ' + ReqGet)
    console.log('POST: ' + ReqPost)
})
