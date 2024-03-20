const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cvRouter = require("./cv/cv.router");
const cvitemRouter = require("./cvitem/cvitem.router");
const jdRouter = require("./jd/jd.router");
const postRouter = require("./post/post.router");
const http = require("http").createServer(app);
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("dotenv").config();

// Login
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const CLIENT_ID = "3a0867acc92f99838faf"
const CLIENT_SECRET = "9086ba3e25aea160195fdfd0cd1eceb5dbec1477"
app.get('/getAccessToken', async function (req, res){
  console.log(req.query.code)
  const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code
  await.fetch("https://github.com/login/oauth/access_token" + params, {
    method: 
  })
});




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
  // const getText = test.pdfToText('./uploads/hello.pdf');
});

app.use(cors());
app.use("/cv", cvRouter);
app.use("/cvitem", cvitemRouter);
app.use("/jd", jdRouter);
app.use("/post", postRouter);