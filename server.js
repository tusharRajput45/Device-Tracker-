const express = require("express");
const app = express();
const http = require("http");
const PORT = 3000;
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);
const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", "./views/");

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnect", socket.id);
  });
});

app.get("/start", async (req, resp) => {
  resp.render("index");
});

server.listen(PORT, () => {
  console.log(`Server is running port no ${PORT}`);
});
