// importing modules
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config({ path: "./config.env" });
//connection to database
const PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DATABASE.replaceAll("<PASSWORD>", PASSWORD);
mongoose
  .connect(DB)
  .then(() => {
    console.log("successfully connected to database");
  })
  .catch((err) => {
    console.log("database connection failed : ", err.name);
  });
app.listen(8000, "127.0.0.1", () => {
  console.log("app is running on port 8000");
});
