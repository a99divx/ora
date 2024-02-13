const express = require("express");
const net = require("net");

const app = express();
const port = 3000; // Choose any available port for your Express server

const host = "172.20.52.108";
const portTCP = 6100;
const buffer = "-1 RENDERER*STAGE START";

// Define a route to handle the TCP connection
app.get("/sendData", (req, res) => {
  const client = new net.Socket();

  // Connect to the TCP server
  client.connect(portTCP, host, () => {
    console.log("Connected to server");

    const bufferData = Buffer.from(buffer, "utf-8");

    // Write data to the TCP server
    client.write(bufferData);
    client.end(); // Close the connection after writing
  });

  // Handle close event
  client.on("close", () => {
    console.log("Connection closed");
    res.send("Data sent successfully");
  });

  // Handle error event
  client.on("error", (err) => {
    console.error("Error:", err.message);
    res.status(500).send("Error occurred while sending data");
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
