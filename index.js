const express = require("express");
const net = require("net");

const app = express();
const port = 5000;

const host = "172.20.52.108";
const portTCP = 6100;
const buffer = "-1 RENDERER*STAGE START";

app.get("/", (req, res) => {
  const client = new net.Socket();

  client.connect(portTCP, host, () => {
    console.log("Connected to server");

    const bufferData = Buffer.from(buffer, "utf-8");

    client.write(bufferData);
    client.end();
  });

  client.on("close", () => {
    console.log("Connection closed");
    res.send("Data sent successfully");
  });

  client.on("error", (err) => {
    console.error("Error:", err.message);
    res.status(500).send("Error occurred while sending data");
  });
});
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});