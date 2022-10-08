var Server_Name = 'imagesdata-API'
var Port = 5000;
var Host = '127.0.0.1';


server.listen(Port, Host, function())
{
    console.log('Server is listening at %s', server.url)
    console.log('Endpoints')
    console.log(server.url + '/images')
    console.log('method: GET, POST, DELETE')
}