const express = require('express');
const cors = require("cors");

const imageGeneratorRouter = require('./routes/imageGeneratorRouter')

const app = express();
const db  = require('./config/mongoose-connection');
app.use(
  cors({
    origin: "http://localhost:5173",
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

app.listen(3000, ()=>console.log('app is running on port 3000'));