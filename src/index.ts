import { configDotenv } from "dotenv";
import { app } from "./app";
import { DBConnection } from "./Utils/db";
import http from "http"
import { Server } from "socket.io";

configDotenv();
const port = process.env.PORT || 4000;

const httpServer = http.createServer(app);

DBConnection().then(() => {
 httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

const io = new Server(httpServer);

io.on("connection", (socket:any) => {
  socket.on('event', ()=>{
    
  })
});

// httpServer.listen(3000);