const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cvRouter = require("./cv/cv.router");
const cvitemRouter = require("./cvitem/cvitem.router");
const jdRouter = require("./jd/jd.router");
const postRouter = require("./post/post.router");
const postitemRouter = require("./postitem/postitem.router");
const http = require("http").createServer(app);
const cors = require("cors");
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
          
cloudinary.config({ 
  cloud_name: 'dsqu9voqv', 
  api_key: '576281648752174', 
  api_secret: 'pvMQLA8EKtRfOTcJ6fkX135-Qe8' 
});

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

app.use(cors());

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

app.post("/getToken", async (req, res) => {
  try {
    const data = req.body.data;

    const config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://api.utteranc.es/token",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/getUserData', async (req, res) => {
  try {
      req.get("Authorization")
      const config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: 'https://api.github.com/user',
      headers: { 
        'Accept': 'application/vnd.github.v3+json', 
        'Authorization': req.get("Authorization")
      }
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use("/cv", cvRouter);
app.use("/cvitem", cvitemRouter);
app.use("/jd", jdRouter);
app.use("/post", postRouter);
app.use("/postitem", postitemRouter);