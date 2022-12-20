import app from "./app.js"
import 'dotenv/config'
import { connect } from "./config/config.js";

const PORT = process.env.PORT || 5000;

connect().then(() => {
  console.log("Database connected!");
  app.listen(PORT, async () => {
    console.log(`Server is running on Port ${PORT}`)
  })
});
