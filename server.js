const app = require("./app.js");
const dotenv = require('dotenv');
const connect = require("./config/config.js");
const socket = require('./src/utils/socket')


const PORT = process.env.PORT || 5000;

connect().then(() => {
  console.log("Database connected!");
  socket.socketMethod.socketStarter(
    app.listen(PORT, async () => {
      console.log(`Server is running on Port ${PORT}`)
    })
  )
});


