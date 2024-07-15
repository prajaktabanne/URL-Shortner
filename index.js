const express = require("express");
const connectToMongoBD = require("./connection");
const PORT = 8000;
const urlRouter = require("./routes/url");
const urlModel = require("./models/url");
const app = express();

//connect db
connectToMongoBD("mongodb://127.0.0.1:27017/shortUrlDB")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Error while connecting ", err));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/url", urlRouter);
app.use("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const result = await urlModel.findOneAndUpdate(
    { shortId },
    {
      clickHistory: {
        $push: {
          time: Date.now(),
        },
      },
    }
  );
  console.log(result);

  return res.redirect(result.originalUrl);
});

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
