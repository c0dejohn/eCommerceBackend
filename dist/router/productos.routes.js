"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productRouter = (0, express_1.Router)();
var productos_1 = __importDefault(require("../controller/productos"));
var authHandler_1 = require("../middleware/authHandler");
var producto = new productos_1.default();
productRouter.get("/", producto.getAll);
productRouter.post("/", authHandler_1.authMiddleware, producto.create);
productRouter.put("/:id", authHandler_1.authMiddleware, producto.update);
productRouter.delete("/:id", authHandler_1.authMiddleware, producto.destroy);
productRouter.get("/:id?", producto.getById);
exports.default = productRouter;
