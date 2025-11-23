require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const express = require('express');
const cors = require("cors");

const imageGeneratorRouter = require('./routes/imageGeneratorRouter')
const textGeneratorRouter = require('./routes/textGeneratorRouter')
const authRouter = require('./routes/authRouter')


const app = express();
const db  = require('./config/mongoose-connection');
const { insertSampleUser } = require('./models/user-model');
app.use(
  cors({
    origin: "https://re-imagine.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res)=>{
  res.send("Welcome to image generator");
});
app.use("/api/image-generator", imageGeneratorRouter);
app.use("/api/text-generator", textGeneratorRouter);
app.use("/api/authentication", authRouter);

app.listen(3000, ()=>console.log('app is running on port 3000'));