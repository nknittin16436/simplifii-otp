"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const connection_1 = __importDefault(require("./db/connection"));
(0, connection_1.default)().then(() => {
    app_1.default.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    });
});
