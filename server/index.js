const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./cvitem/cvitem.router");
const adminRouter = require("./admin/admin.router");
const http = require("http").createServer(app);
const cors = require("cors");
const request = require("request");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("dotenv").config();

const mongoDB_url =
  "mongodb+srv://mauduckg:mauduckg@cluster0.liowy3n.mongodb.net/test";
mongoose
  .connect(mongoDB_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

http.listen(4000, function () {
  console.log("listening on port 4000");
});

app.use(cors());
app.use("/cvitem", cvitemRouter);
app.use("/cv", cvRouter);
