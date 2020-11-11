const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const  Product  = require("./models/Product");

app.use(cors());

io.on("connection", socket => {

  


   socket.on('add', data => socket.broadcast.emit('add', data));
   socket.on('update', data => socket.broadcast.emit('update', data));
   socket.on('delete', data => socket.broadcast.emit('delete', data));
 

})



// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use('/api/products', require('./routes/products'));

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});