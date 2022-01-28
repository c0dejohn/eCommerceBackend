"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var productos_routes_1 = __importDefault(require("./router/productos.routes"));
var carrito_routes_1 = __importDefault(require("./router/carrito.routes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var logger_1 = require("./util/logger");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/productos", productos_routes_1.default);
app.use("/carrito", carrito_routes_1.default);
var PORT = process.env.PORT;
app.listen(PORT, function () {
    logger_1.logger.info("server listening on port ".concat(PORT));
});
