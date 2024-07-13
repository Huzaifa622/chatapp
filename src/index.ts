import { configDotenv } from "dotenv";
import { app } from "./app";
import { DBConnection } from "./Utils/db";
configDotenv();
const port = process.env.PORT || 4000;
DBConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
