const corsProxy = require('cors-anywhere')

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0'
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8081

corsProxy.createServer({
  originWhitelist: ['http://localhost:8080'], // Allow all origins
  requireHeader: ['Origin'],
  removeHeaders: ['cookie', 'User-Agent', 'Host', 'Origin'],
  setHeaders: { 'Host': 'stats.nba.com', 'Referer': 'http://stats.nba.com/' }
}).listen(port, host, () => {
  console.log('Running CORS Anywhere on ' + host + ':' + port)
})
