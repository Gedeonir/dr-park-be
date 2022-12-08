// @ts-nocheck
const express = require("express")
const cors = require("cors")
const swaggerUI = require("swagger-ui-express")
const swaggerDocumentation = require("./src/docs/swagger.js")
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

const userRouter = require("./src/Users/users.route");
const roleRouter = require("./src/Roles/roles.route");
const parkingRouter = require("./src/Parking/parking.route")
const parkingAssignments = require("./src/Assignments/Assignment.route")

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
  })

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Smart parking project",
  })
})

app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocumentation)
)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/parkings",parkingRouter);
app.use("/api/v1/assignments",parkingAssignments);
module.exports = app
