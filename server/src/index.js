const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const route = require("./routes/route");
const { socketConnection } = require('./util/socket-io');

const app = express();

const path = require("path");
const clientFolderPath = path.join(__dirname, "../../client");
app.use(express.static(clientFolderPath));

const server = require("http").createServer(app);
socketConnection(server);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().any());

mongoose
  .connect(
    "MONGOURI",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));

app.use("/", route);

server.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on PORT " + (process.env.PORT || 3000));
});
