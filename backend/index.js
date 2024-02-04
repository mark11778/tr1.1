const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fetchQuote = require('./quoteGen');


app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:"http://localhost:3000",
    },
})


io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("needQuote", async () => {
        try {
            const quote = await fetchQuote(); // Assuming fetchQuote is an async function
            socket.emit("newQuote", { quote }); // Use socket.emit to send data back to the client
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Optionally, emit an error message back to the client
            socket.emit("error", { message: "Error fetching quote." });
        }
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
});