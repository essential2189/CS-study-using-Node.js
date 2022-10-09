import net from "net";

const PORT = 2022;
const IP = "127.0.0.1";

let server = net.createServer(function (client) {
  client.setTimeout(500);
  client.setEncoding("utf8");
  writeData(client, "Hello World\n");
  writeData(client, "Hello World\n");

  client.on("timeout", function () {
    process.exit();
  });
});
server.listen(PORT, function () {
  console.log("Server listening: " + IP + ":" + PORT);
  server.on("close", function () {
    console.log("Server Terminated");
  });
  server.on("error", function (err) {
    console.log("Server Error: ", JSON.stringify(err));
  });
});
function writeData(socket, data) {
  var success = !socket.write(data);
  if (!success) {
    (function (socket, data) {
      socket.once("drain", function () {
        writeData(socket, data);
      });
    })(socket, data);
  }
}
