const cors_proxy = require('cors-anywhere')

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0'
// Listen on a specific port via the PORT environment variable
var port = 8081 // process.env.PORT ||


cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin'],
    removeHeaders: ['cookie', 'User-Agent', 'Host', 'Origin']
}).listen(port, host, () => {
    console.log('Running CORS Anywhere on ' + host + ':' + port)
});
