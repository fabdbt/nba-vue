var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var fs = require('fs')

app.listen(8081)

function handler (req, res) {
  res.writeHead(200)
  res.end('OK')
}

io.on('connection', function (socket) {
  console.log('connected')
  socket.emit('scores', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
