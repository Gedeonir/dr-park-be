

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Phantom Project Powered By Avengers",
    version: "0.0.1",
    description: "This is Avengers Phantom RESTful APIs Documetation",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local dev Server",
    },
    {
      url: "http://www.avengersphantom.com",
      description: "production dev server",
    },
  ],
  tags: [
    {
      name: "User",
      description: "User Routes",
    },
  ],
  paths: {

  },
}
module.exports = swaggerDoc
