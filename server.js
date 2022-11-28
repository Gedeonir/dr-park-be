import app from "./app.js"
import dotenv from "dotenv"
const { sequelize } = require("./models")

dotenv.config({path:'./.env'})

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await sequelize.authenticate()
  console.log(`Server is running on Port ${PORT}`)
  console.log("Database Connected!!")
})
