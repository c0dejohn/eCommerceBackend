"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productos_routes_1 = __importDefault(require("./router/productos.routes"));
var carrito_routes_1 = __importDefault(require("./router/carrito.routes"));
var globals_1 = __importDefault(require("./config/globals"));
var app = (0, express_1.default)();
var logger_1 = require("./util/logger");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/api/productos", productos_routes_1.default);
app.use("/api/carrito", carrito_routes_1.default);
var PORT = globals_1.default.PORT;
app.listen(PORT, function () {
    logger_1.logger.info("server listening on port ".concat(PORT));
});
