require('dotenv').config()
const server = require('./graphql/server') 

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})