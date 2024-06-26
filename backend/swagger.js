const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
  },
  host: "localhost:3000",
  basePath: "/api/",
  consumes: ['application/json'],
  produces: ['application/json'],
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./index.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)