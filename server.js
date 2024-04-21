const express = require("express");
const { createServer } = require("http");
const next = require("next");
const io = require("socket.io");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const socketServer = io(httpServer);

  socketServer.on("connection", (socket) => {
    console.log("Connected client on port %s.", port);
    socket.on("message", (data) => {
      socketServer.emit("message", data);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:%s", port);
  });
});
