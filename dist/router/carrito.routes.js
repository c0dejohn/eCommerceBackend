"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cartRouter = (0, express_1.Router)();
var carrito_1 = __importDefault(require("../controller/carrito"));
var carrito = new carrito_1.default();
cartRouter.get("/:id/productos", carrito.getById);
cartRouter.post("/", carrito.addProduct);
cartRouter.put("/:id", carrito.update);
cartRouter.delete("/:id", carrito.destroy);
exports.default = cartRouter;
