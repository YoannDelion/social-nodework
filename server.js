const http = require('http')

const server = http.createServer((request, response) => {
    response.end('Server response sent')
})

server.listen(process.env.PORT || 3000)