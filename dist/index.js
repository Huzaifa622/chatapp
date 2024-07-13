"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = require("./app");
const db_1 = require("./Utils/db");
(0, dotenv_1.configDotenv)();
const port = process.env.PORT || 4000;
(0, db_1.DBConnection)().then(() => {
    app_1.app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
