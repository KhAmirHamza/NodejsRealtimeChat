require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const fs = require('fs-extra');
const { ifError } = require("assert");
const { json } = require("body-parser");
var storage, path;
path = require('path');
const multer = require("multer");

app.use(json({ limit: "50mb" }))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Method', 'GET, PUT, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});
app.use(cors());

const userController = require('./user/userController');
const converationController = require('./conversation/conversationController');

app.use("/user", userController);
app.use("/conversation", converationController);

app.get('/', (req, res) => {
  res.json({ "message": "Successful" });
  res.end();
})


/* storage = multer.diskStorage({
  destination: './Images/',
  filename: function (req, file, cb) {
      return cb(null, "image_" + new Date().getTime() + (path.extname(file.originalname)));
  }
});

var upload = multer({ storage: storage })

// uploading image to server hadrdisk then reference will insert to MongoDb...
app.post("/uploadImageToGenerateUrl",
  upload.single('uploadImage'),
  function (req, res) {
      console.log(req.file);
     console.log(__dirname + "/Images/" + req.file.filename);
     var ref = { url: "http://172.28.240.1:3000/Images/" + req.file.filename }
     res.json(ref);
  }
); */

app.post('/upload', async (req, res) => {
  var readFile = Buffer.from(req.body.image, "base64");
  fs.writeFileSync(__dirname + "/Images/" + req.body.name + ".jpg", readFile, "utf8");
  //await res.send({message: "Upload Image Successful"});
  var ref = { url: "https://nodejsrealtimechat.onrender.com/Images/" + req.body.name + ".jpg" }
 // var ref = { url: "http://172.28.240.1:3000/Images/" + req.body.name + ".jpg" }
  console.log(ref);
  await res.json(ref);
  res.end();
});

app.get("/Images/:imageName", (req, res) => {
  file = req.params.imageName;
  res.sendFile(path.join(__dirname, "./Images/" + file));
});

const server = http.createServer(app);
const { Server } = require('socket.io');
const update = require('./conversation/update');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {


  //console.log(`User connected ${socket.id}`);
  //Message Sent from Client
  socket.on('sendMessage', (data) => {
    console.log("sendMessage Event is called from Client:");
    console.log(data);
    console.log("sendMessage Event End");

    const { _id, fromId, toId, text, seenBy, imageUrl, createdAt, updatedAt} = data; // Data sent from client when sendMessage event emitted

    socket.broadcast.emit(toId, {
      id: _id,
      fromId: fromId,
      toId: toId,
      text: text,
      seenBy: seenBy,
      imageUrl: imageUrl,
      createdAt: createdAt,
      updatedAt: updatedAt
    });
  });

  socket.on('notifyMessageSeen', (data) => {
    const { otherUserId, currentUserId } = data; // Data sent from client when notifyMessageSeen event emitted

    console.log("notifyMessageSeen Event is called from Client");
    console.log(data);

    socket.broadcast.emit("notifyMessageSeen=" + otherUserId, { "otherUserId": currentUserId });

  });

  socket.on('disconnect', (reason)=>{
    update.updateConvsUserStatus(socket.id, "Inactive");
  })

  setTimeout(()=>{
    update.updateConvsUserStatus(socket.id, "Active");
  }, 3000);




});


const PORT = process.env.PORT || 3000;
server.listen(PORT, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is running on port :' + PORT);
  }
});