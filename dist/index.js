"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = require("./app");
const db_1 = require("./Utils/db");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
(0, dotenv_1.configDotenv)();
const port = process.env.PORT || 4000;
const httpServer = http_1.default.createServer(app_1.app);
(0, db_1.DBConnection)().then(() => {
    httpServer.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
const io = new socket_io_1.Server(httpServer);
io.on("connection", (socket) => {
    socket.on('event', () => {
    });
});
// httpServer.listen(3000);
